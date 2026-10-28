# Panduan Multi-Bahasa di Astro (Best Practice)

Panduan ini disusun untuk setup Cave of Chi: bahasa default **Indonesia** tanpa prefix (`/about`), dan **Inggris** dengan prefix (`/en/about`).

## Prinsip

| Prinsip | Alasannya |
|---|---|
| Pakai **i18n routing bawaan Astro** | Locale terdeteksi otomatis lewat `Astro.currentLocale`, tidak perlu dioper manual lewat props. |
| **Satu halaman, dua URL** | Isi halaman ditulis sekali di `views/`, file di `pages/` hanya pembungkus tipis. |
| Teks **di samping komponennya** (`X.messages.ts`) | Menghapus atau mengubah komponen ikut membawa teksnya. |
| **Kunci semantik** (`hero.title`), bukan kalimat | Mengubah copy tidak merusak kunci. |
| Satu entri **`{ id, en }`** | Tidak mungkin tertukar, dan TypeScript error kalau salah satunya kosong. |
| **Tanggal dan angka lewat `Intl`** | Format otomatis sesuai bahasa, tidak ditulis manual. |
| **SEO per bahasa** | `lang`, `hreflang`, canonical, dan sitemap. |

## 1. Konfigurasi `astro.config.mjs`

```js
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://caveofchi.com", // ganti dengan domain asli, wajib untuk sitemap & hreflang
  i18n: {
    defaultLocale: "id",
    locales: ["id", "en"],
    routing: {
      prefixDefaultLocale: false, // id: /about, en: /en/about
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "id",
        locales: { id: "id-ID", en: "en-US" },
      },
    }),
  ],
});
```

## 2. Struktur folder

```
src/
  i18n/
    define.ts        ← tipe & defineMessages
    common.ts        ← teks yang dipakai banyak komponen
    index.ts         ← createT, helper URL, helper format
  components/
    Hero.astro
    Hero.messages.ts
    LanguageSwitcher.astro
    Seo.astro
  views/             ← isi halaman (ditulis SEKALI)
    Home.astro
    EventDetail.astro
  pages/
    index.astro          ← id  (pembungkus tipis)
    events/[slug].astro
    en/
      index.astro        ← en  (pembungkus tipis)
      events/[slug].astro
```

Halaman di `pages/` hanya satu baris:

```astro
---
// src/pages/index.astro  DAN  src/pages/en/index.astro (isinya identik)
import Home from "../views/Home.astro"; // di en/: "../../views/Home.astro"
---
<Home />
```

Locale dibaca di dalam view lewat `Astro.currentLocale`, sehingga kedua file persis sama.

## 3. Inti i18n

**`src/i18n/define.ts`**

```ts
export type Locale = "id" | "en";
export const DEFAULT_LOCALE: Locale = "id";
export const LOCALES: Locale[] = ["id", "en"];

export type Entry = { id: string; en: string };
export type Messages = Record<string, Entry>;

export function defineMessages<const T extends Messages>(messages: T): T {
  return messages;
}

export function toLocale(value: string | undefined): Locale {
  return value === "en" ? "en" : "id";
}
```

**`src/i18n/common.ts`**

```ts
import { defineMessages } from "./define";

export const common = defineMessages({
  bookNow: { id: "Pesan sekarang ↗", en: "Book now ↗" },
  capacity: { id: "Kapasitas", en: "Capacity" },
  backHome: { id: "Kembali ke beranda", en: "Back to home" },
  viewDetails: { id: "Lihat detail", en: "View details" },
  seatsLeft: { id: "Sisa {seats} kursi", en: "{seats} spots left" },
  soldOut: { id: "Kuota habis", en: "Sold out" },
  tryAgain: { id: "Coba lagi", en: "Try again" },
});
```

**`src/i18n/index.ts`**

```ts
import { common } from "./common";
import { DEFAULT_LOCALE, toLocale, type Locale, type Messages } from "./define";

export { defineMessages, toLocale, LOCALES, DEFAULT_LOCALE, type Locale } from "./define";

type Params = Record<string, string | number>;

function interpolate(text: string, params?: Params): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (m, name: string) =>
    name in params ? String(params[name]) : m,
  );
}

/** t() per komponen: kunci komponen + kunci common, keduanya ter-autocomplete. */
export function createT<T extends Messages>(locale: Locale, messages: T) {
  const all: Messages = { ...common, ...messages };

  return (key: (keyof T | keyof typeof common) & string, params?: Params): string => {
    const entry = all[key];
    if (!entry) {
      if (import.meta.env.DEV) console.warn(`[i18n] kunci tidak ada: "${key}"`);
      return key;
    }
    return interpolate(entry[locale] || entry[DEFAULT_LOCALE], params);
  };
}

/** Ubah path ke versi bahasa tertentu: ("/en/about", "id") → "/about" */
export function localizedPath(locale: Locale, input: string): string {
  const [pathname = "/", ...suffix] = input.split(/(?=[?#])/);
  const base = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const out = locale === "en" ? `/en${base === "/" ? "" : base}` : base;
  return `${out}${suffix.join("")}`;
}

/** Tanggal & angka mengikuti bahasa, zona waktu tetap WIB. */
const INTL_LOCALE: Record<Locale, string> = { id: "id-ID", en: "en-US" };

export function formatDate(locale: Locale, date: Date | string, opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    dateStyle: "full",
    timeZone: "Asia/Jakarta",
    ...opts,
  }).format(new Date(date));
}

export function formatTime(locale: Locale, date: Date | string) {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
    hour12: false,
  }).format(new Date(date));
}

export function formatRupiah(locale: Locale, amount: number) {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
```

Jangan menulis `"Rp" + harga` atau memformat tanggal manual. Pakai `formatRupiah` dan `formatDate` supaya hasilnya konsisten di kedua bahasa.

## 4. Pola komponen

**`Hero.messages.ts`**

```ts
import { defineMessages } from "../i18n";

export const messages = defineMessages({
  title: {
    id: "Lebih dari sekadar kelas. Sebuah perjalanan.",
    en: "More than a class. A journey.",
  },
  cta: { id: "Lihat jadwal & pesan", en: "View schedule & book" },
});
```

**`Hero.astro`**

```astro
---
import { createT, toLocale } from "../i18n";
import { messages } from "./Hero.messages";

const locale = toLocale(Astro.currentLocale);
const t = createT(locale, messages);
---
<h1>{t("title")}</h1>
<a href="#schedule">{t("cta")}</a>
<a href="/book">{t("bookNow")}</a> <!-- dari common -->
```

Komponen tidak perlu menerima prop `locale`. Cukup baca `Astro.currentLocale`.

## 5. Language switcher

```astro
---
// src/components/LanguageSwitcher.astro
import { localizedPath, toLocale } from "../i18n";

const current = toLocale(Astro.currentLocale);
const { pathname, search } = Astro.url;
const items = [
  { code: "id", label: "ID", href: localizedPath("id", pathname + search) },
  { code: "en", label: "EN", href: localizedPath("en", pathname + search) },
] as const;
---
<nav aria-label={current === "en" ? "Language" : "Bahasa"}>
  {items.map((i) => (
    <a
      href={i.href}
      hreflang={i.code}
      lang={i.code}
      aria-current={i.code === current ? "true" : undefined}
    >{i.label}</a>
  ))}
</nav>
```

Pindah bahasa tetap berada di halaman yang sama (`/events/yoga` menjadi `/en/events/yoga`), bukan balik ke beranda.

## 6. SEO

```astro
---
// src/components/Seo.astro (taruh di <head> layout)
import { localizedPath, toLocale } from "../i18n";

interface Props { title: string; description: string }
const { title, description } = Astro.props;

const locale = toLocale(Astro.currentLocale);
const site = Astro.site!; // dari astro.config `site`
const url = (l: "id" | "en") => new URL(localizedPath(l, Astro.url.pathname), site).href;
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={url(locale)} />
<link rel="alternate" hreflang="id" href={url("id")} />
<link rel="alternate" hreflang="en" href={url("en")} />
<link rel="alternate" hreflang="x-default" href={url("id")} />
<meta property="og:locale" content={locale === "en" ? "en_US" : "id_ID"} />
<meta property="og:locale:alternate" content={locale === "en" ? "id_ID" : "en_US"} />
```

Di layout utama, atribut `lang` wajib mengikuti bahasa:

```astro
<html lang={Astro.currentLocale ?? "id"}>
```

Judul dan deskripsi tiap halaman juga lewat `t()`, jangan dibiarkan satu bahasa untuk kedua versi.

## 7. Teks dari database / API

Teks yang datang dari backend (nama studio, deskripsi, judul event) **tidak bisa** diterjemahkan lewat file `.messages.ts`. Pilihan terbaik:

1. **Kolom per bahasa**: `description` (id) dan `description_en`. Paling sederhana untuk 2 bahasa.
2. **Tabel terjemahan**: `studio_translations(studio_id, locale, name, description)`. Lebih rapi kalau bahasa akan bertambah.

Di frontend, buat satu helper supaya fallback-nya konsisten:

```ts
// src/i18n/localize.ts
import type { Locale } from "./define";

export function pick<T extends Record<string, any>>(
  row: T,
  field: string,
  locale: Locale,
): string {
  const localized = locale === "en" ? row[`${field}_en`] : null;
  return (localized || row[field] || "") as string; // kosong → jatuh ke bahasa default
}
// pemakaian: pick(studio, "description", locale)
```

## 8. Pitfall yang perlu dihindari

- **Menyambung kalimat**: `"Sisa " + n + " kursi"` rusak di bahasa lain karena urutan katanya berbeda. Pakai placeholder: `"Sisa {seats} kursi"`.
- **Teks dipakai sebagai kunci**: copy berubah, kunci ikut rusak, terjemahan hilang diam-diam. Pakai kunci semantik.
- **Meng-hardcode `/en/...` di link**: pakai `localizedPath(locale, "/events")`.
- **Island React/Vue**: kirim teks yang dibutuhkan lewat props (`<Booking client:load labels={...} />`). Jangan meng-import seluruh kamus ke bundle klien.
- **Redirect otomatis berdasarkan browser**: bisa mengganggu crawler dan pengguna. Lebih aman tampilkan switcher, atau sarankan bahasa lewat banner kecil.
- **Pluralisasi**: untuk kata benda yang berubah bentuk (Inggris `1 spot` / `2 spots`), pakai `Intl.PluralRules`. Bahasa Indonesia tidak punya bentuk jamak, jadi cukup satu teks.

## 9. Checklist sebelum rilis

- [ ] `astro.config.mjs` punya blok `i18n` dan `site`
- [ ] Setiap halaman ada di `pages/` dan `pages/en/` (pembungkus tipis ke `views/`)
- [ ] Tidak ada teks UI yang masih hardcode di komponen
- [ ] `npx astro check` bersih (entri `{ id, en }` yang tidak lengkap akan error)
- [ ] `<html lang>`, canonical, dan hreflang tampil benar di view-source kedua bahasa
- [ ] `/sitemap-index.xml` memuat versi `/en/`
- [ ] Switcher mempertahankan halaman yang sedang dibuka
- [ ] Tanggal dan harga memakai `formatDate` / `formatRupiah`
- [ ] Data dari API punya fallback ke bahasa default

## Migrasi dari `translate()` lama

1. Buat folder `src/i18n/` dengan `define.ts`, `common.ts`, `index.ts`.
2. Pindahkan file i18n lama menjadi `src/i18n/legacy.ts` dan re-export `translate` / `localizedPath` dari `index.ts`, sehingga situs tetap jalan.
3. Pindahkan komponen satu per satu: buat `X.messages.ts`, ganti `translate(locale, "...")` dengan `t("kunci")`.
4. Teks yang muncul di 2 komponen atau lebih dipindah ke `common.ts`.
5. Setelah semua komponen pindah, hapus `legacy.ts`.
