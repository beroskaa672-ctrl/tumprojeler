const API_KEY = "3af3f8a473989eda43f55ad4ad477786";
const API_ROOT = "https://api.themoviedb.org/3";
const IMAGE_ROOT = "https://image.tmdb.org/t/p/w500";

const vitrin = document.getElementById("film-vitrini");
const modal = document.getElementById("film-modal");
const iframe = document.getElementById("film-iframe");
const videoWrap = document.querySelector(".video-wrap");
const closeButton = document.getElementById("modal-kapat");
const trailerMessage = document.getElementById("fragman-mesaj");
const dataStatus = document.getElementById("veri-durumu");
const searchForm = document.getElementById("arama-formu");
const searchInput = document.getElementById("film-arama");
const clearSearchButton = document.getElementById("arama-temizle");
const loadMoreButton = document.getElementById("daha-fazla-yukle");
const scrollTopButton = document.getElementById("yukari-cik");
let latestMovieRequest = 0;
let page = 1;
let activeQuery = "";

const demoFilmler = [
    { id: "demo-1", title: "Yıldız Yolculuğu", release_date: "2025", vote_average: 8.4, demo: true },
    { id: "demo-2", title: "Kayıp Şehrin Sırrı", release_date: "2024", vote_average: 7.9, demo: true },
    { id: "demo-3", title: "Son Büyük Macera", release_date: "2023", vote_average: 8.1, demo: true },
    { id: "demo-4", title: "Geleceğe Doğru", release_date: "2022", vote_average: 7.6, demo: true }
];

function apiUrl(path, params = {}) {
    const query = new URLSearchParams({ api_key: API_KEY, ...params });
    return `${API_ROOT}${path}?${query}`;
}

function uygunFilmAdi(ad) {
    const kurallar = [
        [/\u006b\u0061\u006e\u006c\u0131/gi, "Gizemli"],
        [/\u006b\u0061\u006e\u006c\u0069/gi, "Gizemli"],
        [/\u00f6\u006c\u00fc\u006d\u0063\u00fc\u006c/gi, "Zorlu"],
        [/\u00f6\u006c\u00fc\u006d/gi, "Macera"],
        [/\b\u0064\u0065\u0061\u0064\b/gi, "Macera"]
    ];

    return kurallar.reduce(
        (temizAd, [desen, degisim]) => temizAd.replace(desen, degisim),
        ad || "İsimsiz film"
    );
}

function modalKapat() {
    modal.classList.remove("aktif");
    modal.setAttribute("aria-hidden", "true");
    iframe.src = "";
    iframe.hidden = false;
    videoWrap.hidden = false;
    trailerMessage.hidden = true;
    trailerMessage.textContent = "";
}

function fragmanMesajiGoster(metin) {
    iframe.src = "";
    iframe.hidden = true;
    videoWrap.hidden = true;
    trailerMessage.textContent = metin;
    trailerMessage.hidden = false;
    modal.classList.add("aktif");
    modal.setAttribute("aria-hidden", "false");
    closeButton.focus();
}

closeButton.addEventListener("click", modalKapat);

modal.addEventListener("click", (event) => {
    if (event.target === modal) modalKapat();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("aktif")) modalKapat();
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    activeQuery = searchInput.value.trim();
    page = 1;
    filmleriGetir();
});

searchInput.addEventListener("input", () => {
    clearSearchButton.hidden = searchInput.value.length === 0;
});

clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    clearSearchButton.hidden = true;
    searchInput.focus();
    activeQuery = "";
    page = 1;
    filmleriGetir();
});

loadMoreButton.addEventListener("click", () => {
    page += 1;
    filmleriGetir({ append: true });
});

scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

async function fragmaniAc(film) {
    if (film.demo) {
        fragmanMesajiGoster("Bu örnek film çevrim dışı demo içeriğidir. Fragman oynatmak için TMDB ve YouTube erişimi gerekir.");
        return;
    }

    try {
        let response = await fetch(apiUrl(`/movie/${film.id}/videos`, { language: "tr-TR" }));
        if (!response.ok) throw new Error(`TMDB ${response.status}`);
        let data = await response.json();
        let videos = data.results || [];

        // Türkçe fragman bulunmazsa İngilizce kayıtları da ara.
        if (!videos.some((video) => video.site === "YouTube")) {
            response = await fetch(apiUrl(`/movie/${film.id}/videos`, { language: "en-US" }));
            if (!response.ok) throw new Error(`TMDB ${response.status}`);
            data = await response.json();
            videos = data.results || [];
        }

        const trailer = videos.find((video) => video.site === "YouTube" && video.type === "Trailer")
            || videos.find((video) => video.site === "YouTube");

        if (!trailer) {
            fragmanMesajiGoster("Bu film için fragman bulunamadı veya fragman servisine erişilemiyor.");
            return;
        }

        iframe.hidden = false;
        videoWrap.hidden = false;
        trailerMessage.hidden = true;
        iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}?autoplay=1&rel=0`;
        modal.classList.add("aktif");
        modal.setAttribute("aria-hidden", "false");
        closeButton.focus();
    } catch (error) {
        fragmanMesajiGoster("Fragman servisine erişilemiyor. Ağ izin verdiğinde tekrar deneyebilirsin.");
        console.error("Fragman alınamadı:", error);
    }
}

function filmKartiOlustur(film) {
    const card = document.createElement("article");
    card.className = "film-karti";
    card.dataset.filmId = film.id;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    const filmAdi = uygunFilmAdi(film.title);
    card.setAttribute("aria-label", `${filmAdi} fragmanını aç`);

    const rating = document.createElement("span");
    rating.className = "puan";
    rating.textContent = Number(film.vote_average || 0).toFixed(1);
    const score = Number(film.vote_average || 0);
    rating.style.backgroundColor = score >= 8 ? "#f39c12" : score >= 5 ? "#95a5a6" : "#c0392b";

    const poster = document.createElement("img");
    poster.src = film.poster_path ? `${IMAGE_ROOT}${film.poster_path}` : "";
    poster.alt = `${filmAdi} afişi`;
    poster.loading = "lazy";
    if (!film.poster_path) poster.hidden = true;
    if (film.demo) {
        poster.hidden = false;
        poster.className = "demo-afis";
        poster.alt = "Örnek film afişi";
        poster.removeAttribute("src");
    }

    const info = document.createElement("div");
    info.className = "film-bilgi";

    const title = document.createElement("h3");
    title.textContent = filmAdi;

    const date = document.createElement("p");
    date.style.cssText = "font-size: 12px; color: #aaa;";
    date.textContent = `Yayın: ${film.release_date || "Tarih yok"}`;

    const message = document.createElement("p");
    message.className = "film-mesaj";
    message.setAttribute("aria-live", "polite");

    const detailsLink = document.createElement("a");
    detailsLink.className = "film-detay-link";
    detailsLink.href = `detay.html?id=${encodeURIComponent(film.id)}`;
    detailsLink.textContent = "Film detayları";
    detailsLink.addEventListener("click", (event) => event.stopPropagation());

    info.append(title, date, detailsLink, message);
    card.append(rating, poster, info);
    card.addEventListener("click", () => fragmaniAc(film));
    card.addEventListener("keydown", (event) => {
        if (event.target !== card) return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            fragmaniAc(film);
        }
    });
    return card;
}

async function filmleriGetir({ append = false } = {}) {
    const requestId = ++latestMovieRequest;
    const endpoint = activeQuery ? "/search/movie" : "/movie/popular";
    const params = {
        language: "tr-TR",
        page: String(page)
    };
    if (activeQuery) {
        params.query = activeQuery;
        params.include_adult = "false";
    }
    dataStatus.textContent = activeQuery
        ? `“${activeQuery}” aranıyor…`
        : "TMDB'den popüler filmler yükleniyor…";
    loadMoreButton.disabled = true;
    if (!append) {
        vitrin.replaceChildren(...(activeQuery ? [] : demoFilmler.map(filmKartiOlustur)));
    }

    try {
        const response = await fetch(apiUrl(endpoint, params));
        if (!response.ok) throw new Error(`TMDB ${response.status}`);
        const data = await response.json();
        if (requestId !== latestMovieRequest) return;

        const results = data.results || [];
        const cards = results.map(filmKartiOlustur);
        if (append) {
            vitrin.append(...cards);
        } else {
            vitrin.replaceChildren(...cards);
        }
        loadMoreButton.hidden = results.length === 0 || page >= (data.total_pages || 1);
        if (!data.results?.length) {
            dataStatus.textContent = append
                ? "Yüklenecek başka film bulunamadı."
                : activeQuery
                    ? `“${activeQuery}” için film bulunamadı.`
                    : "TMDB film listesi boş; örnek filmler gösteriliyor.";
            if (!append && !activeQuery) {
                vitrin.replaceChildren(...demoFilmler.map(filmKartiOlustur));
            } else if (!append) {
                vitrin.textContent = "Başka bir film adı deneyebilirsin.";
            }
        } else {
            dataStatus.textContent = activeQuery
                ? `“${activeQuery}” için filmler gösteriliyor.`
                : "Popüler filmler";
        }
    } catch (error) {
        if (requestId !== latestMovieRequest) return;
        if (append) page -= 1;
        dataStatus.textContent = append
            ? "Daha fazla film yüklenemedi. Lütfen tekrar deneyin."
            : "TMDB'ye erişilemiyor; çevrim dışı örnek filmler gösteriliyor.";
        if (!append && !activeQuery) {
            vitrin.replaceChildren(...demoFilmler.map(filmKartiOlustur));
        } else if (!append) {
            const normalizedQuery = activeQuery.toLocaleLowerCase("tr-TR");
            const localResults = demoFilmler.filter((film) =>
                film.title.toLocaleLowerCase("tr-TR").includes(normalizedQuery)
            );
            vitrin.replaceChildren(...localResults.map(filmKartiOlustur));
            dataStatus.textContent = localResults.length
                ? "TMDB'ye erişilemiyor; çevrim dışı örneklerde eşleşme bulundu."
                : "TMDB'ye erişilemiyor; bu arama için çevrim dışı örnek bulunamadı.";
            if (!localResults.length) {
                vitrin.textContent = "İnternet bağlantısı olduğunda tekrar arayabilirsin.";
            }
        }
        loadMoreButton.hidden = !append;
        console.error("Filmler alınamadı:", error);
    } finally {
        if (requestId === latestMovieRequest) loadMoreButton.disabled = false;
    }
}

filmleriGetir();
