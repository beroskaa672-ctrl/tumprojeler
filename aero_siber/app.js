"use strict";

const BILET_DEPOSU = "aeroSiberBiletler";
const PILOT_YEDEKLERI = [
  { firstName: "Ece", lastName: "Yalçın", age: 31, email: "ece.yalcin@aerosiber.com", image: "" },
  { firstName: "Arda", lastName: "Kaya", age: 28, email: "arda.kaya@aerosiber.com", image: "" },
  { firstName: "Duru", lastName: "Demir", age: 35, email: "duru.demir@aerosiber.com", image: "" },
  { firstName: "Mert", lastName: "Aydın", age: 33, email: "mert.aydin@aerosiber.com", image: "" }
];

function yazi(value, limit = 100, fallback = "Belirtilmedi") {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, limit) : fallback;
}

function biletleriOku() {
  try {
    const kayit = localStorage.getItem(BILET_DEPOSU);
    const liste = kayit ? JSON.parse(kayit) : [];
    if (!Array.isArray(liste)) return [];
    return liste.filter(bilet => bilet && typeof bilet === "object").map((bilet, index) => ({
      id: yazi(bilet.id, 90, `bilet-${index}`),
      pnr: yazi(bilet.pnr, 12, "AS-DEMO"),
      ad: yazi(bilet.ad, 70, "Yolcu"),
      kalkis: yazi(bilet.kalkis, 90),
      varis: yazi(bilet.varis, 90),
      tarih: yazi(bilet.tarih, 10, ""),
      saat: yazi(bilet.saat, 5, "--:--"),
      bagaj: sinirla(bilet.bagaj, 0, 80, 20),
      bagajLimit: sinirla(bilet.bagajLimit, 15, 80, 50),
      koltuk: yazi(bilet.koltuk, 5, "12A"),
      renk: /^#[0-9a-f]{6}$/i.test(bilet.renk) ? bilet.renk : "#0dcaf0",
      sinif: yazi(bilet.sinif, 40, "Ekonomi"),
      hizmetler: Array.isArray(bilet.hizmetler) ? bilet.hizmetler.map(h => yazi(h, 40)).slice(0, 8) : [],
      terminal: yazi(bilet.terminal, 40, "TR-ZNG-TERMINAL-1"),
      mail: epostaGecerliMi(bilet.mail) ? bilet.mail : ""
    }));
  } catch {
    return [];
  }
}

function sinirla(value, min, max, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
}

function epostaGecerliMi(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

let biletListesi = biletleriOku();

function eleman(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function biletSayaciGuncelle() {
  document.querySelectorAll("#biletSayaci").forEach(sayac => {
    sayac.textContent = String(biletListesi.length);
  });
  const toplam = document.getElementById("biletToplam");
  const progress = document.getElementById("biletProgress");
  if (toplam) toplam.textContent = String(biletListesi.length);
  if (progress) progress.value = Math.min(10, biletListesi.length);
}

function biletleriKaydet() {
  try {
    localStorage.setItem(BILET_DEPOSU, JSON.stringify(biletListesi));
    return true;
  } catch {
    const status = document.getElementById("formDurumu");
    if (status) status.textContent = "Tarayıcı kaydı kapalı veya dolu; bilet saklanamadı.";
    return false;
  }
}

function pnrUret() {
  const parca = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `AS${parca}`;
}

function formuGonder(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const seciliHizmetler = data.getAll("hizmet").map(deger => yazi(deger, 40));
  const bagajAlani = document.getElementById("bagajKg");
  const secilenKoltuk = document.getElementById("koltukRange").value;
  const yeniBilet = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `bilet-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    pnr: pnrUret(),
    ad: yazi(data.get("ad"), 70),
    kalkis: yazi(data.get("kalkis"), 90),
    varis: yazi(data.get("varis"), 90),
    tarih: yazi(data.get("tarih"), 10, ""),
    saat: yazi(data.get("saat"), 5, "--:--"),
    bagaj: sinirla(data.get("bagaj"), 15, 80, 20),
    // Bagaj göstergesinin sınırı, formdaki max değerinden alınır; Görev 5 denemesi de kartta doğru görünür.
    bagajLimit: sinirla(bagajAlani.max, 15, 80, 50),
    koltuk: `${secilenKoltuk}A`,
    renk: /^#[0-9a-f]{6}$/i.test(data.get("renk")) ? data.get("renk") : "#0dcaf0",
    sinif: yazi(data.get("sinif"), 40, "Ekonomi"),
    hizmetler: seciliHizmetler,
    terminal: yazi(data.get("terminalKodu"), 40),
    // T.C. numarası, PNR parolası, sağlık notu ve yüklenen dosyanın kendisi kayda alınmaz.
    mail: epostaGecerliMi(data.get("mail")) ? data.get("mail").trim() : ""
  };

  biletListesi.unshift(yeniBilet);
  if (!biletleriKaydet()) {
    biletListesi.shift();
    return;
  }
  window.location.href = "biletlerim.html";
}

function tarihYaz(tarih) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tarih)) return "Tarih seçilmedi";
  const date = new Date(`${tarih}T12:00:00`);
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function biletKartiOlustur(bilet) {
  const card = eleman("article", "binis-karti");
  card.style.setProperty("--ticket-color", bilet.renk);

  const stamp = eleman("span", "onay-damgasi", `ONAYLANDI · ${bilet.pnr}`);
  const route = eleman("h2", "ticket-route", `${bilet.kalkis}  →  ${bilet.varis}`);
  const subtitle = eleman("p", "ticket-subtitle", `${bilet.sinif}  ·  Terminal ${bilet.terminal}`);
  card.append(stamp, route, subtitle);

  const meta = eleman("div", "ticket-meta");
  const fields = [
    ["Yolcu", bilet.ad],
    ["Koltuk", bilet.koltuk],
    ["Uçuş tarihi", tarihYaz(bilet.tarih)],
    ["Saat", bilet.saat],
    ["Ek hizmetler", bilet.hizmetler.join(", ") || "Standart"]
  ];
  fields.forEach(([label, value]) => {
    const item = eleman("div");
    item.append(eleman("span", "", label), eleman("strong", "", value));
    meta.append(item);
  });
  card.append(meta);

  const bagText = eleman("div", "ticket-bag");
  bagText.append(eleman("span", "", "Bagaj ölçümü"), eleman("strong", "", `${bilet.bagaj} kg / ${bilet.bagajLimit} kg`));
  const meter = eleman("meter");
  meter.min = 0;
  meter.max = bilet.bagajLimit;
  meter.low = Math.round(bilet.bagajLimit * .4);
  meter.high = Math.round(bilet.bagajLimit * .75);
  meter.optimum = Math.round(bilet.bagajLimit * .3);
  meter.value = Math.min(bilet.bagaj, bilet.bagajLimit);
  meter.setAttribute("aria-label", `Bagaj ${bilet.bagaj} kilogram, üst sınır ${bilet.bagajLimit} kilogram`);
  card.append(bagText, meter);

  const actions = eleman("div", "ticket-actions");
  if (bilet.mail) {
    const mail = eleman("a", "", "E-posta taslağı aç");
    mail.href = `mailto:${encodeURIComponent(bilet.mail)}?subject=${encodeURIComponent(`AeroSiber biniş kartı ${bilet.pnr}`)}`;
    actions.append(mail);
  } else {
    actions.append(eleman("span", "", "İletişim adresi eklenmedi"));
  }
  const remove = eleman("button", "", "Bileti iptal et");
  remove.type = "button";
  remove.dataset.ticketId = bilet.id;
  actions.append(remove);
  card.append(actions);
  return card;
}

function binisKartlariniCiz() {
  const alan = document.getElementById("binis-kartlari-alani");
  if (!alan) return;
  alan.replaceChildren();
  if (!biletListesi.length) {
    const empty = eleman("div", "empty-tickets");
    empty.append(eleman("i", "fa-solid fa-ticket", ""), eleman("h2", "", "Henüz biniş kartın yok"), eleman("p", "", "Bir uçuş planla; hazırladığın kart burada görünsün."));
    const link = eleman("a", "btn btn-info btn-sm fw-bold text-dark", "İlk biletini oluştur");
    link.href = "rezervasyon.html";
    empty.append(link);
    alan.append(empty);
    return;
  }
  biletListesi.forEach(bilet => alan.append(biletKartiOlustur(bilet)));
}

function biletIptal(id) {
  const eskiListe = biletListesi;
  biletListesi = biletListesi.filter(bilet => bilet.id !== id);
  if (!biletleriKaydet()) {
    biletListesi = eskiListe;
    return;
  }
  biletSayaciGuncelle();
  binisKartlariniCiz();
}

function tumBiletleriSil() {
  if (!biletListesi.length || !window.confirm("Bu tarayıcıdaki tüm biniş kartları silinsin mi?")) return;
  const eskiListe = biletListesi;
  biletListesi = [];
  if (!biletleriKaydet()) biletListesi = eskiListe;
  biletSayaciGuncelle();
  binisKartlariniCiz();
}

function koltukGuncelle(deger) {
  const display = document.getElementById("koltukGosterge");
  if (display) display.textContent = `${deger}A`;
}

function queryParametreleriniUygula() {
  const params = new URLSearchParams(window.location.search);
  const kalkis = document.getElementById("kalkisYeri");
  const status = document.getElementById("formDurumu");
  const queryCikis = params.get("cikis");
  const kampanya = params.get("kampanya");
  if (kalkis && queryCikis) kalkis.value = queryCikis.slice(0, 90);
  if (status && kampanya) status.textContent = `Bağlantı parametresi alındı: ${kampanya}. Uçuş bilgilerini tamamlayabilirsin.`;
}

function pilotKartiOlustur(pilot) {
  const card = eleman("article", "kaptan-kart");
  const header = eleman("div", "profil-ust-sablon");
  const photo = eleman("img", "profil-yuvarlak-resim");
  photo.alt = `${pilot.firstName} ${pilot.lastName} profil fotoğrafı`;
  photo.loading = "lazy";
  photo.src = pilot.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23183249'/%3E%3Ctext x='50%25' y='58%25' text-anchor='middle' font-size='44' fill='%234fe2f1' font-family='Arial'%3E%E2%9C%88%3C/text%3E%3C/svg%3E";
  photo.addEventListener("error", () => { photo.removeAttribute("src"); photo.classList.add("photo-fallback"); });
  header.append(photo);
  const info = eleman("div", "kaptan-bilgi");
  info.append(eleman("span", "pilot-badge", "KAPTAN PİLOT"), eleman("h3", "", `${pilot.firstName} ${pilot.lastName}`), eleman("p", "", `Uçuş deneyimi · ${pilot.age * 120} saat`));
  const contact = eleman("a", "crew-contact", "E-posta ile ulaş");
  contact.href = `mailto:${pilot.email}?subject=${encodeURIComponent("AeroSiber uçuş hakkında")}`;
  info.append(contact);
  card.append(header, info);
  return card;
}

async function kaptanlariGetir() {
  const area = document.getElementById("kaptan-listesi");
  if (!area) return;
  const status = document.getElementById("kaptanDurumu");
  let pilots = PILOT_YEDEKLERI;
  try {
    const response = await fetch("https://dummyjson.com/users?limit=4", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("API yanıt vermedi");
    const data = await response.json();
    if (!Array.isArray(data.users) || !data.users.length) throw new Error("Mürettebat listesi boş");
    pilots = data.users.slice(0, 4).map(person => ({
      firstName: yazi(person.firstName, 35, "Pilot"),
      lastName: yazi(person.lastName, 35, "AeroSiber"),
      age: sinirla(person.age, 20, 70, 30),
      email: epostaGecerliMi(person.email) ? person.email : "destek@aerosiber.com",
      image: typeof person.image === "string" && person.image.startsWith("https://") ? person.image : ""
    }));
    if (status) status.textContent = "Örnek ekip bilgileri açık API'den yüklendi.";
  } catch {
    if (status) status.textContent = "API erişilemiyor; örnek mürettebat kartları gösteriliyor.";
  }
  area.replaceChildren(...pilots.map(pilotKartiOlustur));
}

document.addEventListener("DOMContentLoaded", () => {
  biletSayaciGuncelle();
  binisKartlariniCiz();
  kaptanlariGetir();

  const seatRange = document.getElementById("koltukRange");
  if (seatRange) {
    koltukGuncelle(seatRange.value);
    seatRange.addEventListener("input", () => koltukGuncelle(seatRange.value));
  }

  const bookingForm = document.getElementById("ucusFormu");
  if (bookingForm) {
    queryParametreleriniUygula();
    bookingForm.addEventListener("submit", formuGonder);
  }

  const tickets = document.getElementById("binis-kartlari-alani");
  if (tickets) tickets.addEventListener("click", event => {
    const button = event.target.closest("[data-ticket-id]");
    if (button) biletIptal(button.dataset.ticketId);
  });
  const deleteAll = document.getElementById("tumBiletleriSil");
  if (deleteAll) deleteAll.addEventListener("click", tumBiletleriSil);
});
