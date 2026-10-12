function girisYap() {
    var girilenSifre = document.getElementById("sifreKutusu").value;
    var mesajAlani = document.getElementById("mesajAlani");

    if (girilenSifre === "2025") {
        mesajAlani.textContent = "Erişim onaylandı. Hoş geldiniz Kaptan.";
        mesajAlani.style.color = "cyan";
        document.getElementById("gizliMenu").hidden = false;
        document.getElementById("sifreKutusu").hidden = true;
        document.querySelector('button[onclick="girisYap()"]').hidden = true;
    } else {
        mesajAlani.textContent = "HATA: Geçersiz erişim kodu!";
        mesajAlani.style.color = "red";
    }
}

function kalkanYonet(durum) {
    var kutu = document.getElementById("kalkanDurumu");

    if (durum === "ac") {
        kutu.textContent = "KALKANLAR AKTİF (Maksimum Koruma)";
        kutu.className = "durum-kutusu mavi";
    } else if (durum === "kapat") {
        kutu.textContent = "KALKANLAR DEVRE DIŞI (Tehlike)";
        kutu.className = "durum-kutusu kirmizi";
    }
}

function motorYonet(calistir) {
    var kutu = document.getElementById("motorDurumu");

    if (calistir) {
        kutu.textContent = "MOTORLAR %100 GÜÇTE";
        kutu.className = "durum-kutusu turuncu";
    } else {
        kutu.textContent = "MOTORLAR KAPALI";
        kutu.className = "durum-kutusu kirmizi";
    }
}

function oksijenHesapla() {
    var rutbe = document.getElementById("rutbeSecim").value;
    var harcananLitre = litreBul(rutbe);

    document.getElementById("sonucAlani").textContent =
        "Günlük tüketim: " + harcananLitre + " litre";
}

function litreBul(gelenRutbe) {
    var litre = 0;

    switch (gelenRutbe) {
        case "kaptan":
            litre = 450;
            break;
        case "muhendis":
            litre = 600;
            break;
        case "bilim":
            litre = 300;
            break;
    }

    return litre;
}
