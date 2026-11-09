# 1. Hafta: Temel Kavramlar

## İnternetin temel yapı taşları

- **IP adresi (Internet Protocol Address):** İnternete bağlı her cihazı (bilgisayar, sunucu, telefon vb.) tanımlayan, noktalama işaretleriyle ayrılmış benzersiz sayısal etikettir.
- **DNS (Domain Name System):** İnsanların okuyabildiği alan adlarını (ör. `google.com`), bilgisayarların anladığı IP adreslerine çeviren internetin telefon rehberidir.
- **Sunucu (Server):** Web sitelerini, dosyaları veya uygulamaları barındıran ve internet üzerinden gelen isteklere yanıt veren, sürekli çalışan güçlü bilgisayardır.
- **HTTP (Hypertext Transfer Protocol):** Web tarayıcısı ile sunucu arasında web sayfası verilerinin nasıl aktarılacağını belirleyen temel iletişim kuralıdır.
- **HTTPS (Hypertext Transfer Protocol Secure):** HTTP'nin, tarayıcı ile sunucu arasındaki veri iletişimini şifreleyerek güvenli hâle getiren sürümüdür.

## Web sitesinin adresi ve konumu

- **Domain (alan adı):** Bir web sitesinin karmaşık IP adresi yerine kullanılan, akılda kalıcı ve kolay yazılabilen ismidir (ör. `google.com`).
- **URL (Uniform Resource Locator):** Bir web kaynağının (belirli bir sayfa, resim veya dosya) internetteki tam ve belirli adresini gösteren metin dizisidir.
- **WWW (World Wide Web):** İnternet üzerinde barındırılan ve URL'ler aracılığıyla erişilebilen, birbirine bağlı web sayfaları ve içeriklerden oluşan küresel sistemdir.
- **Hosting (barındırma):** Bir web sitesinin tüm dosya ve verilerinin internet üzerinden 7/24 erişilebilir olmasını sağlayan sunucuda saklanması hizmetidir.
- **FTP (File Transfer Protocol):** Bilgisayarınız ile sunucu arasında dosya yüklemek veya indirmek için kullanılan standart ağ protokolüdür.

## Web sayfasının yapısı ve görünümü

- **HTML (Hypertext Markup Language):** Bir web sayfasının iskeletini; başlık, paragraf ve resim gibi temel içeriğini ve yapısını oluşturan standart işaretleme dilidir.
- **Etiket (tag):** HTML'de bir elementi tanımlamak için kullanılan, küçüktür ve büyüktür işaretleri (`< >`) arasındaki ifadedir. Örneğin, `<p>` bir paragraf etiketidir.
- **CSS (Cascading Style Sheets):** HTML ile oluşturulmuş bir web sayfasının renk, yazı tipi ve yerleşim gibi görsel stilini belirleyen dildir.
- **JavaScript (JS):** Web sayfalarına tıklanabilir butonlar, animasyonlar ve form kontrolleri gibi etkileşimli özellikler kazandıran programlama dilidir.

## Web geliştirici rolleri ve araçları

- **Front-end (ön yüz):** Kullanıcının tarayıcıda doğrudan gördüğü ve etkileşimde bulunduğu arayüzü geliştirme alanıdır.
- **Back-end (arka yüz):** Veritabanı, sunucu işlemleri ve iş mantığı gibi kullanıcı tarafından görülmeyen arka plan sistemlerini geliştirme alanıdır.
- **Full-stack (tam yığın):** Bir web projesinin hem front-end hem de back-end geliştirmesini yapabilme uzmanlığıdır.
- **Tarayıcı (browser):** Google Chrome ve Firefox gibi web sayfalarını görüntülememizi ve onlarla etkileşim kurmamızı sağlayan yazılımdır.
- **Editör (kod editörü):** Web geliştiricilerin HTML ve CSS gibi kodları yazmak, düzenlemek ve yönetmek için kullandığı özel metin düzenleme programıdır (ör. VS Code).
- **WYSIWYG editör:** Kod yazmadan, sürükle-bırak gibi görsel araçlarla web sayfası oluşturmayı sağlayan editördür. “Ne görürsen onu alırsın” prensibiyle çalışır.

## Yaygın alan adı uzantıları

| Uzantı | Açıklama |
|---|---|
| `gov` (government) | Devlet kurumları |
| `edu` (education) | Eğitim kurumları |
| `k12` (kindergarten–12) | Temel eğitim ve ortaöğretim kurumları |
| `org` (organization) | Ticari olmayan kuruluşlar |
| `com` (company) | Ticari kuruluşlar |
| `mil` (military) | Askerî kurumlar |
| `net` (network) | Servis sunucuları |
| `ac` (academic) | Akademik kuruluşlar |
| `int` (international) | Uluslararası kuruluşlar |
| `info` (information) | Bilgi içerikli web siteleri |
| `biz` (business) | Ticari kuruluşlar |

## Görev 2: Haftaya hazırlık uygulaması (ödev)

Haftaya sitemizin içine oyunlar ve alt sayfalar ekleyeceğiz. Pratik yapmanız için sizden şunları istiyorum:

1. VS Code kullanarak üç yeni HTML dosyası oluşturun:
   - `oyun1.html` — İçine `<h1>Taş Kağıt Makas</h1>` yazın.
   - `oyun2.html` — İçine `<h1>Sayı Tahmin Oyunu</h1>` yazın.
   - `oyun3.html` — İçine `<h1>Benim Oyunum</h1>` yazın.
2. Bu üç dosyayı, bugün öğrendiğimiz Windows Dosya Gezgini ile FTP yöntemiyle sunucunuzdaki `htdocs` (veya `wwwroot`) klasörüne yükleyin.

Haftaya derste `sitenizinadi.com/oyun1.html` adresini yazarak dosyalarınızın çalışıp çalışmadığını kontrol edeceğiz!

# 2. Hafta: Web sitesi tasarım ilkeleri

Bu ilkeler sınavlarda kesinlikle karşınıza çıkacaktır. Defterinize yazın:

- **İçerik:** Sitenin kalbidir. Yazı, resim ve videolar özgün, doğru ve hedef kitleye uygun olmalıdır.
- **Tasarım (layout):** Logo, menü ve içeriklerin ekranda nereye ve hangi düzende yerleştirileceğinin planlanmasıdır.
- **Biçimsellik:** Renk uyumu, kontrast (zıtlık) ve okunabilir yazı tiplerinin (tipografi) kullanılmasıdır.
- **İşlevsellik ve kullanılabilirlik:** Sitenin hızlı yüklenmesi, menülerin ve butonların doğru çalışması ve kullanıcı dostu (kolay gezinilebilir) olmasıdır.
- **Güncellik:** Sitedeki haber, duyuru ve tarihlerin güncel olması; sitenin modern teknolojilerle (HTML5, CSS3) yapılmasıdır.
- **Uygunluk ve güvenilirlik:** İletişim bilgilerinin bulunması, kırık (çalışmayan) bağlantı olmaması ve dil bilgisi hatalarının bulunmamasıdır.
- **Uyumluluk:** Sitenin farklı tarayıcılarda (Chrome, Safari vb.) ve cihazlarda (mobil, tablet, bilgisayar) bozulmadan çalışmasıdır. Buna duyarlı tasarım (responsive design) denir. `<meta name="viewport" ...>` etiketi kullanılır.

# 3. Hafta: HTML5 özellikleri

Aşağıdaki HTML5 özelliklerini defterinize çizin ve yazın:

- `<!DOCTYPE html>`: Tarayıcıya HTML5 standartlarını kullandığımızı belirten zorunlu bildiridir.
- `<meta name="viewport" ...>`: Sitenin cep telefonlarında ve tabletlerde bozulmadan, ekrana duyarlı (responsive) çalışmasını sağlar.

## Başlık hiyerarşisi

- Bir sayfada yalnızca bir tane `<h1>` (ana başlık) kullanılır.
- Başlık sıralaması atlanamaz. Örneğin, `<h2>`'den sonra `<h4>` yazılamaz; `<h3>` gelmelidir.
- Başlık etiketleri yazıyı büyütmek için değil, sayfanın içindekiler yapısını oluşturmak için kullanılır. Yazı boyutu CSS ile ayarlanır.

## Anlamsal (semantic) etiketler — çok önemli

- `<header>`: Başlık ve logo alanı.
- `<nav>`: Menü (bağlantı) alanı.
- `<main>`: Sitenin ana içeriği.
- `<article>`: Bağımsız makale veya haber bölümü.
- `<section>`: İçerik içindeki alt bölümler.
- `<aside>`: Ana içeriğin yanında bulunan yan bilgiler (kenar çubuğu).
- `<footer>`: Sayfanın en altındaki telif ve iletişim alanı.

## Anlamsal metin biçimlendirme

- `<strong>`: Metni kalın gösterir ve arama motorlarına bu kelimenin önemli olduğunu belirtir.
- `<em>`: Metni italik gösterir ve vurgulanması gerektiğini belirtir.
- `<!-- Yorum -->`: Tarayıcıda görünmeyen, yalnızca kodlayıcının gördüğü nottur.

# 4. Hafta: CSS seçicileri

Aşağıdaki CSS seçicilerini ve ne işe yaradıklarını defterinize not alın:

- **Etiket seçici (`body`, `h1`):** HTML etiketinin adıyla doğrudan seçim yapar ve sayfadaki o etikete sahip tüm öğeleri etkiler.
- **Kimlik (ID) seçici (`#logo`):** HTML'de `id="logo"` olan öğeyi seçer. Bir sayfada bir ID yalnızca bir kez kullanılır. Başına `#` konur.
- **Sınıf (class) seçici (`.gezegen-karti`):** HTML'de `class="gezegen-karti"` olan öğeleri seçer. Birden fazla öğede kullanılabilir. Başına `.` konur.
- **Torun (descendant) seçici (`.gezegen-karti img`):** Seçiciler arasında boşluk bırakılarak yazılır. Bir kutunun içindeki, ne kadar derinde olursa olsun, eşleşen öğeleri seçer.
- **Sözde sınıf (pseudo-class) (`:hover`):** Kullanıcı fareyi bir öğenin üzerine getirdiğinde uygulanacak stili belirler.
- **Sözde eleman (pseudo-element) (`::first-letter`, `::selection`):** Öğenin belirli bir parçasını (ilk harfini veya fareyle seçilen kısmını) hedef alır. Çift iki nokta (`::`) ile yazılır.

# 5. Hafta: JavaScript

- **JavaScript nedir?** Web sayfalarına mantık, karar verme yeteneği ve kullanıcıyla etkileşim kazandıran programlama dilidir.
- **DOM (Document Object Model):** JavaScript'in HTML etiketlerine müdahale edebilmesi için oluşturulan ağaç yapısıdır. `document.getElementById("Kutu")` kodu, HTML'deki `id` değeri `Kutu` olan öğeyi bulmamızı sağlar.
- **`var` / `let` (değişkenler):** Bilgisayarın geçici hafızasında sayı veya metin gibi verileri saklayan kutulardır.
- **`if` / `else`:** Karar yapısıdır. Şart doğruysa (`if`) bir kodu, yanlışsa (`else`) başka bir kodu çalıştırır.
- **`switch` / `case`:** Bir değişkenin alabileceği çok sayıda seçenek varsa `if` / `else` yerine daha düzenli bir yapı sunar. İşlem bitince `break;` ile çıkılır.
- **`return`:** Bir fonksiyonun görevini bitirdikten sonra kendisini çağıran yere bir değer döndürmesidir.

# 6. Hafta

Deftere yazma yok.

# 7. Hafta

Deftere yazma yok.

# 8. Hafta

- **`<a>` etiketi ve `target` özelliği:** `target="_blank"` bağlantıyı yeni sekmede, `target="_self"` (varsayılan) aynı sekmede açar. `href="#id"` sayfa içi bağlantı kurar; `href="mailto:..."` e-posta göndermek için kullanılır.
- **`<fieldset>` ve `<legend>`:** `<fieldset>` form elemanlarını mantıksal gruplara ayırıp etraflarına çerçeve çizer. `<legend>` bu çerçevenin başlığını oluşturur.
- **`<optgroup>` ve `<datalist>`:** `<optgroup>`, açılır liste (`<select>`) seçeneklerini kategorilere ayırır. `<datalist>` ise bir `<input>` kutusuna otomatik tamamlama önerileri bağlar.
- **`<meter>` ve `<progress>`:** `<meter>`, bilinen bir aralıktaki ölçümü (disk doluluğu, bütçe riski veya sınav puanı gibi) gösterir. `<progress>` ise bir işlemin ilerleme durumunu (ör. %50 yüklendi) gösterir.

# 9. Hafta

- **Sözde sınıf seçiciler (`:hover`, `:focus`, `:active`):** `:hover` fareyle öğenin üzerine gelindiğinde, `:active` fareyle basılı tutulduğunda, `:focus` ise bir `<input>` kutusuna tıklanıp veri girişi yapıldığında uygulanacak stili belirler.
- **Sözde eleman seçiciler (`::first-letter`, `::before`, `::after`, `::selection`):** Elemanın ilk harfini, öncesini, sonrasını veya fareyle seçilen metin alanını biçimlendirir.
- **Kutu modeli (Box Model):** Her HTML elemanı bir kutudur. İçten dışa doğru `content` (içerik), `padding` (iç boşluk), `border` (kenarlık) ve `margin` (dış boşluk) katmanlarından oluşur.
- **Pozisyon ayarları (`position`):** `relative`, elemanı normal konumuna göre kaydırır ve içindeki `absolute` elemanlar için kapsayıcı (referans) olur. `fixed`, elemanı ekrana sabitler; sayfa kaydırılsa da eleman hareket etmez. `z-index`, üst üste gelen elemanlardan hangisinin önde duracağını belirler.
