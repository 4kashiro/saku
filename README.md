# SahabatKu — Panduan Menjalankan & Deploy

Folder ini adalah proyek Vite + React yang siap dijalankan dan di-deploy. Prototipe yang sebelumnya hanya berupa satu file `.jsx` sudah dibungkus dengan konfigurasi build lengkap (Vite, Tailwind, PostCSS) supaya bisa menghasilkan situs statis nyata.

## 1. Jalankan di komputer sendiri (opsional, untuk cek dulu)

Butuh [Node.js](https://nodejs.org) versi 18 ke atas.

```bash
cd sahabatku-app
npm install
npm run dev
```

Buka alamat yang muncul di terminal (biasanya `http://localhost:5173`).

## 2. Ganti Logo

Logo di pojok kiri atas sekarang membaca file `public/logo.png`. Ada logo bawaan (kotak emas polos) sebagai placeholder — tinggal timpa filenya:

1. Siapkan gambar logo Anda, idealnya **persegi** (mis. 128×128px atau 256×256px), format PNG dengan latar transparan agar menyatu dengan bar atas.
2. Ganti file `public/logo.png` dengan gambar Anda (nama file harus tetap `logo.png`, atau ubah juga rujukannya — lihat langkah 3).
3. Kalau ingin nama file berbeda (misal `brand.svg`), cari baris ini di `src/App.jsx` dan `index.html`, lalu sesuaikan path-nya:

   ```jsx
   // src/App.jsx — baris logo di top bar
   <img src="/logo.png" alt="SahabatKu" style={{ width: 24, height: 24, borderRadius: 4, objectFit: "cover" }} />
   ```

   ```html
   <!-- index.html — favicon tab browser -->
   <link rel="icon" type="image/png" href="/logo.png" />
   ```

   Ganti `"/logo.png"` di kedua tempat menjadi `"/brand.svg"` (atau nama file Anda). File harus ada di dalam folder `public/` — semua isi folder ini otomatis tersedia di root domain saat di-deploy.

4. Ingin logo berbentuk lain (bukan kotak)? Ubah `style={{ borderRadius: 4 }}` jadi `borderRadius: "50%"` untuk bulat, atau hapus baris itu untuk logo persegi biasa.

## 3. Build untuk produksi

```bash
npm run build
```

Ini menghasilkan folder `dist/` — inilah yang di-deploy ke Netlify.

## 4. Deploy ke Netlify

Ada tiga cara, pilih yang paling nyaman:

### Cara A — Drag & drop (paling cepat, tanpa akun Git)
1. Jalankan `npm run build` di komputer Anda dulu (lihat langkah 3).
2. Buka [app.netlify.com/drop](https://app.netlify.com/drop).
3. Seret folder `dist/` ke halaman tersebut.
4. Selesai — Netlify langsung memberi Anda URL publik (`https://nama-acak.netlify.app`). Bisa ganti nama domain nanti di **Site settings → Domain management**.

### Cara B — Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```
Saat ditanya *publish directory*, isi `dist`. File `netlify.toml` di folder ini sudah menyiapkan perintah build (`npm run build`) dan folder publish (`dist`) secara otomatis, jadi CLI akan langsung tahu cara build-nya.

### Cara C — Hubungkan ke GitHub (deploy otomatis tiap kali push)
1. Push folder ini ke repository GitHub (`git init`, `git add .`, `git commit`, `git push`).
2. Di Netlify: **Add new site → Import an existing project → GitHub**, pilih repo-nya.
3. Netlify otomatis mendeteksi pengaturan dari `netlify.toml` (build command `npm run build`, publish directory `dist`).
4. Klik **Deploy** — setiap kali Anda push perubahan baru, situs akan ter-update otomatis.

## Catatan
- Semua kanvas kerja disimpan sementara di memori browser (state React) dan file `.saku` yang bisa diunduh/diunggah manual — belum ada database di server, jadi setiap pengunjung punya kanvas kosong sendiri saat membuka situs.
- Font "Amiri" dimuat dari Google Fonts lewat internet; pastikan koneksi tersedia saat aplikasi dibuka.
