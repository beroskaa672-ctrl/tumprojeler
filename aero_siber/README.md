# AeroSiber

11. sınıf Web Tabanlı Uygulama Geliştirme dersi 9. hafta için hazırlanmış uçuş rezervasyonu örneği.

## Sayfalar

- `index.html`: bağlantı türleri, sabit hızlı erişim, çıpa bağlantıları, API'den mürettebat ve kutu modeli.
- `rezervasyon.html`: HTML5 form türleri, doğrulama parametreleri, `datalist`, `optgroup` ve URL sorgu parametreleri.
- `biletlerim.html`: `localStorage` kayıtları, biniş kartı, `meter` ve `progress` göstergeleri.
- `style.css`: sözde sınıflar/elemanlar, çocuk-torun seçicileri, kutu modeli ve konumlandırma örnekleri.
- `app.js`: örnek mürettebat API'si, form yakalama, tarayıcıda bilet kaydetme ve kartları çizme.
- `bilet-banner.svg`: rezervasyon formuna giden resim bağlantısında kullanılan yerel çizim.
- `sftp-config.example.json`: kendi sunucu adresin ve kullanıcı bilgilerinle yerel SFTP ayarına uyarlayacağın örnek.

## Görevleri kodda bulma

VS Code'da ilgili dosyayı açıp **Ctrl+F** ile aşağıdaki etiketi ara. Her etiketin hemen yanında değiştirilecek değer ve deneme adımı açıklanır.

| Etiket | Dosya | Konu |
|---|---|---|
| `/görev1` | `index.html` | `mailto:` bağlantısında konu başlığı |
| `/görev2` | `style.css` | `:active` durumunda bağlantı rengi |
| `/görev3` | `style.css` | Sabit yukarı okunun sağ/sol konumu |
| `/görev4` | `rezervasyon.html` | `pattern` ve `maxlength` |
| `/görev5` | `rezervasyon.html` | Bagaj `step` ve `max` değerleri |
| `/görev6` | `rezervasyon.html` | `datalist` seçenekleri |
| `/görev7` | `rezervasyon.html` | Yeni `optgroup` ve varış seçenekleri |
| `/görev8` | `rezervasyon.html` | Radio `checked` varsayılanı |
| `/görev9` | `rezervasyon.html` | `hidden` input türü |
| `/görev10` | `style.css` | `:focus` rengi |
| `/görev11` | `style.css` | `position: absolute` fotoğraf koordinatı |
| `/görev12` | `style.css` | `::after` başlık metni |

## Çalıştırma ve kayıt bilgisi

`index.html` dosyasını Live Server ile aç. Mürettebat listesi bir örnek API'den yüklenir; API yanıt vermezse yedek kartlar gösterilir. Rezervasyonlar ve girilen e-posta yalnızca bu tarayıcının `localStorage` alanında tutulur; gerçek rezervasyon sunucusu değildir. T.C. numarası, PNR parolası, not alanı ve dosyanın kendisi saklanmaz.

## Yayınlama

GitHub Pages adresi: `https://beroskaa672-ctrl.github.io/tumprojeler/aero_siber/`

SFTP görevi için VS Code SFTP ayarındaki `remotePath` değerini `/htdocs/hafta9_aerosiber` yap. Sunucu adresi, kullanıcı adı ve parolayı kendi yerel ayarına gir; gerçek erişim bilgilerini GitHub'a ekleme. Bu klasör yerel depo içinde ana projeler sayfasına bağlanmıştır.
