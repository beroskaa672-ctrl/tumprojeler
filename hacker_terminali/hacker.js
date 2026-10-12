var ilerleme = 0;
var kilitKirmaZamanlayici;
var sifreDondurmeZamanlayici;
var sahteLoglar = [
    "> Güvenlik duvarı atlanıyor...",
    "> Şifreleme algoritmaları çözülüyor...",
    "> Veritabanı portları taranıyor...",
    "> Yönetici (Admin) yetkileri alınıyor...",
    "> Veriler indiriliyor..."
];

function kodKirmayiBaslat() {
    var baslatBtn = document.getElementById("baslatBtn");

    if (baslatBtn.disabled) {
        return;
    }

    ilerleme = 0;
    document.getElementById("yuklemeBari").value = 0;
    document.getElementById("yuzdeYazi").textContent = "%0 Tamamlandı";
    baslatBtn.disabled = true;
    baslatBtn.textContent = "[ İŞLEM DEVAM EDİYOR... ]";

    sifreDondurmeZamanlayici = setInterval(rastgeleSifreUret, 100);
    kilitKirmaZamanlayici = setInterval(barDoldur, 500);
}

function rastgeleSifreUret() {
    var s1 = Math.floor(Math.random() * 9999);
    var s2 = Math.floor(Math.random() * 9999);
    var s3 = Math.floor(Math.random() * 9999);
    var s4 = Math.floor(Math.random() * 9999);

    document.getElementById("ekran").textContent =
        [s1, s2, s3, s4].map(function (sayi) {
            return String(sayi).padStart(4, "0");
        }).join("-");
}

function barDoldur() {
    ilerleme = Math.min(ilerleme + 10, 100);
    document.getElementById("yuklemeBari").value = ilerleme;
    document.getElementById("yuzdeYazi").textContent = "%" + ilerleme + " Tamamlandı";

    var rastgeleIndex = Math.floor(Math.random() * sahteLoglar.length);
    var log = document.createElement("li");
    log.textContent = sahteLoglar[rastgeleIndex];
    document.getElementById("logListesi").appendChild(log);

    if (ilerleme >= 100) {
        clearInterval(kilitKirmaZamanlayici);
        clearInterval(sifreDondurmeZamanlayici);
        document.getElementById("ekran").textContent = "ERİŞİM ONAYLANDI";
        document.getElementById("ekran").classList.add("erisildi");
        document.getElementById("baslatBtn").textContent = "[ SİMÜLASYON TAMAMLANDI ]";
    }
}
