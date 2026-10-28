export interface PublicBookingSession {
  sessionId: string;
  startsAt: string;
  durationMinutes: number;
  price: number;
  seatsLeft: number;
  studioSlug: string;
  studioName: string;
  registrationOpensAt: string | null;
  registrationClosesAt: string | null;
  isBookable: boolean;
  salesStatus: "coming_soon" | "open" | "sold_out" | "closed";
}

export interface PublicBookingEvent {
  slug: string;
  title: string;
  status: "draft" | "published" | "closed" | "archived";
  sessions: PublicBookingSession[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function isPublicBookingSession(
  value: unknown,
): value is PublicBookingSession {
  if (!isRecord(value)) return false;

  return (
    typeof value.sessionId === "string" &&
    typeof value.startsAt === "string" &&
    typeof value.durationMinutes === "number" &&
    typeof value.price === "number" &&
    typeof value.seatsLeft === "number" &&
    typeof value.studioSlug === "string" &&
    typeof value.studioName === "string" &&
    isNullableString(value.registrationOpensAt) &&
    isNullableString(value.registrationClosesAt) &&
    typeof value.isBookable === "boolean" &&
    ["coming_soon", "open", "sold_out", "closed"].includes(
      String(value.salesStatus),
    )
  );
}

function isPublicBookingEvent(value: unknown): value is PublicBookingEvent {
  return (
    isRecord(value) &&
    typeof value.slug === "string" &&
    typeof value.title === "string" &&
    ["draft", "published", "closed", "archived"].includes(
      String(value.status),
    ) &&
    Array.isArray(value.sessions) &&
    value.sessions.every(isPublicBookingSession)
  );
}

export function parsePublicBookingEvents(
  value: unknown,
): PublicBookingEvent[] {
  if (!Array.isArray(value)) {
    throw new Error("[booking] Respons event publik harus berupa array.");
  }

  return value.map((event) => {
    if (!isPublicBookingEvent(event)) {
      throw new Error("[booking] Respons event publik tidak sesuai kontrak.");
    }

    return event;
  });
}
