# Cave of Chi

Website marketing dan booking Cave of Chi, dibuat dengan Astro dan TypeScript serta dirender di server Vercel.

## Jalankan lokal

1. Gunakan Node.js `>=22.12.0`.
2. Jalankan `npm install`.
3. Salin `.env.example` menjadi `.env` dan isi `PUBLIC_API_URL` dengan endpoint khusus website. Event dan studio selalu diambil dari API; build tidak memakai data contoh jika API belum dikonfigurasi atau tidak tersedia.
4. Jalankan `npx astro dev --background` dan buka `http://localhost:4321`. Jalankan hanya satu server dev untuk folder WEBSITE; server memakai satu content store di `.astro`, dan URL callback Midtrans mengarah ke port 4321. Port dibuat strict agar proses duplikat berhenti dengan pesan port sibuk, bukan membuat server kedua di port lain.

Kelola server dengan `npx astro dev status`, `npx astro dev logs`, dan `npx astro dev stop`.

Pemeriksaan dan build statis:

```sh
npm run check
npm run build
npm run preview
```

## Konfigurasi sebelum deploy

- Isi `SITE_URL` dengan origin situs produksi yang kanonis, misalnya `https://domain-kamu.com` (tanpa path atau trailing slash). Nilai ini dipakai untuk canonical URL, metadata sosial, data terstruktur, dan sitemap; tanpa konfigurasi, halaman memakai origin request.
- Isi `PUBLIC_API_URL` dengan URL root API (termasuk prefix `/api`, tanpa trailing slash). Website mengambil data event dari `/public/events` dan studio aktif dari `/public/studios`; kedua endpoint tidak memerlukan token.
- Di environment Production Vercel, isi `PUBLIC_API_URL` dengan backend production, misalnya `https://design.langitlangit.id/backend/api`, bukan URL `localhost` atau tunnel ngrok. Gambar yang sementara dikembalikan API dengan host `localhost` atau ngrok dilayani melalui route proxy same-origin `/asset-proxy/`; ini membantu saat development, tetapi bukan pengganti konfigurasi endpoint production.
- FE memakai endpoint terpisah dari website: atur `NUXT_PUBLIC_API_BASE` di environment FE dan `PUBLIC_API_URL` di environment website. Mengubah `.env` lokal memerlukan restart dev server; perubahan environment production memerlukan build/deploy ulang.
- Event berstatus published dapat tampil sebelum jadwal disiapkan. Kartu menampilkan jadwal yang penjualannya belum dibuka dengan status dan tombol booking terkunci; sesi tanpa jadwal menampilkan harga/jadwal sebagai segera diumumkan.
- Halaman website dirender on-demand di Vercel. Data studio dan event publik diambil langsung dari API saat halaman diminta, jadi perubahan konten dan path gambar baru tidak memerlukan rebuild. Respons HTML menggunakan `Cache-Control: no-store`; hitungan request API mengikuti kunjungan halaman. `PUBLIC_API_URL` juga dipakai oleh request booking dari browser, sehingga harus tersedia saat build/deploy; perubahan endpoint memerlukan build/deploy ulang.
- Website menggunakan adapter resmi `@astrojs/vercel`. Atur Root Directory Vercel ke folder yang berisi `package.json` website (root repository untuk repo website terpisah ini), lalu biarkan Vercel menjalankan build Astro dari source; jangan deploy artefak `.vercel/output` yang dibangun di Windows karena berisi path dan binary native khusus Windows. Folder `.vercel/` adalah output generated lokal dan tidak boleh di-commit.
- Website mendukung Bahasa Indonesia (default, URL tanpa prefix) dan English (`/en`). Pengalih bahasa di header mempertahankan halaman saat ini. Teks UI dan metadata disimpan sebagai pasangan `{ id, en }` dengan key semantik di file `*.messages.ts` milik komponen atau view terkait; nama, deskripsi, jadwal, dan detail event/studio dari API tetap mengikuti konten yang dimasukkan admin. Perbarui pesan di file pemiliknya dan uji kedua locale saat menambah teks UI atau route publik.
- Booking tamu berjalan dari browser ke `POST /public/event-bookings`; API memvalidasi sesi, kuota dan harga, menahan slot secara transaksional, lalu membuat pembayaran Midtrans Snap. Website mengirim `/booking/after-payment?reference={referenceId}` sebagai URL kembali untuk hasil pembayaran sukses maupun batal. Halaman itu menampilkan detail booking dan memeriksa status dari API; pembayaran hanya dianggap lunas setelah notifikasi Midtrans tervalidasi. Atur `PUBLIC_WEBSITE_URL` backend ke origin website ini (origin tersebut juga diizinkan oleh CORS) dan konfigurasi URL notifikasi Midtrans ke endpoint callback API.
- Gambar yang tersedia saat ini adalah ilustrasi SVG lokal karena foto asli Cave of Chi belum disediakan. Ganti aset di `src/assets/images/` dan `public/og-default.svg` dengan foto yang disetujui sebelum peluncuran.

Panduan tahapan dan arsitektur ada di [`docs/MIGRATION.md`](./docs/MIGRATION.md).
