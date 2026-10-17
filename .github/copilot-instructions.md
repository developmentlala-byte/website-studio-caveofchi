# Cave of Chi — Astro (static)

Website marketing + booking untuk Cave of Chi. Astro 7, TypeScript strict, output static.
TANPA React/Vue/Tailwind/UI framework. Interaksi = TypeScript biasa.

## Aturan struktur

- Halaman tipis: `src/pages/*` hanya menyusun komponen + mengambil data. Tidak ada markup besar di sini.
- Komponen per domain di `src/components/<domain>/`. Satu komponen = satu tanggung jawab.
- Copy statis di `src/data/*.ts`, bukan hardcoded di markup yang berulang.
- Semua import pakai alias `@/` (contoh: `@/lib/format`).
- Data event HANYA lewat Content Collection `events` (`src/content.config.ts`) dan helper `@/lib/events`.
  Jangan `fetch` event langsung dari komponen/halaman.

## Batas server vs browser (penting)

- `src/lib/api/events.ts` dan `src/lib/api/studios.ts` = build-time only dan hanya memakai endpoint baca publik. Dilarang di-import dari `<script>` client.
- Event dan studio tidak boleh memakai mock atau konstanta data; API publik wajib tersedia saat build.
- `src/lib/api/bookings.ts` = browser. Hanya boleh pakai variabel `PUBLIC_*`. Jangan taruh secret.
- Dilarang menaruh secret/token di variabel berawalan `PUBLIC_`.

## Styling

- CSS scoped di `<style>` tiap komponen. Token (warna, font, radius) HANYA dari `var(--...)` di `src/styles/tokens.css`.
- Class global hanya yang ada di `utilities.css` (`.container .section .eyebrow .heading .script .micro .tag .dot .section-head`).
- Jangan buat nilai warna/ukuran baru kalau sudah ada token. Jangan pakai `!important` (kecuali `[hidden]` di base.css).
- Elemen yang dibuat lewat `innerHTML` TIDAK kena scoped CSS. Karena itu: jangan render UI dengan innerHTML.
  Render di Astro (build-time), lalu script hanya toggle `hidden` / class / `textContent`.

## JavaScript

- Dilarang `onclick=""` inline dan `innerHTML` dengan data dinamis (XSS). Pakai `textContent`, event delegation, atribut `data-*`.
- Script kecil (<30 baris) inline di `<script>` komponen. Yang lebih besar ke `src/scripts/`.
- Progressive enhancement: konten utama harus terbaca tanpa JS.

## Aksesibilitas

- Modal pakai `<dialog>` + `showModal()` (focus trap & Esc bawaan). Dilarang membuat modal dari `<div>`.
- Tombol = `<button type="button">`, navigasi = `<a>`. Toggle pakai `aria-pressed` / `aria-expanded` (string "true"/"false").
- Gambar dekoratif `alt=""`; gambar bermakna beri alt Bahasa Indonesia yang deskriptif.
- Hormati `prefers-reduced-motion`. Kontras teks minimal WCAG AA.

## Gambar & font

- Gambar lokal di `src/assets/images/`, pakai `<Image>` dari `astro:assets` dengan `widths` + `sizes`.
  Hero (LCP) pakai `loading="eager"` + `fetchpriority="high"`; sisanya `lazy`.
- Font self-host via `@fontsource*`. Dilarang memuat Google Fonts dari CDN.

## Waktu & uang

- Semua waktu tampil di zona `Asia/Jakarta` lewat `@/lib/format`. Jangan `toLocaleString` langsung di komponen.
- Harga dalam integer rupiah; format hanya lewat `formatIDR`.

## Definition of done (tiap fase)

- `npm run check` dan `npm run build` lulus tanpa error/warning.
- Tidak ada `any`, tidak ada `// @ts-ignore`.
- Tampilan identik dengan `index.html` lama di desktop dan mobile (≤740px).
- Navigasi keyboard berfungsi (Tab, Enter, Esc).
