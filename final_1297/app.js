"use strict";

const STUDENT_NUMBER = document.querySelector('meta[name="student-number"]')?.content || "1297";
const STORAGE_KEY = "finalKayitlar";

function readRecords() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value.filter((record) => record && typeof record === "object") : [];
  } catch (error) { return []; }
}
function saveRecords(records) { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }
function refreshCount() {
  const count = String(readRecords().length);
  document.querySelectorAll("#kayitSayaci").forEach((node) => { node.textContent = count; });
}
function textNode(tag, value, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.textContent = value;
  return node;
}

const FALLBACK_EXPERTS = [
  { firstName: "Deniz", lastName: "Arslan", department: "Ağ Güvenliği", email: "deniz@example.com" },
  { firstName: "Ece", lastName: "Yılmaz", department: "Olay Müdahalesi", email: "ece@example.com" },
  { firstName: "Mert", lastName: "Kaya", department: "Güvenli Kimlik", email: "mert@example.com" },
  { firstName: "Ada", lastName: "Demir", department: "Güvenlik Eğitimi", email: "ada@example.com" }
];
function expertCard(person) {
  const card = document.createElement("article");
  card.className = "uzman-kart-kutu";
  const cover = document.createElement("div");
  cover.className = "uzman-ust-sablon";
  const initials = textNode("span", ((person.firstName || "?")[0] + (person.lastName || "")[0]).toLocaleUpperCase("tr-TR"), "uzman-initials");
  initials.setAttribute("aria-hidden", "true");
  cover.append(initials);
  if (person.image) {
    const image = document.createElement("img");
    image.className = "uzman-yuvarlak-foto";
    image.src = person.image;
    image.alt = (person.firstName || "Uzman") + " profil fotoğrafı";
    image.loading = "lazy";
    image.addEventListener("error", () => { image.hidden = true; });
    cover.append(image);
  }
  const info = document.createElement("div");
  info.className = "uzman-alt-bilgi";
  info.append(textNode("h3", [person.firstName, person.lastName].filter(Boolean).join(" ") || "Uzman"));
  info.append(textNode("p", person.department || "Siber güvenlik"));
  const email = document.createElement("a");
  email.href = "mailto:" + (person.email || "");
  email.textContent = "İletişim";
  info.append(email);
  card.append(cover, info);
  return card;
}
async function loadExperts() {
  const area = document.getElementById("uzman-vitrini");
  if (!area) return;
  const status = document.getElementById("uzmanDurumu");
  try {
    const response = await fetch("https://dummyjson.com/users?limit=4");
    if (!response.ok) throw new Error("API yanıtı başarısız");
    const result = await response.json();
    if (!Array.isArray(result.users)) throw new Error("API verisi geçersiz");
    const people = result.users.map((user) => ({
      firstName: user.firstName, lastName: user.lastName,
      department: user.company?.department, email: user.email, image: user.image
    }));
    area.replaceChildren(...people.map(expertCard));
    if (status) status.textContent = "Uzman örnekleri açık kullanıcı API'sinden yüklendi.";
  } catch (error) {
    area.replaceChildren(...FALLBACK_EXPERTS.map(expertCard));
    if (status) status.textContent = "API'ye erişilemedi; yerel örnek uzmanlar gösteriliyor.";
  }
}

function setRangeLabel(value) {
  const label = document.getElementById("rangeGosterge");
  if (label) label.textContent = value;
}
function formMessage(message, type) {
  const status = document.getElementById("formDurumu");
  if (!status) return;
  status.className = "form-status " + (type || "");
  status.textContent = message;
}
function submitProfile(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const code = String(formData.get("kilitKodu") || "");
  const codeRule = new RegExp("^" + STUDENT_NUMBER + "[A-Z]{2}$");
  if (!codeRule.test(code)) {
    const field = document.getElementById("ozelKilitKodu");
    field.setCustomValidity("Okul numaranın ardından tam iki büyük harf yazmalısın.");
    field.reportValidity();
    field.setCustomValidity("");
    return;
  }
  const chosenColor = String(formData.get("renk") || "#ffc107");
  const record = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    ad: String(formData.get("ad") || "").trim(),
    kilitKodu: code,
    sehir: String(formData.get("sehir") || "").trim(),
    tarih: String(formData.get("tarih") || ""),
    kategori: String(formData.get("kategori") || ""),
    miktar: Number(formData.get("miktar")),
    guc: Number(formData.get("guc")),
    renk: /^#[0-9a-f]{6}$/i.test(chosenColor) ? chosenColor : "#ffc107",
    secenekler: formData.getAll("secenek").map(String),
    not: String(formData.get("not") || "").trim()
  };
  try {
    const records = readRecords();
    records.unshift(record);
    saveRecords(records);
    formMessage("Kayıt alındı. Kanıt paneline yönlendiriliyorsun…", "success");
    window.location.assign("kanit-paneli.html");
  } catch (error) {
    formMessage("Tarayıcı kaydı yapılamadı. Depolama alanını veya gizli sekme ayarlarını kontrol et.", "error");
  }
}

function measureBlock(title, value, max, tagName, label) {
  const box = document.createElement("div");
  box.className = "profile-measure";
  const line = document.createElement("div");
  line.append(textNode("span", title), textNode("strong", String(value) + " / " + max));
  const measure = document.createElement(tagName);
  measure.min = 0;
  measure.max = max;
  measure.value = Math.min(max, Math.max(0, Number(value) || 0));
  measure.setAttribute("aria-label", label);
  box.append(line, measure);
  return box;
}
function profileCard(record, index) {
  const column = document.createElement("div");
  column.className = "col-md-6 card-grid-item";
  const card = document.createElement("article");
  card.className = "profile-card";
  card.style.borderTop = "3px solid " + (/^#[0-9a-f]{6}$/i.test(record.renk || "") ? record.renk : "#ffc107");
  const heading = document.createElement("div");
  heading.className = "profile-card-top";
  heading.append(textNode("h3", record.ad || "İsimsiz profil"), textNode("span", "Kilit: " + (record.kilitKodu || "—"), "profile-code"));
  card.append(heading);
  card.append(textNode("p", [record.kategori || "Paket seçilmedi", record.sehir || "Şehir belirtilmedi", record.tarih || "Tarih yok"].join(" · "), "profile-meta"));
  if (Array.isArray(record.secenekler) && record.secenekler.length) {
    const tags = document.createElement("div");
    tags.className = "profile-tags";
    record.secenekler.forEach((choice) => tags.append(textNode("span", String(choice))));
    card.append(tags);
  }
  card.append(textNode("p", "“" + (record.not || "Not girilmedi") + "”", "profile-note"));
  card.append(measureBlock("Miktar ölçümü (<meter>)", record.miktar, 100, "meter", "Miktar ölçümü"));
  card.append(measureBlock("Güç / bütçe ilerlemesi (<progress>)", record.guc, 100, "progress", "Güç veya bütçe ilerlemesi"));
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "btn btn-sm btn-outline-danger w-100 mt-3";
  remove.dataset.removeIndex = String(index);
  remove.textContent = "Bu kaydı sil";
  card.append(remove);
  column.append(card);
  return column;
}
function renderRecords() {
  const area = document.getElementById("uretilen-kartlar");
  if (!area) return;
  const records = readRecords();
  if (!records.length) {
    area.replaceChildren(textNode("p", "Henüz form kaydı yok. Önce kayıt ve konfigüratör sayfasından bir profil oluştur.", "empty-state"));
    return;
  }
  area.replaceChildren(...records.map(profileCard));
}
function deleteRecord(index) {
  const records = readRecords();
  if (!Number.isInteger(index) || index < 0 || index >= records.length) return;
  records.splice(index, 1);
  saveRecords(records);
  renderRecords();
  refreshCount();
}
function auditLine(list, type, title, detail) {
  const item = document.createElement("li");
  item.className = type;
  item.append(textNode("strong", title + " "), document.createTextNode(detail));
  list.append(item);
}
async function sourcePatternIsCorrect() {
  if (location.protocol === "file:") return null;
  try {
    const response = await fetch("gorev-formu.html", { cache: "no-store" });
    if (!response.ok) return false;
    const source = await response.text();
    const page = new DOMParser().parseFromString(source, "text/html");
    return page.querySelector("#ozelKilitKodu")?.getAttribute("pattern") === STUDENT_NUMBER + "[A-Z]{2}";
  } catch (error) { return null; }
}
async function startTeacherAudit() {
  const report = document.getElementById("denetimRaporuAlani");
  const button = document.getElementById("denetimDugmesi");
  if (!report) return;
  if (button) button.disabled = true;
  const list = document.createElement("ul");
  list.className = "audit-list";
  let score = 0;
  const codeRule = new RegExp("^" + STUDENT_NUMBER + "[A-Z]{2}$");
  const validRecord = readRecords().find((record) => codeRule.test(String(record.kilitKodu || "")));
  if (validRecord) {
    score += 25;
    auditLine(list, "ok", "Öğrenci kilit kodu (25 puan):", validRecord.kilitKodu + " okul numarası ve iki büyük harfle eşleşiyor.");
  } else {
    auditLine(list, "fail", "Öğrenci kilit kodu (0 puan):", "Kayıt yok veya kod 1297 ve ardından iki büyük harf biçiminde değil. Formdan 1297TR ile kayıt ekle.");
  }
  const patternOK = await sourcePatternIsCorrect();
  if (patternOK === true) {
    score += 25;
    auditLine(list, "ok", "HTML pattern (25 puan):", "Form dosyasındaki pattern okul numarası ve [A-Z]{2} ile eşleşiyor.");
  } else if (patternOK === null) {
    if (validRecord) score += 25;
    auditLine(list, "info", "HTML pattern kaynağı:", "file:// üzerinden kaynak otomatik okunamıyor. Kayıt biçimi doğrulandı; gorev-formu.html içindeki pattern değerini öğretmene göster.");
  } else {
    auditLine(list, "fail", "HTML pattern (0 puan):", "gorev-formu.html içindeki pattern değeri yanlış.");
  }

  const sampleCard = document.createElement("div");
  sampleCard.className = "hizmet-kutusu";
  sampleCard.setAttribute("aria-hidden", "true");
  document.body.append(sampleCard);
  const style = getComputedStyle(sampleCard);
  const paddingOK = parseFloat(style.paddingTop) >= 15;
  const borderOK = style.borderStyle !== "none";
  const padding = style.paddingTop;
  const border = style.borderStyle;
  sampleCard.remove();
  if (paddingOK && borderOK) {
    score += 25;
    auditLine(list, "ok", "CSS kutu modeli (25 puan):", "Padding " + padding + " ve " + border + " kenarlık bulundu.");
  } else {
    auditLine(list, "fail", "CSS kutu modeli (0 puan):", ".hizmet-kutusu için en az 15px padding ve görünen border-style tanımla.");
  }

  const sampleHeader = document.createElement("div");
  sampleHeader.className = "uzman-ust-sablon";
  sampleHeader.setAttribute("aria-hidden", "true");
  document.body.append(sampleHeader);
  const position = getComputedStyle(sampleHeader).position;
  sampleHeader.remove();
  if (position === "relative") {
    score += 15;
    auditLine(list, "ok", "Uzman fotoğrafı (15 puan):", ".uzman-ust-sablon position: relative; ayarı bulundu.");
  } else {
    auditLine(list, "fail", "Uzman fotoğrafı (0 puan):", "Fotoğraf kapsayıcısına position: relative; ekle.");
  }

  const rows = document.querySelectorAll("#savunmaTablosu tr");
  const filled = rows.length >= 4 && Array.from(rows).every((row) => {
    const text = row.querySelector("td")?.textContent.trim() || "";
    return text.length >= 35 && !/henüz doldurulmadı|buraya yazın/i.test(text);
  });
  if (filled) {
    score += 10;
    auditLine(list, "ok", "Kod kanıt tablosu (10 puan):", rows.length + " açıklama satırı doldurulmuş.");
  } else {
    auditLine(list, "fail", "Kod kanıt tablosu (0 puan):", "En az dört satırı açıklamayla doldur.");
  }
  const scoreBox = textNode("p", "OTOMATİK TEKNİK PUAN: " + score + " / 100", "audit-score");
  report.replaceChildren(list, scoreBox);
  if (button) button.disabled = false;
}
function initialize() {
  refreshCount();
  loadExperts();
  renderRecords();
  const form = document.getElementById("finalFormu");
  if (form) form.addEventListener("submit", submitProfile);
  const range = document.getElementById("gucRange");
  if (range) {
    setRangeLabel(range.value);
    range.addEventListener("input", () => setRangeLabel(range.value));
  }
  const cards = document.getElementById("uretilen-kartlar");
  if (cards) cards.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-index]");
    if (remove) deleteRecord(Number(remove.dataset.removeIndex));
  });
  const audit = document.getElementById("denetimDugmesi");
  if (audit) audit.addEventListener("click", startTeacherAudit);
}
document.addEventListener("DOMContentLoaded", initialize);