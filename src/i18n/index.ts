import type { Locale } from "./define";

export {
  createT,
  defineMessages,
  LOCALES,
  toLocale,
  type Locale,
} from "./define";

export function localizedPath(locale: Locale, input: string): string {
  const [pathname = "/", ...suffix] = input.split(/(?=[?#])/);
  const base = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const localized = locale === "en" ? `/en${base === "/" ? "" : base}` : base;

  return `${localized}${suffix.join("")}`;
}

const INTL_LOCALE: Record<Locale, string> = {
  id: "id-ID",
  en: "en-US",
};

export function formatDate(
  locale: Locale,
  date: Date | string,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    ...(options?.dateStyle || options?.timeStyle ? {} : { dateStyle: "full" }),
    timeZone: "Asia/Jakarta",
    ...options,
  }).format(new Date(date));
}

export function formatTime(locale: Locale, date: Date | string): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
    hour12: false,
  }).format(new Date(date));
}

export function formatRupiah(locale: Locale, amount: number): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
