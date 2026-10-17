const TZ = "Asia/Jakarta";

export const formatIDR = (v: number) =>
  "Rp " + new Intl.NumberFormat("id-ID").format(v);

export const formatSeatsLeft = (seats: number) => `Sisa ${seats} kursi`;

export const formatDateShort = (d: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    timeZone: TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(d);

export const formatTime = (d: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .format(d)
    .replace(".", ":");

export const formatWeekday = (d: Date) =>
  new Intl.DateTimeFormat("id-ID", { timeZone: TZ, weekday: "short" }).format(
    d,
  );

export const formatDayNumber = (d: Date) =>
  new Intl.DateTimeFormat("id-ID", { timeZone: TZ, day: "numeric" }).format(d);

/** Kunci hari YYYY-MM-DD di zona Jakarta (untuk grouping kalender) */
export const dayKey = (d: Date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);

export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) return `${minutes} menit`;
  if (remainingMinutes === 0) return `${hours} jam`;
  return `${hours} jam ${remainingMinutes} menit`;
};

export function formatMonthRange(a: Date, b: Date) {
  const month = (d: Date) =>
    new Intl.DateTimeFormat("id-ID", { timeZone: TZ, month: "long" }).format(d);
  const year = (date: Date) =>
    new Intl.DateTimeFormat("id-ID", {
      timeZone: TZ,
      year: "numeric",
    }).format(date);
  return month(a) === month(b) && year(a) === year(b)
    ? `${month(a)} ${year(a)}`
    : `${month(a)} ${year(a)} – ${month(b)} ${year(b)}`;
}
