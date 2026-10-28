import type { Locale } from "@/i18n";
import {
  formatRupiah,
  formatTime as formatLocalizedTime,
} from "@/i18n";

const TZ = "Asia/Jakarta";
const INTL_LOCALE: Record<Locale, string> = { id: "id-ID", en: "en-US" };

export const formatIDR = (amount: number, locale: Locale = "id") =>
  formatRupiah(locale, amount);

export const formatDateShort = (d: Date, locale: Locale = "id") =>
  new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", {
    timeZone: TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(d);

export const formatTime = (d: Date, locale: Locale = "id") =>
  formatLocalizedTime(locale, d);

export const formatWeekday = (d: Date, locale: Locale = "id") =>
  new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", { timeZone: TZ, weekday: "short" }).format(
    d,
  );

export const formatDayNumber = (d: Date, locale: Locale = "id") =>
  new Intl.DateTimeFormat(INTL_LOCALE[locale], { timeZone: TZ, day: "numeric" }).format(d);

/** Kunci hari YYYY-MM-DD di zona Jakarta (untuk grouping kalender) */
export const dayKey = (d: Date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);

export function getDurationParts(minutes: number) {
  return {
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60,
  };
}

export function formatMonthRange(a: Date, b: Date, locale: Locale = "id") {
  const month = (d: Date) =>
    new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", { timeZone: TZ, month: "long" }).format(d);
  const year = (date: Date) =>
    new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", {
      timeZone: TZ,
      year: "numeric",
    }).format(date);
  return month(a) === month(b) && year(a) === year(b)
    ? `${month(a)} ${year(a)}`
    : `${month(a)} ${year(a)} – ${month(b)} ${year(b)}`;
}
