# Siber Kalkan — Bertuğ Saka · 1297

11. sınıf Web Tabanlı Uygulama Geliştirme finali için üç sayfalı siber güvenlik ajansı demosu. Kod içinde Ctrl+F ile görev işaretlerini ara.

## Çalıştırma

final_1297 klasörünü VS Code'da açıp index.html dosyasını Live Server ile başlat. Üç sayfa aynı yerel sunucuda çalışınca localStorage kayıtları ortak kullanılır. Form gönderince kanıt paneline geçilir.

Örnek geçerli kilit: 1297TR. 999AA bu projede reddedilmelidir. Okul numaranın ardından tam iki büyük harf gerekir.

## Görev işaretleri

| Ctrl+F ara | Dosya | Açıklama |
|---|---|---|
| /görev1 | index.html | mailto: e-posta taslağı açar; target="_blank" dış siteyi yeni sekmede açar; #kadroBolumu aynı sayfadaki bölüme gider. Okul e-postan varsa mailto: kısmına ekle. |
| /görev2 | index.html | Siber Kalkan konsept adı, slogan, tanıtım ve üç hizmet kartı. |
| /görev3 | style.css | ::after başlıklara isim-numara imzası ekler. padding iç boşluktur; dashed border görünür kenarlık verir; sol çizgi 8px kalınlığındadır. |
| /görev4 | style.css | .uzman-ust-sablon position: relative olur; içteki absolute fotoğraf kartı referans alır. |
| /görev5 | gorev-formu.html | autofocus, required, datalist, date ve en önemli pattern="1297[A-Z]{2}" kuralı. |
| /görev6 | gorev-formu.html | İkinci optgroup, min=10, max=100, step=10, color ve checkbox alanları. |
| /görev7 | style.css | .ozel-input:focus koyu zemin, açık yazı ve camgöbeği kenarlık verir. |
| /görev10 | kanit-paneli.html | Doldurulmuş kanıt tablosu ve öğretmene anlatım notları. |
| finalKayitlar | app.js | Form profil kayıtlarının localStorage anahtarı. |
| startTeacherAudit | app.js | Kaydı, HTML pattern değerini, CSS kurallarını ve kanıt tablosunu denetler. |

## Hoca yanıma gelince

1. Vitrinde Siber Kalkan konseptini, sloganı ve üç hizmeti göster.
2. /görev1 işaretini açıp mailto:, yeni sekme ve sayfa içi bağlantıyı anlat.
3. Formdaki kilit kutusuna 999AA yazıp göndermeyi dene. Tarayıcı formu durdurmalı; çünkü başında 1297 yok.
4. 1297TR yaz, diğer gerekli alanları doldur: şehir, tarih, paket, miktar ve en az 10 karakterlik not. Gönderince profil kanıt paneline eklenir.
5. Panelde Kodu denetle düğmesine basıp puan satırlarını göster.
6. Kanıt tablosundan bir satır seç ve kendi cümlenle açıkla. Örneğin: position: relative, yuvarlak fotoğrafın yerini kartın üst bölümüne göre ayarlar.
7. Kaynak kod sorarsa gorev-formu.html içinde Ctrl+F ile /görev5 veya pattern ara. Kural 1297[A-Z]{2} olmalı.

## Kısa sözlü cevaplar

- pattern="1297[A-Z]{2}": 1297 sabit okul numarasıdır. [A-Z] bir büyük Latin harfidir, {2} tam iki harf anlamına gelir. 1297TR geçer; 999AA, 1297T ve 1297tr geçmez.
- ::after CSS ile başlığın sonuna görünür imza ekler.
- padding içerik ile kenarlık arasındaki iç boşluktur; margin kutunun dışındaki boşluktur.
- position: relative içindeki position: absolute elemanlara konum referansı sağlar.
- datalist öneri sunar ama listede olmayan yazıyı tek başına engellemez.
- meter belli bir aralıktaki ölçüyü; progress ilerleme oranını gösterir.
- localStorage kaydı bu tarayıcıda saklar; bu demoda gerçek sunucuya veya veritabanına gönderilmez.

## Dosyalar

- index.html: vitrin, bağlantılar ve uzman API kartları.
- gorev-formu.html: kişisel numara kuralı ve HTML5 form alanları.
- kanit-paneli.html: kayıt kartları, otomatik denetim ve kanıt tablosu.
- style.css: tasarım ve görev stilleri.
- app.js: API yedeği, form kaydı, kart üretimi ve teknik denetim.