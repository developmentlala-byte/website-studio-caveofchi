//#region src/lib/format.ts
var TZ = "Asia/Jakarta";
var formatIDR = (v) => "Rp " + new Intl.NumberFormat("id-ID").format(v);
var formatSeatsLeft = (seats) => `Sisa ${seats} kursi`;
var formatDateShort = (d) => new Intl.DateTimeFormat("id-ID", {
	timeZone: TZ,
	weekday: "short",
	day: "numeric",
	month: "short"
}).format(d);
var formatTime = (d) => new Intl.DateTimeFormat("id-ID", {
	timeZone: TZ,
	hour: "2-digit",
	minute: "2-digit",
	hourCycle: "h23"
}).format(d).replace(".", ":");
var formatWeekday = (d) => new Intl.DateTimeFormat("id-ID", {
	timeZone: TZ,
	weekday: "short"
}).format(d);
var formatDayNumber = (d) => new Intl.DateTimeFormat("id-ID", {
	timeZone: TZ,
	day: "numeric"
}).format(d);
/** Kunci hari YYYY-MM-DD di zona Jakarta (untuk grouping kalender) */
var dayKey = (d) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);
var formatDuration = (minutes) => {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	if (hours === 0) return `${minutes} menit`;
	if (remainingMinutes === 0) return `${hours} jam`;
	return `${hours} jam ${remainingMinutes} menit`;
};
function formatMonthRange(a, b) {
	const month = (d) => new Intl.DateTimeFormat("id-ID", {
		timeZone: TZ,
		month: "long"
	}).format(d);
	const year = (date) => new Intl.DateTimeFormat("id-ID", {
		timeZone: TZ,
		year: "numeric"
	}).format(date);
	return month(a) === month(b) && year(a) === year(b) ? `${month(a)} ${year(a)}` : `${month(a)} ${year(a)} – ${month(b)} ${year(b)}`;
}
//#endregion
export { formatIDR as a, formatTime as c, formatDuration as i, formatWeekday as l, formatDateShort as n, formatMonthRange as o, formatDayNumber as r, formatSeatsLeft as s, dayKey as t };
