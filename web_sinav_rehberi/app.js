"use strict";

const PROGRESS_KEY = "weblab-bilinen-sorular";

const soruBankasi = [
  { id: 1, konu: "Temel kavramlar", soru: "IP adresi ve DNS (Domain Name System) nedir? Aralarındaki ilişkiyi bir örnekle açıklayın.", cevap: "IP adresi, internete bağlı bir cihazın sayısal adresidir. DNS, alan adlarını IP adreslerine çevirir. Tarayıcıya google.com yazdığınızda DNS, bu alan adının hangi sunucu IP'sine gittiğini bulur." },
  { id: 2, konu: "Temel kavramlar", soru: "Domain (alan adı) ile hosting (barındırma) arasındaki fark nedir?", cevap: "Hosting, sitenin dosyalarının 7/24 çalışan sunucuda saklandığı yerdir. Domain ise ziyaretçinin siteye ulaşmak için kullandığı addır. Kısaca hosting ev, domain o evin adresi gibidir." },
  { id: 3, konu: "Temel kavramlar", soru: "Front-End, Back-End ve Full-Stack yazılımcı ne yapar?", cevap: "Front-End geliştirici kullanıcının gördüğü arayüzü HTML, CSS ve JavaScript ile hazırlar. Back-End geliştirici sunucu, güvenlik ve veritabanı işlemlerini yapar. Full-Stack geliştirici her iki tarafta da çalışır." },
  { id: 4, konu: "Temel kavramlar", soru: "FTP nedir? htdocs, www veya wwwroot klasörleri ile index.html neden önemlidir?", cevap: "FTP (File Transfer Protocol), dosyaları bilgisayardan sunucuya aktarmaya yarar. htdocs, www ve wwwroot sitenin ziyaretçilere açık dosya klasörleridir. Sunucular bir site açılırken varsayılan ana sayfa olarak genellikle index.html dosyasını arar." },
  { id: 5, konu: "Temel kavramlar", soru: "WYSIWYG editör ile VS Code gibi kod editörlerinin temel farkı nedir?", cevap: "WYSIWYG editörde sayfa görsel olarak, çoğunlukla sürükle-bırak ile hazırlanır. VS Code gibi kod editörlerinde geliştirici HTML, CSS ve JavaScript'i doğrudan yazar; kod üzerinde daha ayrıntılı kontrol ve araç desteği elde eder." },
  { id: 6, konu: "Temel kavramlar", soru: ".gov, .edu, .k12, .com, .org ve .mil uzantıları genellikle kimler tarafından kullanılır?", cevap: ".gov: devlet kurumları. .edu: yükseköğretim kurumları. .k12: ilk ve ortaöğretim kurumları. .com: ticari kuruluşlar. .org: kuruluşlar ve organizasyonlar. .mil: askerî kurumlar." },
  { id: 7, konu: "Web tasarımı", soru: "Temel web tasarım ilkelerinden yedisini sayın.", cevap: "İçerik, tasarım/düzen (layout), biçimsellik, işlevsellik ve kullanılabilirlik, güncellik, uygunluk ve güvenilirlik, uyumluluk." },
  { id: 8, konu: "Web tasarımı", soru: "Kontrast ve tipografi okunabilirliği nasıl etkiler? Ekranlarda neden sans-serif yazı tipleri sık kullanılır?", cevap: "Kontrast, yazı ile arka plan arasındaki görünür farktır; yeterli kontrast metnin seçilmesini kolaylaştırır. Tipografi yazı tipi, boyutu ve satır düzenidir. Sans-serif yazı tipleri küçük ekranlarda sade ve okunaklı oldukları için sık tercih edilir." },
  { id: 9, konu: "Web tasarımı", soru: "SEO nedir ve bir web sitesi için neden önemlidir?", cevap: "SEO (Arama Motoru Optimizasyonu), sitenin arama sonuçlarında bulunmasını ve daha üst sıralarda görünmesini destekleyen çalışmalardır. Anlamlı HTML, doğru başlıklar, yararlı içerik ve hızlı yüklenme buna katkı sağlar." },
  { id: 10, konu: "Web tasarımı", soru: "Tarayıcı uyumluluğu ile duyarlı (responsive) tasarım arasındaki fark nedir?", cevap: "Tarayıcı uyumluluğu, sitenin Chrome, Firefox, Safari ve Edge gibi tarayıcılarda düzgün çalışmasıdır. Responsive tasarım ise düzenin telefon, tablet ve bilgisayar gibi farklı ekran boyutlarına uyum sağlamasıdır." },
  { id: 11, konu: "HTML5 ve Git", soru: "<!DOCTYPE html>, charset=UTF-8 ve viewport meta etiketlerinin görevleri nelerdir?", cevap: "<!DOCTYPE html> tarayıcıya belgenin HTML5 standardında olduğunu bildirir. charset=UTF-8 Türkçe karakterlerin doğru görünmesini sağlar. viewport, sayfa genişliğini cihaz ekranına uydurarak mobil görünümü destekler." },
  { id: 12, konu: "HTML5 ve Git", soru: "Anlamsal (semantic) HTML etiketi nedir? Her şeyi div ile yapmak yerine neden kullanılır?", cevap: "Anlamsal etiket, içeriğin görevini belirtir. Örneğin nav gezinme alanını, main ana içeriği anlatır. Bu yapı kodu daha anlaşılır kılar ve arama motorlarıyla ekran okuyucuların sayfayı yorumlamasına yardım eder." },
  { id: 13, konu: "HTML5 ve Git", soru: "header, nav, main, article, section, aside ve footer hangi alanları belirtir?", cevap: "header: sayfa/bölüm başlığı. nav: gezinme bağlantıları. main: ana içerik. article: bağımsız içerik. section: konu bölümü. aside: yan içerik veya duyuru. footer: alt bilgi, iletişim ve telif alanı." },
  { id: 14, konu: "HTML5 ve Git", soru: "h1-h6 başlık hiyerarşisinde uyulması gereken üç temel kural nedir?", cevap: "Sayfada ana başlık olarak bir h1 kullanın. Alt başlıklarda seviyeleri sıralı ilerletin; örneğin h1'den sonra doğrudan h4'e atlamayın. Yazı boyutunu değiştirmek için başlık etiketi seçmeyin; görünümü CSS ile ayarlayın." },
  { id: 15, konu: "HTML5 ve Git", soru: "b ile strong ve i ile em etiketleri arasındaki anlamsal fark nedir?", cevap: "b ve i metnin görünümünü sırasıyla kalın ve eğik yapar. strong içeriğin önemli olduğunu, em ise vurgulandığını anlamsal olarak belirtir; ekran okuyucular bu anlamı kullanabilir." },
  { id: 16, konu: "HTML5 ve Git", soru: "Git ve GitHub ne işe yarar? Commit ve Push ne anlama gelir?", cevap: "Git değişiklik geçmişini izleyen sürüm kontrol sistemidir; GitHub Git projelerini çevrimiçi saklama ve paylaşma hizmetidir. Commit değişiklikleri açıklama ile yerel geçmişe kaydeder. Push commit'leri uzak depoya gönderir." },
  { id: 17, konu: "CSS", soru: "CSS ekleme yöntemleri nelerdir? Çok sayfalı projelerde harici CSS neden tercih edilir?", cevap: "Yöntemler satır içi (inline), sayfa içi (internal) ve harici (external) CSS'tir. Harici style.css dosyası birden çok sayfada paylaşılır; tek yerde yapılan düzenleme tüm bağlı sayfalara uygulanır ve tekrar eden kodu azaltır." },
  { id: 18, konu: "CSS", soru: "Etiket, sınıf ve kimlik seçicileri nasıl yazılır? Öncelik sıraları nedir?", cevap: "Etiket seçici p, tüm p elemanlarını seçer. Sınıf seçici .kutu, aynı sınıfa sahip elemanları seçer. Kimlik seçici #logo, benzersiz bir elemanı seçer. Temel öncelik sırası #id > .class > etiket şeklindedir." },
  { id: 19, konu: "CSS", soru: "div > p çocuk seçicisi ile div p torun seçicisi arasındaki fark nedir?", cevap: "div > p yalnızca div'in doğrudan çocuğu olan p elemanlarını seçer. div p ise div'in içinde, kaç seviye derinde olursa olsun bulunan tüm p elemanlarını seçer." },
  { id: 20, konu: "CSS", soru: "CSS kutu modelinin dört katmanı nelerdir? margin ve padding farkı nedir?", cevap: "İçten dışa: content (içerik), padding (iç boşluk), border (kenarlık), margin (dış boşluk). Padding içerikle kenarlık arasını, margin ise kutunun dışındaki mesafeyi belirler." },
  { id: 21, konu: "CSS", soru: "position: relative, absolute ve fixed ne yapar? z-index ne için kullanılır?", cevap: "relative elemanı normal konumuna göre kaydırır ve absolute çocuklar için referans olabilir. absolute, konumlandırılmış en yakın atasına göre yerleşir. fixed, ekrana göre sabit kalır. z-index, üst üste gelen elemanların önde/arkada görünme sırasını belirler." },
  { id: 22, konu: "CSS", soru: "Flex düzeninde flex-wrap: wrap; neden kullanılır?", cevap: "flex-wrap: wrap, sığmayan öğelerin daralıp taşması yerine sonraki satıra geçmesini sağlar. Bu özellik özellikle küçük ekranlarda düzenin kullanılabilir kalmasına yardım eder." },
  { id: 23, konu: "JavaScript ve API", soru: "DOM nedir? innerHTML ile value özellikleri hangi amaçlarla kullanılır?", cevap: "DOM, JavaScript'in HTML belgesindeki elemanlara erişmesini ve onları değiştirmesini sağlayan belge modelidir. innerHTML bir elemanın içeriğini HTML olarak okur/yazar. value, input veya select gibi form alanlarının değerini okur/yazar." },
  { id: 24, konu: "JavaScript ve API", soru: "let sonuc1 = 50 + 20 ve let sonuc2 = '50' + 20 ifadeleri ne sonuç verir? Neden?", cevap: "sonuc1 değeri 70 olur; iki operand da sayıdır. sonuc2 değeri '5020' olur; tırnak içindeki 50 metindir ve + işleci metinleri birleştirir." },
  { id: 25, konu: "JavaScript ve API", soru: "if-else ve switch-case ne zaman kullanılır? switch içinde break unutulursa ne olur?", cevap: "İkisi de koşula göre farklı kod yolları çalıştırır. if-else karşılaştırma ve aralık koşullarında esnektir; switch bir değerin çok sayıda olası durumunu düzenli biçimde ele alır. break unutulursa sonraki case blokları da çalışabilir (fall-through)." },
  { id: 26, konu: "JavaScript ve API", soru: "setTimeout() ile setInterval() arasındaki fark nedir? setInterval nasıl durdurulur?", cevap: "setTimeout kodu belirtilen gecikmeden sonra bir kez çalıştırır. setInterval aynı kodu belirli aralıklarla tekrarlar. Durdurmak için interval kimliğine clearInterval(id) uygulanır." },
  { id: 27, konu: "JavaScript ve API", soru: "API ve JSON nedir? fetch kullanırken async/await neden kullanılır?", cevap: "API, yazılımların veri veya işlev paylaşmasını sağlayan arayüzdür. JSON, yaygın bir metin tabanlı veri biçimidir. fetch asenkron çalıştığı için async/await yanıt gelmesini beklemeyi ve sonucu sıralı biçimde işlemeyi kolaylaştırır." },
  { id: 28, konu: "JavaScript ve API", soru: "detay.html?id=45 biçimindeki veriye ne denir? JavaScript ile id nasıl okunur?", cevap: "Soru işaretinden sonraki kısım query string (URL parametreleri) olarak adlandırılır. Örnek: const params = new URLSearchParams(window.location.search); const id = params.get('id');" },
  { id: 29, konu: "Form, medya ve veri", soru: "video etiketindeki autoplay, muted ve loop özellikleri ne işe yarar? muted neden gerekir?", cevap: "autoplay videoyu otomatik başlatmayı, muted sesi kapatmayı, loop bitince yeniden başlatmayı sağlar. Tarayıcılar kullanıcı deneyimi için sesli otomatik oynatmayı çoğunlukla engellediğinden autoplay ile muted birlikte kullanılır." },
  { id: 30, konu: "Form, medya ve veri", soru: "table, thead, tbody, tr, th ve td etiketleri neyi belirtir? border-collapse ne yapar?", cevap: "table tabloyu, thead başlık bölümünü, tbody veri bölümünü, tr satırı, th başlık hücresini, td normal hücreyi belirtir. border-collapse: collapse; komşu hücre kenarlıklarını tek çizgide birleştirir." },
  { id: 31, konu: "Form, medya ve veri", soru: "GET ile POST arasındaki üç temel fark nedir?", cevap: "GET verileri URL parametrelerinde taşır; URL'de görünebilir, uzunluğu sınırlıdır ve hassas bilgi için uygun değildir. POST verileri istek gövdesinde taşır ve daha büyük veri/dosya göndermeye uygundur. POST tek başına şifreleme sağlamaz; gizlilik ve güvenlik için HTTPS gerekir." },
  { id: 32, konu: "Form, medya ve veri", soru: "required ve pattern='[0-9]{4}' ne sağlar? Form gönderiminde event.preventDefault() neden kullanılır?", cevap: "required alanı zorunlu yapar. pattern='[0-9]{4}' tam dört rakam girilmesini ister. event.preventDefault(), tarayıcının varsayılan form gönderimini durdurup sonucu JavaScript ile işlemeyi sağlar." },
  { id: 33, konu: "Form, medya ve veri", soru: "localStorage, JSON.stringify() ve JSON.parse() ne işe yarar?", cevap: "localStorage değerleri tarayıcıda kalıcı olarak saklar ve değerleri metin biçiminde tutar. JSON.stringify() dizi/nesneyi metne dönüştürür; JSON.parse() bu metni tekrar JavaScript verisine çevirir." },
  { id: 34, konu: "Bootstrap ve jQuery", soru: "Bootstrap Grid kaç sütunludur? col-12 col-md-6 col-lg-3 sınıfları kaç kart gösterir?", cevap: "Bootstrap satırı 12 sütuna böler. col-12 telefonda satıra 1 kart, col-md-6 orta genişlikte 2 kart, col-lg-3 geniş ekranda 4 kart yerleştirir." },
  { id: 35, konu: "Bootstrap ve jQuery", soru: "jQuery ready, slideToggle(400), fadeOut(500), empty() ve append() ne yapar?", cevap: "$(document).ready() DOM hazır olduğunda kodu çalıştırır. slideToggle(400) elemanı 400 ms'de açıp kapatır. fadeOut(500) 500 ms'de soldurarak gizler. empty() içeriği temizler. append(...) sona yeni içerik ekler." },
  { id: 36, konu: "Kodlama soruları", soru: "HTML5 iskeleti oluşturup body içine header, nav, main, article ve footer yerleştirin.", cevap: `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Benim Web Sayfam</title>
</head>
<body>
  <header>Üst başlık alanı</header>
  <nav>Menü bağlantıları</nav>
  <main><article>Makale içeriği</article></main>
  <footer>Alt bilgi alanı</footer>
</body>
</html>` },
  { id: 37, konu: "Kodlama soruları", soru: ".bilgi-kutusu sınıfını mavi zemin, sarı yazı, 15px padding, 25px margin yapın; hover durumunda zemini yeşil olsun.", cevap: `.bilgi-kutusu {
  background-color: blue;
  color: yellow;
  padding: 15px;
  margin: 25px;
}
.bilgi-kutusu:hover {
  background-color: green;
}` },
  { id: 38, konu: "Kodlama soruları", soru: "Aşağıdaki örnekteki beş HTML/CSS hatasını bulun: h1'den sonra h5 kullanılması, img kapatma etiketi, aynı id'nin tekrarı, .ozelYazi seçicisi ve color satırında noktalı virgülün unutulması.", cevap: `1. Başlık seviyesi atlanmış: h1'den sonra h2 kullanılmalı.
2. img kapanış etiketi almaz; açıklayıcı alt niteliği eklenmeli: <img src="logo.png" alt="Logo">
3. id sayfada benzersiz olmalı; ikinci elemana farklı id veya ortak class verilmeli.
4. HTML'de id kullanıldığı için CSS seçicisi .ozelYazi değil #ozelYazi olmalı.
5. color: red; satırında noktalı virgül eksik.` },
  { id: 39, konu: "Kodlama soruları", soru: "Bootstrap'te karanlık, çizgili ve hover vurgulu tablo; sarı ve kırmızı buton için hangi sınıflar kullanılır?", cevap: `Tablo: class="table table-dark table-striped table-hover"
Sarı buton: class="btn btn-warning"
Kırmızı buton: class="btn btn-danger"` },
  { id: 40, konu: "Kodlama soruları", soru: "notKutusu input değerini okuyup 50 ve üzerindeyse 'Dersi Geçtiniz', küçükse 'Dersten Kaldınız' yazan if-else kodunu yazın.", cevap: `const girilenNot = Number(document.getElementById("notKutusu").value);
if (girilenNot >= 50) {
  document.getElementById("ekran").textContent = "Dersi Geçtiniz";
} else {
  document.getElementById("ekran").textContent = "Dersten Kaldınız";
}` },
  { id: 41, konu: "Kodlama soruları", soru: "gosterBtn tıklanınca detayPaneli elemanını 400 ms'de açıp kapatan jQuery kodunu yazın.", cevap: `$(document).ready(function () {
  $("#gosterBtn").click(function () {
    $("#detayPaneli").slideToggle(400);
  });
});` },
  { id: 42, konu: "Bağlantı ve formlar", soru: "target='_blank', target='_self', href='#bolum' ve mailto: bağlantıları ne yapar?", cevap: "_blank bağlantıyı yeni sekmede, _self aynı sekmede açar. href='#bolum' sayfa içindeki id='bolum' elemanına gider. mailto: e-posta uygulamasında yeni ileti oluşturur." },
  { id: 43, konu: "Bağlantı ve formlar", soru: "fieldset, legend, optgroup ve datalist etiketleri hangi amaçlarla kullanılır?", cevap: "fieldset ilişkili form alanlarını bir grup içinde toplar; legend bu gruba başlık verir. optgroup select seçeneklerini kategorilere ayırır. datalist, input alanı için yazarken önerilen seçenekleri sunar." },
  { id: 44, konu: "Bağlantı ve formlar", soru: "<meter> ile <progress> arasındaki fark nedir?", cevap: "meter bilinen bir aralıktaki ölçümü gösterir; örneğin bütçe seviyesi veya disk doluluğu. progress bir işin tamamlanma oranını gösterir; örneğin yüklemenin yüzde kaçının bittiği." },
  { id: 45, konu: "Bağlantı ve formlar", soru: "HTML formunda required, pattern, range, color ve date alanları ne sağlar?", cevap: "required alanı zorunlu kılar. pattern girilen metni bir biçim kuralına göre doğrular. range aralık seçtirir; color renk seçici açar; date tarih seçtirir. Form doğrulaması kullanıcı girdisinin beklenen biçime uymasına yardım eder." },
  { id: 46, konu: "İleri CSS", soru: ":hover, :focus ve :active sözde sınıfları hangi durumları hedefler?", cevap: ":hover fare öğenin üzerindeyken, :focus öğe klavye odağındayken veya seçiliyken, :active ise öğeye basıldığı sırada uygulanır." },
  { id: 47, konu: "İleri CSS", soru: "::before, ::after, ::first-letter ve ::selection sözde elemanları ne için kullanılır?", cevap: "Bir elemanın önüne veya sonuna CSS içeriği ekleyebilir, ilk harfini biçimlendirebilir ya da kullanıcı tarafından seçilen metne stil verebilirler. Sözde elemanlar çift iki nokta ile yazılır." },
  { id: 48, konu: "İleri CSS", soru: "CSS kutu modeli hangi katmanlardan oluşur?", cevap: "İçten dışa content (içerik), padding (iç boşluk), border (kenarlık) ve margin (dış boşluk) katmanları gelir. padding içerikle kenarlık arasını; margin ise kutunun dışındaki mesafeyi belirler." },
  { id: 49, konu: "İleri CSS", soru: "relative, absolute, fixed, z-index ve inline-block ne işe yarar?", cevap: "relative elemanı normal konumuna göre kaydırır ve absolute çocuklar için referans olabilir. absolute en yakın konumlandırılmış ataya göre, fixed ekrana göre yerleşir. z-index üst üste gelen öğelerin sırasını belirler. inline-block satır içinde dururken genişlik ve yükseklik alabilir." }
];

const haftaNotlari = [
  {
    hafta: 1,
    baslik: "Dijital kimlik ve web'in temelleri",
    proje: "Dijital Kimlik Kartı",
    notlar: [
      "IP Adresi (Internet Protocol Address): İnternete bağlı her cihazı (bilgisayar, sunucu, telefon vb.) tanımlayan, noktalama işaretleriyle ayrılmış benzersiz sayısal etikettir.",
      "DNS (Domain Name System): İnsanların okuyabildiği alan adlarını (google.com gibi), bilgisayarların anladığı IP adreslerine çeviren internetin telefon rehberidir.",
      "Sunucu (Server): Web sitelerini, dosyaları veya uygulamaları barındıran ve internet üzerinden gelen isteklere yanıt veren, sürekli çalışan güçlü bilgisayardır.",
      "HTTP (Hypertext Transfer Protocol): Web tarayıcısı ile sunucu arasında web sayfası verilerinin nasıl aktarılacağını belirleyen temel iletişim kuralıdır.",
      "HTTPS (Hypertext Transfer Protocol Secure): Tarayıcı ile sunucu arasındaki veri iletişimini şifreleyerek güvenli hale getiren HTTP sürümüdür.",
      "Domain (Alan Adı): Bir web sitesinin karmaşık IP adresi yerine kullanılan, akılda kalıcı ve kolay yazılabilen ismidir (örneğin google.com).",
      "URL (Uniform Resource Locator): Belirli bir sayfa, resim veya dosya gibi web kaynağının internetteki tam adresini gösteren metin dizesidir.",
      "WWW (World Wide Web): İnternet üzerinde barındırılan ve URL'lerle erişilebilen, birbirine bağlı web sayfaları ve içeriklerden oluşan küresel sistemdir.",
      "Hosting (Barındırma): Web sitesinin tüm dosya ve verilerinin internet üzerinden 7/24 erişilebilmesi için bir sunucuda saklanması hizmetidir.",
      "FTP (File Transfer Protocol): Bilgisayar ile sunucu arasında dosya yüklemek veya indirmek için kullanılan standart ağ protokolüdür.",
      "HTML (Hypertext Markup Language): Başlık, paragraf ve resimler gibi bir web sayfasının temel içeriğini ve yapısını oluşturan işaretleme dilidir.",
      "Etiket (Tag): HTML'de bir elementi tanımlamak için küçüktür ve büyüktür işaretleri (< >) arasına yazılan komuttur; örneğin paragraf için <p> kullanılır.",
      "CSS (Cascading Style Sheets): HTML sayfasının renk, yazı tipi ve yerleşim gibi görsel stilini belirleyen dildir.",
      "JavaScript (JS): Web sayfalarına buton, animasyon ve form kontrolü gibi etkileşimli özellikler ve dinamizm katan programlama dilidir.",
      "Front-end (Ön Yüz): Kullanıcının tarayıcıda gördüğü ve etkileşimde bulunduğu arayüzü geliştiren alandır.",
      "Back-end (Arka Yüz): Veritabanı, sunucu işlemleri ve iş mantığı gibi kullanıcı tarafından görülmeyen sistemleri geliştiren alandır.",
      "Full-stack (Tam Yığın): Bir web projesinin hem front-end hem de back-end geliştirmesini yapabilen uzmanlık alanıdır.",
      "Tarayıcı (Browser): Chrome ve Firefox gibi web sayfalarını görüntülememizi ve onlarla etkileşim kurmamızı sağlayan yazılımdır.",
      "Kod editörü: Geliştiricilerin HTML ve CSS gibi kodları yazıp düzenlediği programdır; Visual Studio Code buna örnektir.",
      "WYSIWYG editör: Kod yazmadan, çoğunlukla sürükle-bırak araçlarıyla sayfa oluşturur; adı Ne Görürsen Onu Alırsın anlamına gelir.",
      "Yaygın alan adı uzantıları: .gov devlet kurumları, .edu eğitim kurumları, .k12 temel eğitim ve ortaöğretim, .org ticari olmayan kuruluşlar, .com ticari kuruluşlar, .mil askerî kurumlar, .net ağ servisleri, .ac akademik kurumlar, .int uluslararası kuruluşlar, .info bilgi siteleri ve .biz işletmeler için kullanılır."
    ]
  },
  {
    hafta: 2,
    baslik: "Web tasarımının 7 ilkesi",
    proje: "Benim Şehrim tanıtım sayfası",
    notlar: [
      "İçerik: Sitenin kalbidir. Yazı, resim ve videolar özgün, doğru ve hedef kitleye uygun olmalıdır.",
      "Tasarım (Layout): Logo, menü ve içeriklerin ekranda nereye ve hangi düzende yerleşeceğinin planlanmasıdır.",
      "Biçimsellik: Renk uyumu, kontrast (zıtlık) ve okunabilir yazı tiplerinin (tipografi) kullanılmasıdır.",
      "İşlevsellik ve Kullanılabilirlik: Site hızlı yüklenmeli, menüler ve butonlar çalışmalı, gezinmek kolay olmalıdır.",
      "Güncellik: Haber, duyuru ve tarihler eski olmamalı; site HTML5 ve CSS3 gibi güncel teknolojilerle hazırlanmalıdır.",
      "Uygunluk ve Güvenilirlik: İletişim bilgileri bulunmalı, bağlantılar çalışmalı ve dil bilgisi hataları olmamalıdır.",
      "Uyumluluk: Site farklı tarayıcılarda ve mobil, tablet, bilgisayar gibi cihazlarda bozulmadan çalışmalıdır. Bu, responsive tasarımı ve viewport meta etiketini kapsar."
    ]
  },
  {
    hafta: 3,
    baslik: "HTML5 ve anlamsal web",
    proje: "Geleceğin Teknolojileri blogu",
    notlar: [
      "<!DOCTYPE html>: Tarayıcıya belgenin HTML5 standartlarını kullandığını bildirir.",
      "<meta name=viewport>: Sitenin telefon ve tablette ekrana uyumlu (responsive) çalışmasını sağlar.",
      "Başlık hiyerarşisi: Sayfada tek bir ana h1 kullanılır; başlık sıraları atlanmaz (h2'den sonra h3 gelir). Başlıklar içeriğin yapısını belirtir; yazı boyutu CSS ile ayarlanır.",
      "<header>: Sayfanın veya bölümün başlık ve logo alanıdır.",
      "<nav>: Menü ve gezinme bağlantılarının bulunduğu alandır.",
      "<main>: Sayfanın ana içeriğini belirtir.",
      "<article>: Kendi başına anlamlı ve bağımsız makale veya haber içeriğidir.",
      "<section>: Sayfa içeriğindeki konuya ait alt bölümdür.",
      "<aside>: Ana içeriğin yanında yer alan ek bilgi veya kenar çubuğudur.",
      "<footer>: Sayfanın veya bölümün altındaki iletişim ve telif alanıdır.",
      "<strong>: Metni kalın gösterir ve içeriğin önemli olduğunu anlamsal olarak belirtir.",
      "<em>: Metni eğik gösterir ve vurgulanması gerektiğini anlamsal olarak belirtir.",
      "<!-- Yorum -->: Tarayıcıda görünmeyen, kodu yazan kişiye yönelik nottur.",
      "Semantic (Anlamsal) Web: Etiketlerin yalnızca görünümü değil, içeriğin anlamını (başlık, menü, makale gibi) tarayıcıya ve arama motoruna bildirmesidir.",
      "main { display: flex; }: İçindeki section ve aside gibi kutuları alt alta değil yan yana hizalayabilir.",
      "SFTP remotePath: Dosyaların sunucudaki proje klasörüne yükleneceği yolu belirtir; örneğin /htdocs/hafta3 ayrı bir klasördür ve diğer projelerin üzerine yazmayı önler."
    ]
  },
  {
    hafta: 4,
    baslik: "CSS seçicileri ve görsel düzen",
    proje: "CosmicTours",
    notlar: [
      "Etiket seçici (body, h1): HTML etiketinin adıyla yazılır ve sayfadaki o etiketlerin tümünü seçer.",
      "Kimlik (ID) seçici (#logo): id=logo olan elemanı seçer. Bir ID sayfada yalnızca bir kez kullanılır ve CSS'te başına # konur.",
      "Sınıf (Class) seçici (.gezegen-karti): Bu sınıfa sahip elemanları seçer. Bir sınıf birden fazla elemanda kullanılabilir ve CSS'te başına nokta konur.",
      "Torun seçici (.gezegen-karti img): Arada boşluk kullanır ve sınıfın içindeki img gibi eşleşen elemanları, iç içe kaç seviye olursa olsun seçer.",
      "Sözde sınıf (:hover): Kullanıcı fareyle elemanın üzerine geldiğinde uygulanacak stili belirler.",
      "Sözde eleman (::first-letter, ::selection): İlk harf veya fareyle seçilen metin gibi bir elemanın belirli parçasını hedefler; çift iki nokta ile yazılır."
    ]
  },
  {
    hafta: 5,
    baslik: "JavaScript, DOM ve API",
    proje: "Uzay Gemisi kontrol paneli · Sine-Evren",
    notlar: [
      "JavaScript: Web sayfalarına mantık, karar verme yeteneği ve kullanıcıyla etkileşim katan programlama dilidir.",
      "DOM (Document Object Model): JavaScript'in HTML etiketlerine müdahale etmesini sağlayan ağaç yapısıdır. document.getElementById('Kutu') gibi bir komut, ID'si Kutu olan öğeyi bulur.",
      "var / let (Değişkenler): Bilgisayarın geçici hafızasında sayı veya metin gibi verileri saklayan adlandırılmış alanlardır.",
      "if / else: Koşula göre karar verir; şart doğruysa if, yanlışsa else içindeki kod çalışır.",
      "switch - case: Bir değişkenin çok sayıda olası durumunu düzenli biçimde ele alır. Bir durumdan çıkmak için break kullanılır.",
      "return: Fonksiyonun işini bitirirken çağrıldığı yere bir değer geri döndürmesini sağlar.",
      "API (Uygulama Geliştirme Arayüzü): İki yazılımın birbiriyle konuşmasını ve veri alışverişi yapmasını sağlayan köprüdür.",
      "JSON (JavaScript Object Notation): API'lerden gelen verilerin yazıldığı, anlaşılması kolay ve hafif metin biçimidir.",
      "fetch(): JavaScript'te bir URL'den internet verisi istemek ve çekmek için kullanılan metottur.",
      "async / await: Zaman alan asenkron işlemlerin tamamlanmasını bekleyip kodu daha sıralı biçimde yazmayı sağlar.",
      "Template Literals (backtick): Ters tırnakla (``) yazılır; metne ${degisken} biçiminde JavaScript değeri eklemeyi sağlar.",
      "URL Parameters (Query Strings): Sayfalar arasında adres çubuğuyla veri taşır, soru işaretiyle başlar; örnek: detay.html?id=50.",
      "URLSearchParams: JavaScript'in adres çubuğundaki parametreleri okumasını sağlar.",
      "Dinamik sayfa: İçeriği URL'den gelen ID'ye göre API'den alır ve sayfayı bu verilerle oluşturur.",
      "<iframe>: YouTube veya Google Maps gibi başka bir sayfayı mevcut web sayfasının içine gömmeye yarayan HTML etiketidir."
    ]
  },
  {
    hafta: 6,
    baslik: "Medya, formlar, tablolar ve localStorage",
    proje: "CyberArena · TechStore",
    notlar: [
      "<video> ve <audio>: Web sayfasında video ve ses dosyalarını oynatmak için kullanılan HTML5 medya etiketleridir.",
      "Form ve doğrulama: <form> ve <input> kullanıcıdan veri alır. required alanı zorunlu kılar; pattern girilen metnin belirli biçime uymasını ister.",
      "Tablo: <table> tabloyu, <thead> başlık bölümünü, <tbody> veri bölümünü, <tr> satırı, <th> başlık hücresini, <td> veri hücresini belirtir.",
      "event.preventDefault(): Tarayıcının varsayılan form gönderimini durdurur; JavaScript'in girilen veriyi işlemesine imkân verir.",
      "localStorage: Verileri tarayıcıda saklar ve sayfa yenilense de tutar. JSON.stringify nesneyi metne, JSON.parse metni tekrar JavaScript verisine çevirir."
    ]
  },
  {
    hafta: 7,
    baslik: "Bootstrap ve jQuery",
    proje: "SiberGaraj araç kiralama otomasyonu",
    notlar: [
      "Bootstrap Grid: 12 sütunlu satır yapısıdır. col-12 küçük ekranda bir, col-md-6 orta ekranda iki, col-lg-3 geniş ekranda dört kartı yan yana yerleştirebilir.",
      "Bootstrap bileşenleri: Navbar gezinme menüsü; carousel kayan görsel; card içerik kartı; modal açılır pencere; collapse açılıp kapanan alan; table tablo; alert bildirim; badge kısa etikettir.",
      "Font Awesome: Hazır sınıflarıyla arayüze vektörel ikon ekleyen kütüphanedir.",
      "jQuery ready: HTML belgesi hazır olduğunda kodu çalıştırır.",
      "slideToggle: Bir alanı kayarak açar veya kapatır. fadeOut: Bir alanı soldurarak gizler."
    ]
  },
  {
    hafta: 8,
    baslik: "Bağlantılar ve gelişmiş HTML5 formları",
    proje: "SiberFest teknoloji yarışması",
    notlar: [
      "<a> ve target: target=_blank bağlantıyı yeni sekmede, target=_self aynı sekmede açar. href=#id sayfa içi çıpa kurar; mailto: e-posta bağlantısı açar.",
      "<fieldset> ve <legend>: Form elemanlarını mantıksal bir grupta çerçeveler; legend bu çerçevenin başlığını oluşturur.",
      "<optgroup> ve <datalist>: optgroup select seçeneklerini kategorilere ayırır. datalist bir input alanına otomatik tamamlama önerileri bağlar.",
      "<meter> ve <progress>: meter bilinen aralıktaki skaler ölçümü (ör. bütçe riski) gösterir; progress bir işlemin tamamlanma oranını (ör. yüzde 50 yüklendi) gösterir."
    ]
  },
  {
    hafta: 9,
    baslik: "CSS seçicileri, kutu modeli ve konumlandırma",
    proje: "AeroSiber uçuş rezervasyon portalı",
    notlar: [
      "Sözde sınıflar (:hover, :focus, :active): hover fareyle üzerine gelindiğinde, active fareyle basılı tutulduğunda, focus ise bir input odaklanıp veri girildiğinde uygulanacak stili belirler.",
      "Sözde elemanlar (::first-letter, ::before, ::after, ::selection): Elemanın ilk harfini, öncesini, sonrasını veya fareyle seçilen metni biçimlendirir.",
      "Çocuk seçicisi (>): Yalnızca seçilen öğenin doğrudan çocuklarını hedefler. Torun seçicisi (boşluk): İç içe kaç seviye olursa olsun eşleşen öğeleri hedefler.",
      "Kutu modeli: Her HTML elemanı bir kutudur. İçten dışa content (içerik), padding (iç boşluk), border (kenarlık) ve margin (dış boşluk) katmanlarından oluşur.",
      "position: relative öğeyi normal konumuna göre kaydırır ve içindeki absolute öğelere referans olur. absolute en yakın konumlandırılmış atasına göre yerleşir.",
      "position: fixed öğeyi ekrana sabitler; sayfa kaysa da hareket etmez. z-index üst üste gelen öğelerden hangisinin önde duracağını belirler.",
      "display: inline-block öğeyi satır içinde tutarken kutu gibi genişlik, yükseklik ve boşluk değerleri almasına izin verir."
    ]
  }
];

let bilinenSorular = ilerlemeyiOku();
let turSorulari = [];
let turIndeksi = 0;
let turDegerlendirmeleri = new Map();

const el = id => document.getElementById(id);

function ilerlemeyiOku() {
  try {
    const kayit = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]");
    return new Set(Array.isArray(kayit) ? kayit.map(Number).filter(Number.isFinite) : []);
  } catch {
    return new Set();
  }
}

function ilerlemeyiKaydet() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify([...bilinenSorular]));
  ilerlemeyiGoster();
}

function ilerlemeyiGoster() {
  el("bilinenSayi").textContent = bilinenSorular.size;
  el("ilerlemeMetni").textContent = `${bilinenSorular.size} / ${soruBankasi.length} soru öğrenildi.`;
}

function konulariHazirla() {
  const konular = [...new Set(soruBankasi.map(soru => soru.konu))];
  konular.forEach(konu => {
    const secenek = document.createElement("option");
    secenek.value = konu;
    secenek.textContent = konu;
    el("konuFiltresi").append(secenek);
  });
}

function filtrelenmisSorular() {
  const arama = el("aramaKutusu").value.trim().toLocaleLowerCase("tr-TR");
  const seciliKonu = el("konuFiltresi").value;
  return soruBankasi.filter(soru => {
    const konuUygun = seciliKonu === "all" || soru.konu === seciliKonu;
    const metin = `${soru.soru} ${soru.cevap} ${soru.konu}`.toLocaleLowerCase("tr-TR");
    return konuUygun && (!arama || metin.includes(arama));
  });
}

function soruKartiniOlustur(soru) {
  const kart = document.createElement("article");
  kart.className = "question-card";

  const ustSatir = document.createElement("div");
  ustSatir.className = "question-topline";
  const konu = document.createElement("span");
  konu.className = "topic-pill";
  konu.textContent = soru.konu;
  const numara = document.createElement("span");
  numara.className = "question-number";
  numara.textContent = `#${String(soru.id).padStart(2, "0")}`;
  ustSatir.append(konu, numara);

  const baslik = document.createElement("h3");
  baslik.textContent = soru.soru;
  const eylemler = document.createElement("div");
  eylemler.className = "question-actions";

  const cevapDugmesi = document.createElement("button");
  cevapDugmesi.className = "answer-toggle";
  cevapDugmesi.type = "button";
  cevapDugmesi.textContent = "Cevabı göster";
  cevapDugmesi.setAttribute("aria-expanded", "false");

  const bilinenDugmesi = document.createElement("button");
  bilinenDugmesi.className = `mark-known${bilinenSorular.has(soru.id) ? " is-known" : ""}`;
  bilinenDugmesi.type = "button";
  bilinenDugmesi.textContent = bilinenSorular.has(soru.id) ? "✓ Öğrendim" : "+ Öğrendim";
  bilinenDugmesi.setAttribute("aria-pressed", String(bilinenSorular.has(soru.id)));

  const cevap = document.createElement("div");
  cevap.className = "answer-panel";
  cevap.hidden = true;
  cevap.textContent = soru.cevap;

  cevapDugmesi.addEventListener("click", () => {
    cevap.hidden = !cevap.hidden;
    cevapDugmesi.textContent = cevap.hidden ? "Cevabı göster" : "Cevabı gizle";
    cevapDugmesi.setAttribute("aria-expanded", String(!cevap.hidden));
  });
  bilinenDugmesi.addEventListener("click", () => {
    if (bilinenSorular.has(soru.id)) bilinenSorular.delete(soru.id);
    else bilinenSorular.add(soru.id);
    ilerlemeyiKaydet();
    renderSorular();
  });

  eylemler.append(cevapDugmesi, bilinenDugmesi);
  kart.append(ustSatir, baslik, eylemler, cevap);
  return kart;
}

function renderSorular() {
  const sorular = filtrelenmisSorular();
  const liste = el("soruListesi");
  liste.replaceChildren(...sorular.map(soruKartiniOlustur));
  el("sonucSayisi").textContent = `${sorular.length} / ${soruBankasi.length} soru gösteriliyor`;
  el("bosSonuc").hidden = sorular.length > 0;
}

function notMetniniOlustur(not) {
  return [`${not.hafta}. Hafta — ${not.baslik}`, `Proje: ${not.proje}`, "", ...not.notlar.map(madde => `• ${madde}`)].join("\n");
}

async function notuKopyala(metin, dugme) {
  const eskiMetin = dugme.textContent;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(metin);
    } else {
      const alan = document.createElement("textarea");
      alan.value = metin;
      alan.setAttribute("readonly", "");
      alan.style.position = "fixed";
      alan.style.opacity = "0";
      document.body.append(alan);
      alan.select();
      const kopyalandi = document.execCommand("copy");
      alan.remove();
      if (!kopyalandi) throw new Error("Kopyalama kullanılamıyor.");
    }
    dugme.textContent = "✓ Kopyalandı";
  } catch {
    dugme.textContent = "Kopyalanamadı";
  }
  window.setTimeout(() => { dugme.textContent = eskiMetin; }, 1800);
}

function haftaNotuKartiOlustur(not) {
  const kart = document.createElement("details");
  kart.className = "note-card";

  const ozet = document.createElement("summary");
  const numara = document.createElement("span");
  numara.className = "week-number";
  numara.textContent = String(not.hafta).padStart(2, "0");
  const baslikAlani = document.createElement("span");
  const baslik = document.createElement("span");
  baslik.className = "note-heading";
  baslik.textContent = not.baslik;
  const proje = document.createElement("span");
  proje.className = "note-project";
  proje.textContent = `${not.notlar.length} madde · ${not.proje}`;
  baslikAlani.append(baslik, proje);
  const isaret = document.createElement("span");
  isaret.className = "note-chevron";
  isaret.setAttribute("aria-hidden", "true");
  isaret.textContent = "+";
  ozet.append(numara, baslikAlani, isaret);

  const govde = document.createElement("div");
  govde.className = "note-body";
  const maddeler = document.createElement("ul");
  not.notlar.forEach(madde => {
    const oge = document.createElement("li");
    oge.textContent = madde;
    maddeler.append(oge);
  });
  const kopyala = document.createElement("button");
  kopyala.className = "note-copy";
  kopyala.type = "button";
  kopyala.textContent = "Tüm notları kopyala";
  kopyala.setAttribute("aria-label", `${not.hafta}. haftanın tüm yazma notlarını kopyala`);
  kopyala.addEventListener("click", () => notuKopyala(notMetniniOlustur(not), kopyala));
  govde.append(maddeler, kopyala);
  kart.append(ozet, govde);
  return kart;
}

function renderNotlar() {
  el("haftaNotlari").replaceChildren(...haftaNotlari.map(haftaNotuKartiOlustur));
}

function karistir(dizi) {
  const sonuc = [...dizi];
  for (let i = sonuc.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [sonuc[i], sonuc[j]] = [sonuc[j], sonuc[i]];
  }
  return sonuc;
}

function turuBaslat() {
  const uygunSorular = filtrelenmisSorular();
  if (uygunSorular.length === 0) return;
  turSorulari = karistir(uygunSorular).slice(0, 10);
  turIndeksi = 0;
  turDegerlendirmeleri = new Map();
  el("soruBankasi").hidden = true;
  el("calismaTuru").hidden = false;
  el("turSonucu").hidden = true;
  el("flashcard").hidden = false;
  el("degerlendirme").hidden = false;
  el("oncekiSoru").hidden = false;
  el("sonrakiSoru").hidden = false;
  renderTurSorusu();
}

function renderTurSorusu() {
  const soru = turSorulari[turIndeksi];
  if (!soru) return;
  el("turSayaci").textContent = `Soru ${turIndeksi + 1} / ${turSorulari.length}`;
  el("flashKonu").textContent = soru.konu;
  el("flashNumara").textContent = `#${String(soru.id).padStart(2, "0")}`;
  el("flashSoru").textContent = soru.soru;
  el("flashCevap").textContent = soru.cevap;
  el("flashCevap").hidden = true;
  el("cevabiGoster").hidden = false;
  el("cevabiGoster").textContent = "Cevabı göster";
  el("degerlendirme").hidden = true;
  el("oncekiSoru").disabled = turIndeksi === 0;
  el("sonrakiSoru").textContent = turIndeksi === turSorulari.length - 1 ? "Turu bitir →" : "Sonraki →";
}

function cevabiAc() {
  el("flashCevap").hidden = false;
  el("cevabiGoster").hidden = true;
  el("degerlendirme").hidden = false;
}

function soruyuDegerlendir(bildi) {
  const soru = turSorulari[turIndeksi];
  if (!soru) return;
  turDegerlendirmeleri.set(soru.id, bildi);
  if (bildi) bilinenSorular.add(soru.id);
  else bilinenSorular.delete(soru.id);
  ilerlemeyiKaydet();
  sonrakiTuraGec();
}

function sonrakiTuraGec() {
  if (turIndeksi >= turSorulari.length - 1) {
    turuBitir();
    return;
  }
  turIndeksi += 1;
  renderTurSorusu();
}

function oncekiTuraDon() {
  if (turIndeksi <= 0) return;
  turIndeksi -= 1;
  renderTurSorusu();
  if (turDegerlendirmeleri.has(turSorulari[turIndeksi].id)) {
    el("flashCevap").hidden = false;
    el("cevabiGoster").hidden = true;
    el("degerlendirme").hidden = false;
  }
}

function turuBitir() {
  const bilinen = [...turDegerlendirmeleri.values()].filter(Boolean).length;
  const tekrar = [...turDegerlendirmeleri.values()].filter(deger => !deger).length;
  const bos = turSorulari.length - turDegerlendirmeleri.size;
  el("flashcard").hidden = true;
  el("degerlendirme").hidden = true;
  el("oncekiSoru").hidden = true;
  el("sonrakiSoru").hidden = true;
  const sonuc = el("turSonucu");
  sonuc.replaceChildren();
  const baslik = document.createElement("h2");
  baslik.textContent = "Tur tamamlandı";
  const ozet = document.createElement("p");
  ozet.textContent = `${bilinen} soruyu biliyorum, ${tekrar} soruyu tekrar edeceğim olarak işaretledin${bos ? `; ${bos} soruyu değerlendirmeden geçtin` : ""}.`;
  const tekrarDugmesi = document.createElement("button");
  tekrarDugmesi.className = "primary-button";
  tekrarDugmesi.type = "button";
  tekrarDugmesi.textContent = "Yeni tur başlat";
  tekrarDugmesi.addEventListener("click", turuBaslat);
  sonuc.append(baslik, ozet, tekrarDugmesi);
  sonuc.hidden = false;
}

function bankayaDon() {
  el("calismaTuru").hidden = true;
  el("soruBankasi").hidden = false;
  el("flashcard").hidden = false;
  renderSorular();
}

function ilerlemeyiTemizle() {
  if (!window.confirm("Öğrendim işaretlerini sıfırlamak istiyor musunuz?")) return;
  bilinenSorular.clear();
  localStorage.removeItem(PROGRESS_KEY);
  ilerlemeyiGoster();
  renderSorular();
}

document.addEventListener("DOMContentLoaded", () => {
  renderNotlar();
  konulariHazirla();
  ilerlemeyiGoster();
  renderSorular();
  el("aramaKutusu").addEventListener("input", renderSorular);
  el("konuFiltresi").addEventListener("change", renderSorular);
  el("turBaslat").addEventListener("click", turuBaslat);
  el("ilerlemeyiSifirla").addEventListener("click", ilerlemeyiTemizle);
  el("bankayaDon").addEventListener("click", bankayaDon);
  el("cevabiGoster").addEventListener("click", cevabiAc);
  el("tekrarEt").addEventListener("click", () => soruyuDegerlendir(false));
  el("ogrendim").addEventListener("click", () => soruyuDegerlendir(true));
  el("oncekiSoru").addEventListener("click", oncekiTuraDon);
  el("sonrakiSoru").addEventListener("click", sonrakiTuraGec);
});
