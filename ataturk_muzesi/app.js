"use strict";

const ANI_KEY = "ataturkAniDefteri";
const ANI_HEDEFI = 100;
const VARSAYILAN_ANILAR = [
  {
    id: "ornek-zumre",
    ad: "Zonguldak MTAL Bilişim Zümresi",
    sehir: "Zonguldak",
    okulNo: "1923",
    tarih: "2026-11-10",
    kategori: "Öğretmen ve Eğitimcilerin Sözü",
    unvan: "Öğretmen",
    renk: "#d4af37",
    hedef: 100,
    metin: "Aziz Atatürk; gösterdiğin çağdaş uygarlık hedefi doğrultusunda, kod yazan, üreten ve vatanını seven gençler yetiştirmeye ant içeriz."
  },
  {
    id: "ornek-ogrenciler",
    ad: "11. Sınıf Web Geliştirme Öğrencileri",
    sehir: "Zonguldak",
    okulNo: "2026",
    tarih: "2026-11-10",
    kategori: "Bilim ve Teknoloji Sözü",
    unvan: "Bilişim Öğrencisi",
    renk: "#e30a17",
    hedef: 100,
    metin: "Bize emanet ettiğin Cumhuriyeti, bilim ve yazılım teknolojileriyle geleceğe taşıyacağımıza söz veriyoruz."
  }
];

const id = value => document.getElementById(value);

function kisaMetin(value, limit = 500) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function sayiAraliginda(value, min, max, fallback) {
  const numara = Number(value);
  return Number.isFinite(numara) ? Math.min(max, Math.max(min, numara)) : fallback;
}

function anilariOku() {
  try {
    const kayit = localStorage.getItem(ANI_KEY);
    if (kayit === null) return VARSAYILAN_ANILAR.map(ani => ({ ...ani }));
    const anilar = JSON.parse(kayit);
    if (!Array.isArray(anilar)) return VARSAYILAN_ANILAR.map(ani => ({ ...ani }));
    return anilar.filter(ani => ani && typeof ani === "object").map((ani, index) => ({
      id: kisaMetin(ani.id, 80) || `ani-${index}-${Date.now()}`,
      ad: kisaMetin(ani.ad, 80) || "Ziyaretçi",
      sehir: kisaMetin(ani.sehir, 60) || "Belirtilmedi",
      okulNo: kisaMetin(ani.okulNo, 6),
      tarih: kisaMetin(ani.tarih, 10),
      kategori: kisaMetin(ani.kategori, 80) || "Anma ve Minnet",
      unvan: kisaMetin(ani.unvan, 50) || "Ziyaretçi",
      renk: /^#[0-9a-f]{6}$/i.test(ani.renk) ? ani.renk : "#d4af37",
      hedef: sayiAraliginda(ani.hedef, 50, 100, 100),
      metin: kisaMetin(ani.metin, 500)
    }));
  } catch {
    return VARSAYILAN_ANILAR.map(ani => ({ ...ani }));
  }
}

let aniListesi = anilariOku();
let acilisOdakNoktasi = null;

function sayaciGuncelle() {
  document.querySelectorAll("#aniSayaci").forEach(sayac => {
    sayac.textContent = String(aniListesi.length);
  });
  const progress = id("hedefProgress");
  if (progress) progress.value = Math.min(aniListesi.length, ANI_HEDEFI);
  const meter = id("hedefMeter");
  if (meter) meter.value = Math.min(aniListesi.length, ANI_HEDEFI);
  const hedefSayi = id("hedefSayi");
  if (hedefSayi) hedefSayi.textContent = String(Math.min(aniListesi.length, ANI_HEDEFI));
  const summary = id("wallSummary");
  if (summary) summary.textContent = `${aniListesi.length} anı yaprağı bu tarayıcıda kayıtlı.`;
}

function metinEkle(parent, tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  parent.append(element);
  return element;
}

function tarihiBicimlendir(value) {
  const parcalar = (value || "").split("-");
  return parcalar.length === 3 ? `${parcalar[2]}.${parcalar[1]}.${parcalar[0]}` : "Tarih belirtilmedi";
}

function aniKartiniOlustur(ani) {
  const kolon = document.createElement("div");
  kolon.className = "col-12 col-lg-6";

  const kart = document.createElement("article");
  kart.className = "ani-yapragi";
  kart.style.setProperty("--leaf-color", ani.renk);

  const ust = document.createElement("div");
  ust.className = "ani-kart-baslik";
  metinEkle(ust, "span", "category-badge", ani.kategori);
  metinEkle(ust, "span", "muhur-damga", `CUMHURİYET MUHAFIZI #${ani.okulNo}`);

  const anaGovde = document.createElement("div");
  anaGovde.append(ust);
  metinEkle(anaGovde, "p", "ani-metin", `“${ani.metin}”`);

  const puanSatiri = document.createElement("div");
  puanSatiri.className = "mb-3";
  const puanBilgisi = document.createElement("div");
  puanBilgisi.className = "d-flex justify-content-between align-items-center small";
  metinEkle(puanBilgisi, "span", "text-secondary", "Bilim ve teknoloji katkı hedefi");
  metinEkle(puanBilgisi, "strong", "gold-text", `%${ani.hedef}`);
  const aniMeter = document.createElement("meter");
  aniMeter.className = "ani-meter";
  aniMeter.min = 0;
  aniMeter.max = 100;
  aniMeter.low = 60;
  aniMeter.high = 85;
  aniMeter.optimum = 100;
  aniMeter.value = ani.hedef;
  aniMeter.setAttribute("aria-label", `Bilim ve teknoloji katkı hedefi yüzde ${ani.hedef}`);
  puanSatiri.append(puanBilgisi, aniMeter);

  const alt = document.createElement("div");
  alt.className = "ani-kart-foot";
  const kisi = document.createElement("div");
  kisi.className = "ani-kart-kisi";
  metinEkle(kisi, "strong", "d-block", ani.ad);
  metinEkle(kisi, "span", "d-block", `${ani.unvan} · ${ani.sehir}`);
  metinEkle(kisi, "small", "d-block", tarihiBicimlendir(ani.tarih));
  const sil = document.createElement("button");
  sil.className = "delete-memory";
  sil.type = "button";
  sil.setAttribute("aria-label", `${ani.ad} adlı ziyaretçinin anı yaprağını sil`);
  sil.title = "Anı yaprağını sil";
  const ikon = document.createElement("i");
  ikon.className = "fa-regular fa-trash-can";
  ikon.setAttribute("aria-hidden", "true");
  sil.append(ikon);
  sil.addEventListener("click", () => aniSil(ani.id, kolon));
  alt.append(kisi, sil);

  kart.append(anaGovde, puanSatiri, alt);
  kolon.append(kart);
  return kolon;
}

function aniDuvariniCiz() {
  const duvar = id("ani-duvari-listesi");
  if (!duvar) return;
  duvar.replaceChildren(...aniListesi.map(aniKartiniOlustur));
  const empty = id("bosDuvar");
  if (empty) empty.hidden = aniListesi.length > 0;
  sayaciGuncelle();
}

function aniSil(aniId, kolon) {
  const silme = () => {
    const oncekiListe = aniListesi;
    aniListesi = aniListesi.filter(ani => ani.id !== aniId);
    if (!anilariKaydet()) {
      aniListesi = oncekiListe;
      const summary = id("wallSummary");
      if (summary) summary.textContent = "Tarayıcı depolaması kullanılamıyor; anı yaprağı silinemedi.";
      if (window.jQuery) window.jQuery(kolon).stop(true, true).fadeIn(160);
      return;
    }
    aniDuvariniCiz();
  };
  if (window.jQuery) {
    window.jQuery(kolon).fadeOut(260, silme);
  } else {
    kolon.classList.add("is-leaving");
    window.setTimeout(silme, 240);
  }
}

function anilariKaydet() {
  try {
    localStorage.setItem(ANI_KEY, JSON.stringify(aniListesi));
    return true;
  } catch {
    return false;
  }
}

function aniKaydet(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const yeniAni = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `ani-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    ad: kisaMetin(formData.get("ad"), 80),
    sehir: kisaMetin(formData.get("sehir"), 60),
    okulNo: kisaMetin(formData.get("okulNo"), 6),
    tarih: kisaMetin(formData.get("tarih"), 10),
    kategori: kisaMetin(formData.get("kategori"), 80),
    unvan: kisaMetin(formData.get("unvan"), 50) || "Ziyaretçi",
    renk: /^#[0-9a-f]{6}$/i.test(formData.get("renk")) ? formData.get("renk") : "#d4af37",
    hedef: sayiAraliginda(formData.get("hedef"), 50, 100, 100),
    metin: kisaMetin(formData.get("metin"), 500)
  };

  aniListesi.unshift(yeniAni);
  const status = id("formDurumu");
  if (!anilariKaydet()) {
    aniListesi.shift();
    if (status) status.textContent = "Tarayıcı depolaması kullanılamıyor. Anı yaprağı kaydedilemedi.";
    return;
  }
  if (status) status.textContent = `Teşekkürler ${yeniAni.ad}. Anı yaprağın bu tarayıcıya kaydedildi; duvara yönlendiriliyorsun.`;
  window.setTimeout(() => { window.location.href = "anilar.html"; }, 650);
}

function hedefGuncelle(value) {
  const display = id("hedefGosterge");
  if (display) display.textContent = `%${value}`;
}

function saygiDurusuAc() {
  const overlay = id("saygiDurusuKatmani");
  if (!overlay) return;
  acilisOdakNoktasi = document.activeElement;
  overlay.hidden = false;
  document.body.classList.add("modal-open");
  if (window.jQuery) window.jQuery(overlay).stop(true, true).hide().fadeIn(450);
  const closeButton = id("saygiKapat");
  if (closeButton) closeButton.focus();
}

function saygiDurusuKapat() {
  const overlay = id("saygiDurusuKatmani");
  if (!overlay) return;
  const tamamla = () => {
    overlay.hidden = true;
    document.body.classList.remove("modal-open");
    if (acilisOdakNoktasi && typeof acilisOdakNoktasi.focus === "function") acilisOdakNoktasi.focus();
  };
  if (window.jQuery) window.jQuery(overlay).stop(true, true).fadeOut(350, tamamla);
  else tamamla();
}

function cerceveStiliniAyarla(stil, dugme) {
  const allowed = new Set(["double", "dotted", "ridge"]);
  const cerceve = id("hitabeCerceve");
  if (!cerceve || !allowed.has(stil)) return;
  cerceve.style.setProperty("--frame-style", stil);
  document.querySelectorAll("[data-frame-style]").forEach(secenek => {
    secenek.setAttribute("aria-pressed", String(secenek === dugme));
  });
  const status = id("frameStatus");
  if (status) status.textContent = `${dugme.textContent} çerçeve stili seçili.`;
}

function formGostergecileriniHazirla() {
  const form = id("aniFormu");
  if (!form) return;
  const range = id("hedefRange");
  const textarea = id("aniMetni");
  const counter = id("metinSayaci");
  if (range) {
    hedefGuncelle(range.value);
    range.addEventListener("input", () => hedefGuncelle(range.value));
  }
  if (textarea && counter) {
    const update = () => { counter.textContent = `${textarea.value.length} / ${textarea.maxLength}`; };
    textarea.addEventListener("input", update);
    form.addEventListener("reset", () => window.setTimeout(update));
    update();
  }
  form.addEventListener("submit", aniKaydet);
}

function marsKontrolunuHazirla() {
  const button = document.createElement("button");
  const audio = new Audio("gorseller/istiklal-marsi.mp3");
  button.type = "button";
  button.className = "mars-kontrol";
  button.textContent = "▶ İstiklâl Marşı";
  button.setAttribute("aria-label", "İstiklâl Marşı'nı çal");
  button.setAttribute("aria-pressed", "false");
  audio.preload = "none";
  button.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        button.textContent = "Ⅱ Durdur";
        button.setAttribute("aria-label", "İstiklâl Marşı'nı durdur");
        button.setAttribute("aria-pressed", "true");
      } catch {
        button.textContent = "Marş yüklenemedi";
        button.setAttribute("aria-label", "İstiklâl Marşı yüklenemedi");
      }
      return;
    }
    audio.pause();
    audio.currentTime = 0;
    button.textContent = "▶ İstiklâl Marşı";
    button.setAttribute("aria-label", "İstiklâl Marşı'nı çal");
    button.setAttribute("aria-pressed", "false");
  });
  audio.addEventListener("ended", () => {
    button.textContent = "▶ İstiklâl Marşı";
    button.setAttribute("aria-label", "İstiklâl Marşı'nı çal");
    button.setAttribute("aria-pressed", "false");
  });
  document.body.append(button);
}

document.addEventListener("DOMContentLoaded", () => {
  sayaciGuncelle();
  aniDuvariniCiz();
  formGostergecileriniHazirla();
  marsKontrolunuHazirla();
  document.querySelectorAll("[data-open-respect]").forEach(button => button.addEventListener("click", saygiDurusuAc));
  const closeButton = id("saygiKapat");
  if (closeButton) closeButton.addEventListener("click", saygiDurusuKapat);
  document.querySelectorAll("[data-frame-style]").forEach(button => {
    button.addEventListener("click", () => cerceveStiliniAyarla(button.dataset.frameStyle, button));
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && id("saygiDurusuKatmani") && !id("saygiDurusuKatmani").hidden) saygiDurusuKapat();
  });
});
