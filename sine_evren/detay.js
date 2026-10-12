const API_KEY = "3af3f8a473989eda43f55ad4ad477786";
const API_ROOT = "https://api.themoviedb.org/3";
const IMAGE_ROOT = "https://image.tmdb.org/t/p/w500";
const PROFILE_ROOT = "https://image.tmdb.org/t/p/w185";

const query = new URLSearchParams(window.location.search);
const movieId = query.get("id");
const status = document.getElementById("detay-durumu");
const detail = document.getElementById("film-detayi");
const trailerSection = document.getElementById("fragman-bolumu");

function apiUrl(path, params = {}) {
    const searchParams = new URLSearchParams({ api_key: API_KEY, ...params });
    return `${API_ROOT}${path}?${searchParams}`;
}

async function tmdbGet(path, params = {}) {
    const response = await fetch(apiUrl(path, params));
    if (!response.ok) throw new Error(`TMDB ${response.status}`);
    return response.json();
}

function renderCast(cast) {
    const list = document.getElementById("oyuncu-listesi");
    const actors = cast.slice(0, 5);
    if (!actors.length) {
        list.textContent = "Oyuncu bilgisi bulunamadı.";
        return;
    }

    for (const actor of actors) {
        const card = document.createElement("div");
        card.className = "oyuncu-karti";
        if (actor.profile_path) {
            const image = document.createElement("img");
            image.src = `${PROFILE_ROOT}${actor.profile_path}`;
            image.alt = actor.name;
            image.loading = "lazy";
            card.append(image);
        } else {
            const placeholder = document.createElement("div");
            placeholder.className = "oyuncu-foto-yok";
            placeholder.textContent = actor.name.slice(0, 1);
            placeholder.setAttribute("aria-label", `${actor.name} için fotoğraf bulunmuyor`);
            card.append(placeholder);
        }
        const name = document.createElement("p");
        name.textContent = actor.name;
        card.append(name);
        list.append(card);
    }
}

function renderSimilar(movies) {
    const list = document.getElementById("benzer-filmler");
    const recommendations = movies.slice(0, 4);
    if (!recommendations.length) {
        list.textContent = "Benzer film önerisi bulunamadı.";
        return;
    }

    for (const movie of recommendations) {
        const link = document.createElement("a");
        link.className = "benzer-film";
        link.href = `detay.html?id=${encodeURIComponent(movie.id)}`;
        if (movie.poster_path) {
            const image = document.createElement("img");
            image.src = `${IMAGE_ROOT}${movie.poster_path}`;
            image.alt = `${movie.title} afişi`;
            image.loading = "lazy";
            link.append(image);
        }
        const title = document.createElement("span");
        title.textContent = movie.title;
        link.append(title);
        list.append(link);
    }
}

async function filmDetayiniGetir() {
    if (!movieId || !/^\d+$/.test(movieId)) {
        status.textContent = "Geçerli bir film seçilmedi.";
        return;
    }

    try {
        const [movie, credits, similar] = await Promise.all([
            tmdbGet(`/movie/${movieId}`, { language: "tr-TR" }),
            tmdbGet(`/movie/${movieId}/credits`, { language: "tr-TR" }),
            tmdbGet(`/movie/${movieId}/similar`, { language: "tr-TR", page: "1" })
        ]);
        let videoData = await tmdbGet(`/movie/${movieId}/videos`, { language: "tr-TR" });
        let trailer = (videoData.results || []).find((video) => video.site === "YouTube" && video.type === "Trailer")
            || (videoData.results || []).find((video) => video.site === "YouTube");
        if (!trailer) {
            videoData = await tmdbGet(`/movie/${movieId}/videos`, { language: "en-US" });
            trailer = (videoData.results || []).find((video) => video.site === "YouTube" && video.type === "Trailer")
                || (videoData.results || []).find((video) => video.site === "YouTube");
        }

        document.title = `${movie.title} | SineEvren`;
        document.getElementById("film-basligi").textContent = movie.title;
        document.getElementById("film-meta").textContent =
            `${movie.release_date || "Yayın tarihi bilinmiyor"} · Puan: ${Number(movie.vote_average || 0).toFixed(1)}`;
        document.getElementById("film-ozeti").textContent = movie.overview || "Bu film için özet bulunmuyor.";
        document.getElementById("film-butcesi").textContent = `Bütçe: ${movie.budget
            ? `$${Number(movie.budget).toLocaleString("en-US")}`
            : "Bilinmiyor"}`;
        if (movie.backdrop_path) {
            document.body.style.setProperty("--film-backdrop", `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`);
        }

        if (trailer) {
            document.getElementById("detay-fragmani").src =
                `https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}`;
            trailerSection.hidden = false;
        } else {
            document.getElementById("fragman-basligi").hidden = true;
            document.getElementById("detay-fragmani").hidden = true;
            trailerSection.hidden = true;
        }
        renderCast(credits.cast || []);
        renderSimilar(similar.results || []);
        detail.hidden = false;
        status.textContent = "";
    } catch (error) {
        status.textContent = "Film detayları yüklenemedi. Lütfen daha sonra tekrar deneyin.";
        console.error("Film detayları alınamadı:", error);
    }
}

filmDetayiniGetir();
