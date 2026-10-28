# Panduan Arsitektur Cave of Chi

Dokumen ini menyimpan catatan migrasi awal; beberapa contoh di bawah masih menggambarkan konfigurasi static lama. Arsitektur website yang aktif sekarang adalah Astro SSR dengan adapter Vercel.

## Keputusan yang dikunci

- **Pure Astro:** tanpa framework JS, interaksi pakai TypeScript biasa.
- **Server output:** `output: 'server'` dengan `@astrojs/vercel`.
- **Data dari sistemmu:** event dan studio lewat endpoint API publik saat request halaman; booking lewat API dari browser.
- **Copilot:** aturan ditaruh di `.github/copilot-instructions.md`, dibaca otomatis oleh Copilot.
- **Lokalisasi:** Bahasa Indonesia menjadi default tanpa prefix; versi English memakai prefix `/en`. Teks antarmuka memakai pesan bilingual bertipe dengan key semantik di file `*.messages.ts` milik komponen/view; data event/studio dari API tidak diterjemahkan otomatis.

## Konsekuensi SSR + data dari sistem

1. **Data event dan studio dibaca saat request halaman.** Perubahan konten dan gambar tidak memerlukan rebuild. Respons HTML menggunakan `Cache-Control: no-store`; request ke `/public/events` dan `/public/studios` terjadi dari server website.
2. **Booking dari browser berarti endpoint-nya publik.** Siapa pun bisa memanggil API secara langsung, jadi validasi, pengecekan kuota, rate limit, dan CORS terbatas ke domainmu **wajib ada di sisi sistemmu**. Validasi di frontend hanya untuk UX.

## Perilaku implementasi saat ini

- Semua studio dan event mendatang diambil dari API saat request, tanpa data dummy atau fallback data lokal.
- Kartu event tampil dalam satu daftar datar. Semua event tampil secara default; filter studio hanya menyaring setelah pengguna memilih studio, dan sesi di studio lain disembunyikan.
- Nama studio pada daftar event, jadwal, detail event, dan alur booking berasal dari `studioName` pada respons API event. Studio filter dan showcase menggunakan daftar `GET /public/studios`.
- Gambar event hanya ditampilkan jika API menyediakan `imageUrl`; situs tidak menggantinya dengan gambar event lokal.
- Contoh kode di bawah adalah catatan migrasi awal. Jika berbeda, implementasi aktif di `src/` menjadi acuan.

---

## 1. Setup

```bash
npm create astro@latest cave-of-chi -- --template minimal --typescript strict
cd cave-of-chi
npx astro add sitemap
npm i @fontsource-variable/dm-sans @fontsource/cormorant-garamond
npm i -D @astrojs/check typescript
```

Contoh setup static dan Content Collections di bawah adalah catatan historis, bukan konfigurasi deploy aktif. Repository memakai Astro 7 dengan `output: "server"` dan adapter `@astrojs/vercel`; rujuk `astro.config.mjs` dan `package.json` untuk konfigurasi aktif.

`package.json` scripts:

```json
"scripts": {
  "dev": "astro dev",
  "check": "astro check",
  "build": "astro check && astro build",
  "preview": "astro preview"
}
```

`.env.example`:

```bash
# URL root API, termasuk prefix /api bila digunakan, tanpa trailing slash.
# URL backend yang dipakai server website saat request halaman.
PUBLIC_API_URL=
# Mode simulasi booking dan badge demo. Event dan studio tetap wajib dibaca dari API.
PUBLIC_DEMO_MODE=true
# URL origin produksi, misalnya https://domain-kamu.com. Kosongkan hanya untuk development lokal.
SITE_URL=
```

`astro.config.mjs` (sitemap aktif setelah `SITE_URL` diisi):

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL;

export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  trailingSlash: 'never',
  integrations: site ? [sitemap()] : [],
});
```

`tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

---

## 2. Struktur folder

```
.
├─ .github/
│  └─ copilot-instructions.md
├─ docs/MIGRATION.md                    ← file ini
├─ public/
│  ├─ favicon.svg
│  ├─ og-default.svg                    ← placeholder 1200×630, ganti dengan gambar final
│  └─ robots.txt                        ← dihasilkan saat build
├─ src/
│  ├─ assets/images/                    ← aset editorial statis (bukan data event/studio)
│  ├─ components/
│  │  ├─ layout/   AnnouncementBar · Brand · SiteHeader · SiteFooter · DemoBadge · PageHeader
│  │  ├─ home/     Hero · Intro · StudiosShowcase · RitualBand · CommunityBand
│  │  ├─ events/   ExperiencesSection · EventBrowser · EventCard
│  │  ├─ schedule/ ScheduleCalendar
│  │  ├─ booking/  BookButton · BookingModal
│  │  └─ faq/      FaqList
│  ├─ data/        faq.ts · ritual.ts   ← copy statis
│  ├─ layouts/     BaseLayout.astro
│  ├─ lib/
│  │  ├─ api/      events.ts · studios.ts · public.ts · bookings.ts
│  │  ├─ events.ts (query helper) · format.ts · site.ts
│  ├─ pages/
│  │  ├─ index.astro · about.astro · schedule.astro · faq.astro · 404.astro
│  │  └─ experiences/ index.astro · [slug].astro
│  ├─ scripts/     booking-modal.ts · availability.ts
│  ├─ styles/      global.css · tokens.css · base.css · utilities.css
│  └─ content.config.ts
├─ .env.example · astro.config.mjs · tsconfig.json · package.json
```

---

## 3. `.github/copilot-instructions.md`

````md
# Cave of Chi — Astro (SSR)

Website marketing + booking untuk Cave of Chi. Astro 7, TypeScript strict, output server melalui Vercel.
TANPA React/Vue/Tailwind/UI framework. Interaksi = TypeScript biasa.

## Aturan struktur
- Halaman tipis: `src/pages/*` hanya menyusun komponen + mengambil data. Tidak ada markup besar di sini.
- Komponen per domain di `src/components/<domain>/`. Satu komponen = satu tanggung jawab.
- Copy statis di `src/data/*.ts`, bukan hardcoded di markup yang berulang.
- Semua import pakai alias `@/` (contoh: `@/lib/format`).
- Data event lewat API runtime melalui `@/lib/api/events` dan helper `@/lib/events`.
  Jangan `fetch` event langsung dari komponen/halaman.

## Batas server vs browser (penting)
- `src/lib/api/events.ts` dan `src/lib/api/studios.ts` = server-side runtime dan hanya memakai endpoint baca publik. Dilarang di-import dari `<script>` client.
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
````

---

## 4. Data layer

### `src/lib/site.ts`

```ts
export const SITE = {
  name: 'Cave of Chi',
  tagline: 'Art. Space. Energy.',
  description:
    'Cave of Chi — sanctuary kreatif untuk workshop, ritual mindful, dan koneksi bermakna di White Cave dan Petra Cave.',
  demo: import.meta.env.PUBLIC_DEMO_MODE === 'true',
  instagram: '@caveofchi',
} as const;

export const SPACES = {
  'white-cave': 'White Cave',
  'petra-cave': 'Petra Cave',
} as const;

export const CATEGORIES = {
  creative: 'Creative Studio',
  wellness: 'Healing & Wellness',
  social: 'Gather & Connect',
} as const;

export const NAV_LINKS = [
  { label: 'Our Story', href: '/about' },
  { label: 'The Caves', href: '/#spaces' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Community', href: '/about#community' },
] as const;
```

### `src/lib/format.ts`

```ts
const TZ = 'Asia/Jakarta';

export const formatIDR = (v: number) =>
  'Rp ' + new Intl.NumberFormat('id-ID').format(v);

export const formatDateShort = (d: Date) =>
  new Intl.DateTimeFormat('id-ID', {
    timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short',
  }).format(d);

export const formatTime = (d: Date) =>
  new Intl.DateTimeFormat('id-ID', {
    timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(d).replace('.', ':');

export const formatWeekday = (d: Date) =>
  new Intl.DateTimeFormat('id-ID', { timeZone: TZ, weekday: 'short' }).format(d);

export const formatDayNumber = (d: Date) =>
  new Intl.DateTimeFormat('id-ID', { timeZone: TZ, day: 'numeric' }).format(d);

/** Kunci hari YYYY-MM-DD di zona Jakarta (untuk grouping kalender) */
export const dayKey = (d: Date) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(d);

export const formatDuration = (min: number) =>
  min >= 60 ? `${min / 60} jam` : `${min} menit`;

export function formatMonthRange(a: Date, b: Date) {
  const month = (d: Date) =>
    new Intl.DateTimeFormat('id-ID', { timeZone: TZ, month: 'long' }).format(d);
  const year = new Intl.DateTimeFormat('id-ID', { timeZone: TZ, year: 'numeric' }).format(b);
  return month(a) === month(b) ? `${month(a)} ${year}` : `${month(a)} – ${month(b)} ${year}`;
}
```

### `src/lib/api/events.ts` (server-side runtime)

Implementasi aktual mengambil collection event melalui `fetchPublicCollection()` di `src/lib/api/public.ts`. Endpoint `GET /public/events` menggunakan envelope `{ success, data, meta }`; hasilnya dinormalisasi lalu divalidasi oleh Content Collection. Endpoint baca publik tidak memerlukan token. Gunakan source aktual sebagai referensi kontrak.

Website tidak lagi memiliki `src/lib/api/mock.ts` atau fallback event lokal. API yang gagal atau belum dikonfigurasi akan menghentikan build.

### `src/content.config.ts`

```ts
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { fetchEvents } from './lib/api/events';

const events = defineCollection({
  loader: async () => {
    const raw = await fetchEvents();
    return raw.map((e) => ({ ...e, id: e.slug })); // id entry = slug → URL detail
  },
  // Validasi di sini: data API yang bentuknya salah akan menggagalkan build dengan pesan jelas.
  schema: z.object({
    eventId: z.string(),            // ID di sistemmu (dipakai untuk booking)
    slug: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string().optional(),
    category: z.enum(['creative', 'wellness', 'social']),
    space: z.enum(['white-cave', 'petra-cave']),
    price: z.number().int().nonnegative(),
    startsAt: z.coerce.date(),
    durationMinutes: z.number().int().positive(),
    capacity: z.number().int().positive(),
    seatsLeft: z.number().int().nonnegative(),
    imageUrl: z.string().url().optional(),
    included: z.array(z.string()).default([]),
  }),
});

export const collections = { events };
```

### `src/lib/events.ts`

```ts
import { getCollection, type CollectionEntry } from 'astro:content';
import { dayKey } from './format';

export type CaveEvent = CollectionEntry<'events'>;

const byDate = (a: CaveEvent, b: CaveEvent) =>
  a.data.startsAt.getTime() - b.data.startsAt.getTime();

export async function getUpcomingEvents(limit?: number) {
  const now = Date.now();
  const all = await getCollection('events', ({ data }) => data.startsAt.getTime() >= now);
  const sorted = all.sort(byDate);
  return limit ? sorted.slice(0, limit) : sorted;
}

export function groupByDay(events: CaveEvent[]): [string, CaveEvent[]][] {
  const map = new Map<string, CaveEvent[]>();
  for (const e of events) {
    const key = dayKey(e.data.startsAt);
    map.set(key, [...(map.get(key) ?? []), e]);
  }
  return [...map.entries()];
}
```

### `src/lib/api/bookings.ts` (jalan di browser)

Kontrak API di bawah adalah asumsi, sesuaikan dengan API-mu.

```ts
const API_URL = import.meta.env.PUBLIC_API_URL as string | undefined;

export interface BookingInput {
  eventId: string;
  name: string;
  whatsapp: string;
  quantity: number;
  note?: string;
}
export interface BookingResult { code: string }

export class BookingError extends Error {}

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  if (!API_URL) {
    await new Promise((r) => setTimeout(r, 600)); // simulasi (mode demo)
    return { code: `DEMO-${Date.now().toString(36).toUpperCase()}` };
  }
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new BookingError(body?.message ?? 'Reservasi gagal diproses.');
  }
  const json = (await res.json()) as { code?: unknown };
  if (typeof json.code !== 'string') throw new BookingError('Respons server tidak valid.');
  return { code: json.code };
}
```

---

## 5. Styles

`src/styles/global.css`:

```css
@import './tokens.css';
@import './base.css';
@import './utilities.css';
```

- **`tokens.css`**: blok `:root { ... }` dari file lama. Ubah dua baris font:
  `--font-heading: "Cormorant Garamond", Georgia, serif;`
  `--font-body: "DM Sans Variable", Arial, sans-serif;`
  (`@fontsource-variable/dm-sans` mendaftarkan nama "DM Sans Variable".)
- **`base.css`**: reset dan elemen dasar (lihat tabel di Bagian 8).
- **`utilities.css`**: `.container .section .eyebrow .micro .heading .script .tag .dot .section-head`.

Tambahan di `base.css` (belum ada di file lama):

```css
[hidden] { display: none !important; }
body:has(dialog[open]) { overflow: hidden; }
.skip-link {
  position: absolute; left: 12px; top: -60px; z-index: 200;
  background: var(--umber); color: #fff; padding: 10px 14px;
}
.skip-link:focus { top: 12px; }
:focus-visible { outline: 2px solid var(--clay); outline-offset: 3px; }
```

---

## 6. Layout & komponen

> **CSS tiap komponen:** pindahkan blok CSS dari file lama **apa adanya** ke `<style>` komponen sesuai tabel di Bagian 8. Di kode bawah, `/* ... */` adalah penanda tempat CSS itu ditaruh.

### `src/layouts/BaseLayout.astro`

```astro
---
import '@fontsource-variable/dm-sans';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@/styles/global.css';

import AnnouncementBar from '@/components/layout/AnnouncementBar.astro';
import SiteHeader from '@/components/layout/SiteHeader.astro';
import SiteFooter from '@/components/layout/SiteFooter.astro';
import DemoBadge from '@/components/layout/DemoBadge.astro';
import BookingModal from '@/components/booking/BookingModal.astro';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  headerVariant?: 'overlay' | 'solid';
  noindex?: boolean;
}
const {
  title, description, ogImage = '/og-default.svg',
  headerVariant = 'solid', noindex = false,
} = Astro.props;

const canonical = Astro.site ? new URL(Astro.url.pathname, Astro.site) : null;
const ogUrl = Astro.site ? new URL(ogImage, Astro.site) : null;
---
<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#f7f1ea" />
    <title>{title}</title>
    <meta name="description" content={description} />
    {canonical && <link rel="canonical" href={canonical} />}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    {noindex && <meta name="robots" content="noindex" />}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {canonical && <meta property="og:url" content={canonical} />}
    {ogUrl && <meta property="og:image" content={ogUrl} />}
    <meta name="twitter:card" content="summary_large_image" />
    <slot name="head" />
  </head>
  <body>
    <a class="skip-link" href="#main">Lewati ke konten</a>
    <div class="grain" aria-hidden="true"></div>
    <AnnouncementBar />
    <SiteHeader variant={headerVariant} />
    <main id="main"><slot /></main>
    <SiteFooter />
    <DemoBadge />
    <BookingModal />
  </body>
</html>
```

Kenapa ada `headerVariant`: header lama berteks putih dan menumpuk di atas foto hero. Di halaman dalam yang latarnya terang, teksnya tidak terlihat. Jadi hanya beranda yang `overlay`, sisanya `solid`.

### `components/layout/AnnouncementBar.astro`

```astro
<div class="top-note">
  A little slower, a little closer. &nbsp;✳&nbsp; Welcome to our creative sanctuary
</div>
<style>/* .top-note + media query-nya */</style>
```

### `components/layout/Brand.astro`

```astro
---
interface Props { size?: 'md' | 'lg' }
const { size = 'md' } = Astro.props;
---
<a class:list={['brand', size]} href="/" aria-label="Cave of Chi, ke beranda">
  <span class="brand-name">CAVE <i>of</i> CHI</span>
  <span class="brand-sub">Art. Space. Energy.</span>
</a>
<style>
  /* .brand, .brand-name, .brand-sub + media query */
  .brand-name i { font-weight: 400; font-size: 0.57em; }
  .lg .brand-name { font-size: 58px; }
  .lg .brand-sub { text-align: left; margin-left: 6px; margin-top: 16px; }
</style>
```

### `components/layout/SiteHeader.astro`

```astro
---
import Brand from './Brand.astro';
import { NAV_LINKS } from '@/lib/site';

interface Props { variant?: 'overlay' | 'solid' }
const { variant = 'overlay' } = Astro.props;
const path = Astro.url.pathname;
const isCurrent = (href: string) =>
  !href.includes('#') && (href === path || path.startsWith(href + '/'));
---
<header class:list={['header', variant]}>
  <Brand />
  <nav class="nav" id="site-nav" aria-label="Navigasi utama">
    {NAV_LINKS.map((l) => (
      <a href={l.href} aria-current={isCurrent(l.href) ? 'page' : undefined}>{l.label}</a>
    ))}
    <a class="nav-book" href="/experiences">Book an experience ↗</a>
  </nav>
  <button class="menu-btn" type="button" aria-label="Buka navigasi"
          aria-expanded="false" aria-controls="site-nav">☰</button>
</header>

<style>
  /* .header .nav .nav-book .menu-btn + media query */
  .nav-book { display: inline-block; }              /* dulu <button>, sekarang <a> */
  .header.solid { position: relative; top: 0; background: #41352d; }
</style>

<script>
  const btn = document.querySelector<HTMLButtonElement>('.menu-btn');
  const nav = document.querySelector<HTMLElement>('#site-nav');
  if (btn && nav) {
    const setOpen = (open: boolean) => {
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.addEventListener('click', (e) => {
      if ((e.target as Element).closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }
</script>
```

### `components/layout/SiteFooter.astro`

```astro
---
import Brand from './Brand.astro';
import { SITE, NAV_LINKS } from '@/lib/site';
const year = new Date().getFullYear();
---
<footer class="footer">
  <div class="container">
    <div class="footer-upper">
      <div>
        <Brand size="lg" />
        <p class="footer-caption">An invitation to slow down, create and connect.</p>
      </div>
      <div class="footer-links">
        <div>
          <strong>Discover</strong>
          {NAV_LINKS.filter((l) => l.label !== 'Community').map((l) => (
            <a href={l.href}>{l.label}</a>
          ))}
        </div>
        <div>
          <strong>Connect</strong>
          <a href="/about#community">Our community</a>
          <span>Instagram: {SITE.instagram}</span>
          <span>WhatsApp: coming soon</span>
          <span>Location: to be announced</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© {year} Cave of Chi • Art. Space. Energy.</span>
      {SITE.demo && <span class="footer-note">Concept website · booking simulation only</span>}
      <a href="#main">Back to top ↑</a>
    </div>
  </div>
</footer>
<style>/* .footer, .footer-* (kecuali .footer .brand-*, sudah di Brand) */</style>
```

### `components/layout/DemoBadge.astro`

```astro
---
import { SITE } from '@/lib/site';
---
{SITE.demo && <div class="demo-badge">✳ &nbsp;Concept demo · No real payment</div>}
<style>/* .demo-badge + media query */</style>
```

### `components/layout/PageHeader.astro` (judul halaman dalam)

```astro
---
interface Props { eyebrow: string; title: string; description?: string }
const { eyebrow, title, description } = Astro.props;
---
<section class="page-header">
  <div class="container">
    <div class="eyebrow">{eyebrow}</div>
    <h1 class="heading">{title}</h1>
    {description && <p class="lead">{description}</p>}
  </div>
</section>
<style>
  .page-header { padding: 80px 0 40px; }
  .page-header .heading { font-size: clamp(56px, 7vw, 91px); margin: 14px 0; }
  .lead { max-width: 480px; color: #74665b; line-height: 1.8; font-size: 14px; }
</style>
```

### `components/home/Hero.astro`

Hero menerima koleksi studio dari `fetchStudios()` di halaman beranda. Foto dan label studio di
hero memakai `coverImageUrl` serta nama yang sama dengan endpoint publik; gambar statis lokal
tidak digunakan sebagai fallback.

Setiap halaman harus punya tepat satu `h1`. Di beranda ada di Hero; halaman dalam memakai `PageHeader`.

### `components/home/Intro.astro`, `RitualBand.astro`, `CommunityBand.astro`

Markup dari file lama dipindah apa adanya (pakai `<Image>` untuk `sound.webp` di Ritual), dengan dua perubahan: data berulang jadi array, dan `id="community"` dipertahankan.

```astro
---
// RitualBand.astro
import { Image } from 'astro:assets';
import sound from '@/assets/images/sound.webp';
import { RITUAL_STEPS } from '@/data/ritual';
---
<section class="ritual">
  <div class="ritual-photo">
    <Image src={sound} widths={[640, 960, 1280]} sizes="(max-width: 740px) 100vw, 50vw"
      alt="Suasana sound healing dengan singing bowl dan gong di dalam cave bercahaya lilin" loading="lazy" />
  </div>
  <div class="ritual-copy">
    <div class="eyebrow">05 / The Cave of Chi way</div>
    <h2>Come as<br />you <em class="script">are.</em></h2>
    <p>Tidak perlu jadi seniman untuk berkarya. Tidak perlu tahu apa-apa tentang meditasi untuk mulai. Di sini, rasa penasaran sudah cukup untuk memulai.</p>
    <div class="ritual-steps">
      {RITUAL_STEPS.map((s) => (<div><strong>{s.title}</strong><small>{s.text}</small></div>))}
    </div>
  </div>
</section>
<style>/* .ritual, .ritual-* + media query. Inline style warna eyebrow → class */</style>
```

`src/data/ritual.ts`:

```ts
export const RITUAL_STEPS = [
  { title: '01. Arrive', text: 'Datang, disambut, temukan ritme yang nyaman.' },
  { title: '02. Create', text: 'Belajar, eksplorasi, dan hadir di momen.' },
  { title: '03. Connect', text: 'Berbagi karya dan cerita dengan komunitas.' },
  { title: '04. Return', text: 'Bawa pulang pengalaman, bukan hanya benda.' },
] as const;

export const COMMUNITY_FEATURES = [
  { icon: '✻', title: 'Make', text: 'Ruang eksplorasi untuk menciptakan sesuatu dengan tangan.' },
  { icon: '◌', title: 'Restore', text: 'Ritual mindfulness untuk menemukan jeda dan keseimbangan.' },
  { icon: '✧', title: 'Belong', text: 'Pertemuan komunitas untuk saling mengenal dan terkoneksi.' },
] as const;
```

`CommunityBand.astro` memakai pola yang sama: `<section class="community" id="community">` dengan fitur dari `COMMUNITY_FEATURES`.

### `components/home/StudiosShowcase.astro`

Data studio hanya berasal dari `GET /public/studios` melalui `src/lib/api/studios.ts`. Nama,
kode, kapasitas, deskripsi, dan gambar mengikuti respons API; kartu tidak memakai gambar
fallback atau konstanta studio lokal.

### `components/booking/BookButton.astro`

```astro
---
import type { CaveEvent } from '@/lib/events';
import { SPACES } from '@/lib/site';
import { formatDateShort, formatTime } from '@/lib/format';

interface Props { event: CaveEvent; variant?: 'solid' | 'outline' }
const { event, variant = 'solid' } = Astro.props;
const d = event.data;
const soldOut = d.seatsLeft <= 0;
const meta = `${SPACES[d.space]} · ${formatDateShort(d.startsAt)} · ${formatTime(d.startsAt)} WIB`;
---
<button type="button" class:list={['book', variant]} data-book
  data-event-id={d.eventId} data-title={d.title} data-meta={meta}
  data-price={d.price} data-seats={d.seatsLeft} disabled={soldOut}>
  {soldOut ? 'Fully booked' : <slot>Reserve seat ↗</slot>}
</button>
<style>
  .book { transition: background 0.2s; }
  .solid { /* .book-small dari file lama */ }
  .outline { /* ".agenda-item button" dari file lama, tanpa margin-left:auto & align-self → pindah ke parent */ }
  .book:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
```

### `components/booking/BookingModal.astro`

```astro
---
import { SITE } from '@/lib/site';
---
<dialog id="booking-dialog" aria-labelledby="booking-title">
  <div class="modal">
    <div class="modal-header">
      <div>
        <span class="eyebrow">Cave of Chi / Booking</span>
        <h2 id="booking-title">Reserve your moment.</h2>
      </div>
      <button type="button" class="close-modal" data-close aria-label="Tutup">×</button>
    </div>

    <div class="modal-content">
      <form data-form>
        <div class="selected-class">
          <div>
            <span class="eyebrow">Your selected experience</span>
            <h3 data-bind="title"></h3>
            <p class="micro" data-bind="meta"></p>
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="bk-name">Nama lengkap</label>
            <input id="bk-name" name="name" type="text" autocomplete="name"
              placeholder="Nama kamu" required maxlength="80" />
          </div>
          <div class="field">
            <label for="bk-wa">Nomor WhatsApp</label>
            <input id="bk-wa" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel"
              placeholder="08xx xxxx xxxx" required pattern="[+0-9 \-]{8,18}" maxlength="18" />
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <span class="label" id="bk-qty-label">Jumlah peserta (maks. <span data-bind="seats"></span>)</span>
            <div class="qty-control" role="group" aria-labelledby="bk-qty-label">
              <button type="button" data-step="-1" aria-label="Kurangi peserta">−</button>
              <output data-qty>1</output>
              <button type="button" data-step="1" aria-label="Tambah peserta">+</button>
            </div>
          </div>
          <div class="field">
            <label for="bk-note">Catatan (opsional)</label>
            <input id="bk-note" name="note" maxlength="100" placeholder="Hal yang perlu kami ketahui" />
          </div>
        </div>

        <div class="summary-box">
          <span>Total · <span data-bind="price"></span> / peserta</span>
          <strong data-bind="total"></strong>
        </div>

        <p class="form-error" role="alert" data-error hidden></p>
        <button class="submit-book" type="submit">
          {SITE.demo ? 'Simulasi reservasi ↗' : 'Kirim reservasi ↗'}
        </button>
        {SITE.demo && <p class="fineprint">Demo only. Data tidak dikirim atau diproses untuk pemesanan sungguhan.</p>}
      </form>

      <div class="success" data-success hidden>
        <div class="success-symbol" aria-hidden="true">✓</div>
        <div class="eyebrow">Reservasi diterima</div>
        <h3>See you soon, <span data-bind="first-name"></span>.</h3>
        <p>
          <strong data-bind="title"></strong> untuk <strong data-bind="qty"></strong> peserta,
          <span data-bind="meta"></span>.
        </p>
        <div class="success-code" data-bind="code"></div>
        <button type="button" data-close>Tutup</button>
      </div>
    </div>
  </div>
</dialog>

<style>
  dialog {
    padding: 0; border: 0; width: min(750px, calc(100% - 20px));
    max-height: 94vh; background: #f9f4ed; box-shadow: 0 30px 90px #150d0866;
  }
  dialog::backdrop { background: #201914a8; backdrop-filter: blur(7px); }
  /* .modal-header, .close-modal, .modal-content, .selected-class (tanpa img), .field*,
     .qty-control, .summary-box, .submit-book, .fineprint, .success* + media query */
  .form-error { color: #8a3b2e; font-size: 12px; margin: 12px 0 0; }
</style>

<script>
  import '@/scripts/booking-modal';
</script>
```

Perubahan dari versi lama: `<div class="modal-overlay">` menjadi `<dialog>` (Esc, focus trap, dan pengembalian fokus ditangani browser), thumbnail gambar di modal dibuang, dan `innerHTML` + `htmlEscape` diganti `textContent`.

### `src/scripts/booking-modal.ts`

```ts
import { createBooking, BookingError } from '@/lib/api/bookings';
import { formatIDR } from '@/lib/format';

const dialog = document.querySelector<HTMLDialogElement>('#booking-dialog');

if (dialog) {
  const form = dialog.querySelector<HTMLFormElement>('[data-form]')!;
  const success = dialog.querySelector<HTMLElement>('[data-success]')!;
  const qtyOut = dialog.querySelector<HTMLOutputElement>('[data-qty]')!;
  const errorBox = dialog.querySelector<HTMLElement>('[data-error]')!;
  const submitBtn = form.querySelector<HTMLButtonElement>('[type="submit"]')!;

  let current: { id: string; price: number; seats: number } | null = null;
  let qty = 1;

  const bind = (key: string, value: string) =>
    dialog.querySelectorAll(`[data-bind="${key}"]`).forEach((el) => (el.textContent = value));

  const render = () => {
    if (!current) return;
    qtyOut.value = String(qty);
    bind('total', formatIDR(qty * current.price));
  };

  // Buka: event delegation, jadi tombol di komponen mana pun otomatis bekerja
  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element).closest<HTMLElement>('[data-book]');
    if (!trigger) return;
    const { eventId, title, meta, price, seats } = trigger.dataset;
    current = { id: eventId!, price: Number(price), seats: Number(seats) };
    qty = 1;
    form.reset();
    form.hidden = false;
    success.hidden = true;
    errorBox.hidden = true;
    bind('title', title ?? '');
    bind('meta', meta ?? '');
    bind('price', formatIDR(current.price));
    bind('seats', String(current.seats));
    render();
    dialog.showModal();
  });

  dialog.addEventListener('click', (e) => {
    const t = e.target as Element;
    if (t === dialog || t.closest('[data-close]')) dialog.close(); // klik backdrop / tombol tutup
  });

  dialog.querySelectorAll<HTMLButtonElement>('[data-step]').forEach((b) =>
    b.addEventListener('click', () => {
      if (!current) return;
      qty = Math.max(1, Math.min(current.seats, qty + Number(b.dataset.step)));
      render();
    }),
  );

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!current || !form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();

    submitBtn.disabled = true;
    errorBox.hidden = true;
    try {
      const res = await createBooking({
        eventId: current.id,
        name,
        whatsapp: String(data.get('whatsapp') ?? '').trim(),
        quantity: qty,
        note: String(data.get('note') ?? '').trim() || undefined,
      });
      bind('first-name', name.split(' ')[0] || 'Friend');
      bind('qty', String(qty));
      bind('code', res.code);
      form.hidden = true;
      success.hidden = false;
    } catch (err) {
      errorBox.textContent =
        err instanceof BookingError ? err.message : 'Terjadi kendala. Coba lagi sebentar.';
      errorBox.hidden = false;
    } finally {
      submitBtn.disabled = false; // cegah double submit selama request berjalan
    }
  });
}
```

### `components/events/EventCard.astro`

```astro
---
import { Image } from 'astro:assets';
import BookButton from '@/components/booking/BookButton.astro';
import placeholder from '@/assets/images/placeholder.webp';
import type { CaveEvent } from '@/lib/events';
import { CATEGORIES, SPACES } from '@/lib/site';
import { formatDateShort, formatDuration, formatIDR, formatTime } from '@/lib/format';

interface Props { event: CaveEvent }
const { event } = Astro.props;
const d = event.data;
---
<article class="event-card" data-event-card data-category={d.category}>
  <div class="event-image">
    <Image src={d.imageUrl ?? placeholder} alt="" width={640} height={474} loading="lazy" />
    <span class="event-category">{CATEGORIES[d.category]}</span>
  </div>
  <div class="event-info">
    <div class="event-sub">{SPACES[d.space]} &nbsp; • &nbsp; {formatDuration(d.durationMinutes)}</div>
    <h3><a href={`/experiences/${event.id}`}>{d.title}</a></h3>
    <div class="event-details">
      <span>{formatDateShort(d.startsAt)} · {formatTime(d.startsAt)} WIB</span>
      <span data-seats-for={d.eventId}>{d.seatsLeft} seats left</span>
    </div>
    <div class="event-footer">
      <div class="event-price"><small>Starting from</small>{formatIDR(d.price)}</div>
      <BookButton event={event} />
    </div>
  </div>
</article>
<style>
  /* semua .event-* dari file lama (kecuali .event-grid) */
  .event-card[hidden] { display: none; }
  h3 a { color: inherit; }
</style>
```

Gambar dibuat dekoratif (`alt=""`) karena judul sudah ada di dekatnya. Judul menjadi link ke halaman detail, jadi `/experiences/[slug]` benar-benar terhubung.

### `components/events/EventBrowser.astro`

```astro
---
import EventCard from './EventCard.astro';
import type { CaveEvent } from '@/lib/events';
import { CATEGORIES } from '@/lib/site';
interface Props { events: CaveEvent[] }
const { events } = Astro.props;
---
<div data-event-browser>
  <div class="filter-row" role="group" aria-label="Filter kategori kelas">
    <button type="button" class="filter active" data-filter="all" aria-pressed="true">All experiences</button>
    {Object.entries(CATEGORIES).map(([key, label]) => (
      <button type="button" class="filter" data-filter={key} aria-pressed="false">{label}</button>
    ))}
  </div>
  <div class="event-grid">
    {events.map((e) => <EventCard event={e} />)}
  </div>
  <p class="empty-state" data-empty hidden={events.length > 0}>Belum ada kelas pada kategori ini.</p>
</div>

<style>/* .filter-row, .filter, .filter.active, .event-grid, .empty-state + media query */</style>

<script>
  document.querySelectorAll<HTMLElement>('[data-event-browser]').forEach((root) => {
    const buttons = root.querySelectorAll<HTMLButtonElement>('[data-filter]');
    const cards = root.querySelectorAll<HTMLElement>('[data-event-card]');
    const empty = root.querySelector<HTMLElement>('[data-empty]');
    buttons.forEach((btn) =>
      btn.addEventListener('click', () => {
        const f = btn.dataset.filter;
        buttons.forEach((b) => {
          const on = b === btn;
          b.classList.toggle('active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        let visible = 0;
        cards.forEach((c) => {
          const show = f === 'all' || c.dataset.category === f;
          c.hidden = !show;
          if (show) visible++;
        });
        if (empty) empty.hidden = visible > 0;
      }),
    );
  });
</script>
```

### `components/events/ExperiencesSection.astro`

```astro
---
import EventBrowser from './EventBrowser.astro';
import type { CaveEvent } from '@/lib/events';
interface Props { events: CaveEvent[]; showAllLink?: boolean }
const { events, showAllLink = false } = Astro.props;
---
<section class="section experiences" id="experiences">
  <div class="container">
    <div class="eyebrow">03 / Curated for curious souls</div>
    <div class="section-head">
      <div>
        <h2 class="heading">Find your <em class="script">ritual.</em></h2>
        <p>Pilih sesuatu yang ingin kamu coba. Tak perlu punya pengalaman sebelumnya.</p>
      </div>
      <span class="tag"><span class="dot"></span> All workshops are beginner friendly</span>
    </div>
    <EventBrowser events={events} />
    {showAllLink && <a class="see-all" href="/experiences">Lihat semua experiences →</a>}
  </div>
</section>
<style>
  .experiences { background: var(--paper); padding-bottom: 120px; }
  .see-all { display: inline-block; margin-top: 28px; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; }
</style>
```

### `components/schedule/ScheduleCalendar.astro`

```astro
---
import BookButton from '@/components/booking/BookButton.astro';
import { groupByDay, type CaveEvent } from '@/lib/events';
import { SPACES } from '@/lib/site';
import { formatDayNumber, formatIDR, formatMonthRange, formatTime, formatWeekday } from '@/lib/format';

interface Props { events: CaveEvent[] }
const { events } = Astro.props;
const days = groupByDay(events);
const range = events.length
  ? formatMonthRange(events[0].data.startsAt, events[events.length - 1].data.startsAt)
  : '';
---
<div class="calendar-card" data-schedule>
  <div class="calendar-top"><strong>{range || 'Jadwal'}</strong></div>
  {days.length === 0 ? (
    <p class="agenda-empty">Belum ada kelas terjadwal.</p>
  ) : (
    <>
      <div class="calendar-pills" role="group" aria-label="Pilih tanggal kelas">
        {days.map(([key, items], i) => (
          <button type="button" class:list={['date-pill', { active: i === 0 }]}
            data-date={key} aria-pressed={String(i === 0)}>
            <small>{formatWeekday(items[0].data.startsAt)}</small>
            <strong>{formatDayNumber(items[0].data.startsAt)}</strong>
          </button>
        ))}
      </div>
      {days.map(([key, items], i) => (
        <div class="agenda" data-agenda={key} hidden={i !== 0}>
          {items.map((e) => (
            <div class="agenda-item">
              <span class="time">{formatTime(e.data.startsAt)} WIB</span>
              <div>
                <strong>{e.data.title}</strong>
                <small>{SPACES[e.data.space]} · {formatIDR(e.data.price)}</small>
              </div>
              <div class="agenda-action"><BookButton event={e} variant="outline">Book ↗</BookButton></div>
            </div>
          ))}
        </div>
      ))}
    </>
  )}
</div>

<style>
  /* .calendar-*, .date-pill, .agenda, .agenda-item (+ .time/strong/small), .agenda-empty */
  .agenda-action { margin-left: auto; }
</style>

<script>
  document.querySelectorAll<HTMLElement>('[data-schedule]').forEach((root) => {
    const pills = root.querySelectorAll<HTMLButtonElement>('[data-date]');
    const panels = root.querySelectorAll<HTMLElement>('[data-agenda]');
    pills.forEach((pill) =>
      pill.addEventListener('click', () => {
        pills.forEach((p) => {
          const on = p === pill;
          p.classList.toggle('active', on);
          p.setAttribute('aria-pressed', String(on));
        });
        panels.forEach((panel) => (panel.hidden = panel.dataset.agenda !== pill.dataset.date));
      }),
    );
  });
</script>
```

Kalender dirender saat build (agenda per tanggal sudah ada di HTML, tinggal di-toggle). Jadi tidak ada `innerHTML`, scoped CSS tetap berlaku, dan tidak ada risiko XSS.

### `components/faq/FaqList.astro` + `data/faq.ts`

```ts
// src/data/faq.ts — salin 4 Q&A dari file lama.
// ⚠ Jawaban "pembayaran" dan "private class" masih berbunyi "prototype/dummy": WAJIB ditulis ulang
// saat booking asli aktif, kalau tidak situsmu bilang "belum bisa bayar" padahal bisa.
export const FAQ = [
  { q: 'Apakah pemula boleh ikut kelas?', a: 'Tentu. Mayoritas workshop dirancang ramah pemula. Fasilitator akan membimbing langkah demi langkah.' },
  // ...
] as const;
```

```astro
---
import { FAQ } from '@/data/faq';
---
<div class="faq-list">
  {FAQ.map((item, i) => (
    <details open={i === 0}>
      <summary>{item.q}</summary>
      <p>{item.a}</p>
    </details>
  ))}
</div>
<style>/* .faq details, summary, summary:after, details[open], details p */</style>
```

---

## 7. Pages

### `pages/index.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Hero from '@/components/home/Hero.astro';
import Intro from '@/components/home/Intro.astro';
import StudiosShowcase from '@/components/home/StudiosShowcase.astro';
import RitualBand from '@/components/home/RitualBand.astro';
import CommunityBand from '@/components/home/CommunityBand.astro';
import ExperiencesSection from '@/components/events/ExperiencesSection.astro';
import { getUpcomingEvents } from '@/lib/events';
import { SITE } from '@/lib/site';

const events = await getUpcomingEvents(6);
---
<BaseLayout title="Cave of Chi — Art. Space. Energy." description={SITE.description} headerVariant="overlay">
  <Hero />
  <Intro />
  <StudiosShowcase />
  <ExperiencesSection events={events} showAllLink />
  <RitualBand />
  <CommunityBand />
</BaseLayout>
```

### `pages/experiences/index.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import PageHeader from '@/components/layout/PageHeader.astro';
import ExperiencesSection from '@/components/events/ExperiencesSection.astro';
import { getUpcomingEvents } from '@/lib/events';
const events = await getUpcomingEvents();
---
<BaseLayout title="Experiences — Cave of Chi" description="Semua workshop dan ritual mendatang di Cave of Chi.">
  <PageHeader eyebrow="Experiences" title="Find your ritual." description="Workshop kreatif, ritual healing, dan pertemuan komunitas." />
  <ExperiencesSection events={events} />
</BaseLayout>
```

### `pages/experiences/[slug].astro`

```astro
---
import { Image } from 'astro:assets';
import BaseLayout from '@/layouts/BaseLayout.astro';
import BookButton from '@/components/booking/BookButton.astro';
import placeholder from '@/assets/images/placeholder.webp';
import { getCollection } from 'astro:content';
import { CATEGORIES, SPACES } from '@/lib/site';
import { formatDateShort, formatDuration, formatIDR, formatTime } from '@/lib/format';

export async function getStaticPaths() {
  // Semua event (termasuk yang lewat): link yang pernah dibagikan tidak jadi 404.
  const events = await getCollection('events');
  return events.map((event) => ({ params: { slug: event.id }, props: { event } }));
}

const { event } = Astro.props;
const d = event.data;
const isPast = d.startsAt.getTime() < Date.now(); // snapshot saat build
const end = new Date(d.startsAt.getTime() + d.durationMinutes * 60_000);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: d.title,
  description: d.subtitle,
  startDate: d.startsAt.toISOString(),
  endDate: end.toISOString(),
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: { '@type': 'Place', name: SPACES[d.space] }, // tambahkan address kalau sudah ada
  offers: { '@type': 'Offer', price: d.price, priceCurrency: 'IDR' },
};
---
<BaseLayout title={`${d.title} — Cave of Chi`} description={d.subtitle}>
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
  </Fragment>

  <article class="section container detail">
    <a href="/experiences">← Semua experiences</a>
    <div class="eyebrow">{CATEGORIES[d.category]}</div>
    <h1 class="heading">{d.title}</h1>
    <p class="lead">{d.subtitle}</p>
    <Image src={d.imageUrl ?? placeholder} alt={`Suasana ${d.title}`} width={1100} height={620} loading="eager" />

    <dl class="facts">
      <div><dt>Kapan</dt><dd>{formatDateShort(d.startsAt)} · {formatTime(d.startsAt)} WIB</dd></div>
      <div><dt>Durasi</dt><dd>{formatDuration(d.durationMinutes)}</dd></div>
      <div><dt>Tempat</dt><dd>{SPACES[d.space]}</dd></div>
      <div><dt>Harga</dt><dd>{formatIDR(d.price)}</dd></div>
    </dl>

    {d.description?.split('\n\n').map((p) => <p>{p}</p>)}
    {d.included.length > 0 && (
      <>
        <h2>Sudah termasuk</h2>
        <ul>{d.included.map((i) => <li>{i}</li>)}</ul>
      </>
    )}

    {isPast
      ? <p class="micro">Event ini sudah berlangsung.</p>
      : <BookButton event={event} />}
  </article>
</BaseLayout>
<style>/* layout detail: gunakan token, max-width ~ 900px */</style>
```

### `pages/schedule.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import PageHeader from '@/components/layout/PageHeader.astro';
import ScheduleCalendar from '@/components/schedule/ScheduleCalendar.astro';
import { getUpcomingEvents } from '@/lib/events';
const events = await getUpcomingEvents();
---
<BaseLayout title="Schedule — Cave of Chi" description="Jadwal workshop dan ritual Cave of Chi.">
  <PageHeader eyebrow="Upcoming gatherings" title="Save your seat."
    description="Setiap pertemuan dibuat kecil dan personal. Pilih tanggal dan lihat kelas yang bisa kamu ikuti." />
  <section class="section container"><ScheduleCalendar events={events} /></section>
</BaseLayout>
```

### Halaman lain

- **`pages/about.astro`**: `BaseLayout` + `PageHeader` + `Intro` + `RitualBand` + `CommunityBand`.
- **`pages/faq.astro`**: `BaseLayout` + `PageHeader` + `FaqList` (dalam `.container`).
- **`pages/404.astro`**: `BaseLayout` dengan `noindex`, satu `h1`, link balik ke `/`.

`src/pages/robots.txt.ts` membuat `robots.txt` dan menyertakan sitemap ketika `SITE_URL` diatur:

```
User-agent: *
Allow: /
```

---

## 8. Peta CSS lama → komponen baru

| Selector di file lama | Pindah ke |
|---|---|
| `:root { ... }` | `styles/tokens.css` |
| `*`, `html`, `body`, `button/input/select`, `a`, `img`, `::selection`, `.grain`, `@media (prefers-reduced-motion)` | `styles/base.css` |
| `.container .section .eyebrow .micro .heading .script .tag .dot .section-head` | `styles/utilities.css` |
| `.top-note` | `AnnouncementBar` |
| `.brand*` | `Brand` |
| `.header .nav* .nav-book .menu-btn` | `SiteHeader` |
| `.hero*`, `.cta-light`, `.scroll-indicator` | `Hero` |
| `.intro*` | `Intro` |
| `.studios`, `.studio-*`, `.circle-arrow` | `StudiosShowcase` |
| `.experiences` | `ExperiencesSection` |
| `.filter-row .filter .event-grid .empty-state` | `EventBrowser` |
| `.event-card .event-image .event-category .event-info .event-sub .event-details .event-footer .event-price` | `EventCard` |
| `.book-small`, `.agenda-item button` | `BookButton` |
| `.schedule*`, `.calendar-*`, `.date-pill`, `.agenda*` | `ScheduleCalendar` / halaman schedule |
| `.ritual*` | `RitualBand` |
| `.community*` | `CommunityBand` |
| `.faq*` | `FaqList` + halaman faq |
| `.footer*` | `SiteFooter` |
| `.demo-badge` | `DemoBadge` |
| `.modal-overlay` | dihapus, diganti `dialog` + `dialog::backdrop` di `BookingModal` |
| `.modal* .field* .qty-control .summary-box .submit-book .fineprint .success*` | `BookingModal` |

Aturan saat memindahkan:

- Media query ikut ke komponen pemiliknya.
- Selector yang menembus komponen anak (contoh `.footer .brand-name`) tidak akan jalan karena scoped CSS. Itu sebabnya `Brand` punya prop `size`.
- Tambahkan `.event-card[hidden] { display: none; }` karena `hidden` bisa kalah oleh `display` dari CSS komponen. `base.css` sudah punya fallback `[hidden]`.

---

## 9. Opsional: sisa kursi live

Saat ini `seatsLeft` merupakan snapshot pada saat build melalui `/public/events`. Jika perlu
angka kursi real-time tanpa rebuild, tambahkan endpoint availability terpisah dan tangani
kegagalannya secara eksplisit. Keputusan final soal kuota tetap harus dibuat oleh API booking.

---

## 10. Urutan kerja untuk Copilot

Beri satu fase per sesi (Agent mode). Contoh prompt:

> Kerjakan Fase 3 saja dari #file:docs/MIGRATION.md. Ikuti #file:.github/copilot-instructions.md. Berhenti setelah `npm run check` dan `npm run build` lulus.

| Fase | Isi | Selesai kalau |
|---|---|---|
| 0 | Scaffold, config, `.env.example`, copilot-instructions, taruh gambar di `src/assets/images/` | `npm run dev` jalan |
| 1 | `tokens/base/utilities.css`, font `@fontsource` | Font & warna sama dengan lama |
| 2 | `BaseLayout`, `AnnouncementBar`, `Brand`, `SiteHeader`, `SiteFooter`, `DemoBadge` | Header/footer tampil, menu mobile jalan |
| 3 | `lib/site`, `format`, `api/*`, `content.config.ts`, `lib/events` (pakai mock) | `getUpcomingEvents()` mengembalikan data, build gagal jelas kalau schema salah |
| 4 | `Hero`, `Intro`, `StudiosShowcase`, `RitualBand`, `CommunityBand` + `data/*` | Beranda mirip lama (tanpa event/kalender) |
| 5 | `EventCard`, `EventBrowser`, `ExperiencesSection`, `/experiences`, `/experiences/[slug]` | Filter jalan, 3 kategori, detail page ter-generate |
| 6 | `ScheduleCalendar`, `/schedule` | Ganti tanggal menampilkan agenda yang benar |
| 7 | `BookButton`, `BookingModal`, `booking-modal.ts`, (opsional) `availability.ts` | Buka/tutup dengan Esc & klik backdrop, fokus kembali ke tombol, validasi & error tampil |
| 8 | `about`, `faq`, `404`, sitemap, robots, OG image, JSON-LD | `sitemap-index.xml` ada, tiap halaman punya canonical & satu `h1` |
| 9 | Sambungkan API asli: isi `toEvent()`, set env, matikan demo, tulis ulang FAQ pembayaran | Build production lulus tanpa mock |
| 10 | QA: `astro check`, Lighthouse (target ≥90 semua), tes keyboard, tes 375px | Tidak ada regresi visual |

---

## 11. Temuan di HTML lama yang diperbaiki

- **Gambar belum terlampir.** `assets/*.webp` (petra, white, sound, ikebana, terrazzo, candle) dirujuk tapi filenya tidak ada di HTML. Di Astro masuk `src/assets/` supaya dioptimasi otomatis. Pastikan filenya ada.
- **`onclick=""` inline** diganti event delegation.
- **Event card hanya menampilkan 6 dari 8 event** (`.slice(0, 6)`), jadi 2 event tak pernah tampil di grid.
- **Gambar dipakai ulang** (`candle` untuk Matcha, `sound` untuk Energy Reading, `ikebana` untuk Flower & Friends), jadi kartu berbeda tampil identik. Siapkan foto sendiri per event.
- **Google Fonts dari CDN** diganti self-host. Manrope sebelumnya dimuat tapi tidak terpakai.
- **Tanggal event hardcoded** (Okt–Nov 2026) akan basi sendiri. Content Collections + filter "mendatang" menyelesaikannya.
- **Aksesibilitas modal** (focus trap, kembalikan fokus saat ditutup) ditangani `<dialog>`.

---

## 12. Yang masih perlu kamu putuskan

1. **Kontrak API.** Data situs memakai `GET /public/events` dan `GET /public/studios` tanpa token. Endpoint booking browser di `bookings.ts` tetap perlu disesuaikan dengan API booking aktif.
2. **Foto event.** Tiap event dapat menyediakan `imageUrl` dari sistem; jika kosong, situs tidak menampilkan gambar pengganti lokal.
3. **SSR dan biaya request.** Data event/studio diambil ulang dari backend setiap request halaman; dampak biaya bergantung pada trafik dan biaya server/backend. Tidak ada deploy hook untuk perubahan konten.
4. **Anti-spam booking.** Endpoint publik biasanya butuh rate limit dan CAPTCHA (misalnya Turnstile) di sisi sistemmu.
5. **Domain dan OG image.** Isi `SITE_URL` di environment deploy dan ganti `public/og-default.svg` dengan OG image final. Tanpa itu canonical dan sitemap tidak dibuat.
