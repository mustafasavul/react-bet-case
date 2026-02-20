# React Bet Case

This project is a case study conducted for Nesine.com, demonstrating a performant and responsive betting bulletin application.

## Technologies Used

- **React 19** - Core UI Library
- **TypeScript** - For type safety and better developer experience
- **Redux Toolkit & React-Redux** - Global state management for the betting cart (BetSlip)
- **Redux Persist** - For persisting the cart state across page reloads
- **React Virtuoso** - For rendering large lists of data efficiently (virtualization)
- **Sass (SCSS)** - For styling using CSS Modules
- **Webpack** - Module bundler and development server
- **Husky & Commitlint** - Git hooks to enforce Conventional Commits
- **React Toastify** - For toast notifications
- **React Scan** - Used dynamically for detecting and debugging unneeded React renders
- **ESLint & Prettier** - For code linting and formatting consistency
- **Error Boundary** - Graceful error handling for unexpected JavaScript crashes

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and `npm` installed on your machine.

### Installation & Running

1. Clone the repository:
   ```bash
   git clone https://github.com/mustafasavul/react-bet-case.git
   ```
2. Navigate to the project directory:
   ```bash
   cd react-bet-case
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run start
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```
   The application will run on `http://localhost:8080` (or another available port).

### Building for Production

To create a production build, run:
```bash
npm run build
```
The optimized files will be generated in the `dist` folder.

### Linting & Formatting

To ensure code quality and consistent formatting, use the following commands:
```bash
# Check code for issues
npm run lint

# Automatically format code
npm run format
```

---

## Geliştirmeler, Performans ve Render İyileştirmeleri

Proje sürecinde kullanıcı deneyimini artırmak ve yüksek performans sağlamak amacıyla aşağıdaki geliştirmeler ve optimizasyonlar yapılmıştır:

### 1. Büyük Veri Kümelerinde Render Optimizasyonu (List Virtualization)
Bültende listelenecek olan maç verilerinin (büyük bir nesne veya liste) DOM üzerinde performans sorunlarına yol açmasını önlemek amacıyla **`react-virtuoso`** kütüphanesi entegre edildi. Bu kütüphane sayesinde liste sanallaştırması yapılarak, yalnızca kullanıcının ekranında (viewport) görünen öğeler render edilmektedir. Bu, özellikle eski mobil cihazlarda veya kaydırma (scroll) işlemlerinde FPS düşüşlerini önleyerek render performansı sağlar.

### 2. Durum Yönetimi ve Veri Kalıcılığı (State Persistence)
Seçilen maç oranlarının (`BetSlip` içindeki veriler) sayfa yenilemeleri (refresh) sırasında kaybolmasını önlemek için **`redux-persist`** kullanıldı. Redux store'undaki cart state'i yerel tarayıcı hafızasına (localStorage vb.) otomatik olarak yazılıp, uygulama yeniden yüklendiğinde "rehydrate" edilerek verilerin kullanıcıya eksiksiz sunulması sağlandı. 

### 3. Komponent Bazlı Render Kontrolü ve Optimizasyon
- Seçilen oranların (`OddCell` bileşeni vb.) hızlıca UI'da güncellenmesi ve sadece gerekli değişimin UI'a yansıması için state yapısı optimize edildi. Tüm bülteni tekrar render etmek yerine sadece seçimin durumundaki değişiklik ile bileşenler re-render edilmektedir.
- Redux Toolkit sayesinde, immutable veri güncellemeleri kolaylaştırılarak ve spesifik selector'lar yazılarak gereksiz re-render'lar minimal seviyeye indirildi.

### 4. Responsive (Mobil Uyumluluk) Tasarım İyileştirmeleri
- Mobil cihazlarda bülten tablosunun (grid) düzgün bir şekilde görüntülenmesi için CSS Grid yapıları `.module.scss` üzerinden optimize edildi. Tablo karmaşası azaltıldı.

### 5. Geliştirici Deneyimi ve Kod Kalitesi
Projeye `Husky` ve `@commitlint` entegre edildi ve projeye atılan commit'lerin 2025 güncel "Conventional Commits" standartlarında olması sağlandı, böylece geçmiş değişiklikler ve sürümlerin dökümantasyonu standartlaştırıldı. Ayrıca projeye **ESLint** ve **Prettier** kurularak kodun hem temiz kalması hem de tüm dosyaların ortak bir stil standardında (formatting) olması güvence altına alındı. Linter kurallarında Typescript/React kuralları esnek bırakılarak (örneğin any kullanım izni, set-state-in-effect uyarısının kapatılması) geliştirme hızının kesilmesinin önüne geçildi.

### 6. React Error Boundary (Hata Sınırı) Entegrasyonu
Çalışma zamanında beklenmedik bir JavaScript veya Render hatası ("crash") yaşandığında kullanıcının beyaz bir ekranla karşılaşmaması için özelleştirilmiş bir **`ErrorBoundary`** bileşeni geliştirildi. Bu özellik, uygulama çöktüğünde bile şık bir fallback UI (yedek arayüz) sunarak kullanıcının anlık olarak hatayı okuyabilmesine ve tek tıkla "Sayfayı Yenile" aksiyonunu almasına olanak tanır.
