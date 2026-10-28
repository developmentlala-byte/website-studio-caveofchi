import {
  fetchPublicCollection,
  resolvePublicAssetUrl,
} from "@/lib/api/public";
import type {
  PublicBookingEvent,
  PublicBookingSession,
} from "@/lib/api/booking-events";

const API_URL = import.meta.env.PUBLIC_API_URL?.replace(/\/+$/, "");

export type RawEvent = { slug: string } & Record<string, unknown>;

export interface PublicEventImage {
  url: string;
  altText: string | null;
  sortOrder: number;
}

export interface PublicSessionAvailability {
  sessionId: string;
  seatsLeft: number;
}

export async function fetchPublicBookingEvents(): Promise<PublicBookingEvent[]> {
  const events = await fetchPublicCollection("events", { cache: "no-store" });

  return events.map((value): PublicBookingEvent => {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new Error("[events] Data event publik harus berupa object.");
    }
    const event = value as Record<string, unknown>;
    if (
      typeof event.slug !== "string" ||
      event.slug.trim() === "" ||
      typeof event.title !== "string" ||
      event.title.trim() === "" ||
      !["draft", "published", "closed", "archived"].includes(
        String(event.status),
      ) ||
      !Array.isArray(event.sessions)
    ) {
      throw new Error("[events] Sesi event publik harus berupa array.");
    }

    const sessions = event.sessions.map((session): PublicBookingSession => {
      if (typeof session !== "object" || session === null || Array.isArray(session)) {
        throw new Error("[events] Data sesi event publik harus berupa object.");
      }
      const item = session as Record<string, unknown>;
      const startsAt = typeof item.startsAt === "string" ? Date.parse(item.startsAt) : NaN;
      const registrationOpensAt =
        item.registrationOpensAt === null
          ? null
          : typeof item.registrationOpensAt === "string" &&
              Number.isFinite(Date.parse(item.registrationOpensAt))
            ? item.registrationOpensAt
            : undefined;
      const registrationClosesAt =
        item.registrationClosesAt === null
          ? null
          : typeof item.registrationClosesAt === "string" &&
              Number.isFinite(Date.parse(item.registrationClosesAt))
            ? item.registrationClosesAt
            : undefined;
      if (
        typeof item.sessionId !== "string" ||
        !/^\d+$/.test(item.sessionId) ||
        !Number.isFinite(startsAt) ||
        typeof item.durationMinutes !== "number" ||
        !Number.isInteger(item.durationMinutes) ||
        item.durationMinutes < 1 ||
        typeof item.price !== "number" ||
        !Number.isInteger(item.price) ||
        item.price < 0 ||
        typeof item.seatsLeft !== "number" ||
        !Number.isInteger(item.seatsLeft) ||
        item.seatsLeft < 0 ||
        typeof item.space !== "string" ||
        item.space.trim() === "" ||
        typeof item.studioName !== "string" ||
        item.studioName.trim() === "" ||
        registrationOpensAt === undefined ||
        registrationClosesAt === undefined ||
        typeof item.isBookable !== "boolean" ||
        !["coming_soon", "open", "sold_out", "closed"].includes(
          String(item.salesStatus),
        )
      ) {
        throw new Error("[events] Data sesi publik tidak sesuai kontrak.");
      }

      return {
        sessionId: item.sessionId,
        startsAt: item.startsAt as string,
        durationMinutes: item.durationMinutes,
        price: item.price,
        seatsLeft: item.seatsLeft,
        studioSlug: item.space,
        studioName: item.studioName,
        registrationOpensAt,
        registrationClosesAt,
        isBookable: item.isBookable,
        salesStatus: item.salesStatus as PublicBookingSession["salesStatus"],
      };
    });

    return {
      slug: event.slug,
      title: event.title,
      status: event.status as PublicBookingEvent["status"],
      sessions,
    };
  }).filter((event) => event.status !== "closed");
}

export async function fetchPublicSessionAvailability(): Promise<PublicSessionAvailability[]> {
  const events = await fetchPublicBookingEvents();
  return events.flatMap((event) =>
    event.sessions.map(({ sessionId, seatsLeft }) => ({ sessionId, seatsLeft })),
  );
}

function toEvent(value: unknown): RawEvent {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("[events] Setiap event API harus berupa object.");
  }

  const event = value as Record<string, unknown>;
  if (typeof event.slug !== "string" || event.slug.trim() === "") {
    throw new Error("[events] Setiap event API harus memiliki slug.");
  }

  const normalized: Record<string, unknown> = {
    ...event,
    slug: event.slug,
  };

  const images = event.images ?? [];
  if (!Array.isArray(images)) {
    throw new Error("[events] Galeri gambar event API harus berupa array.");
  }
  normalized.images = images.map((image): PublicEventImage => {
    if (typeof image !== "object" || image === null || Array.isArray(image)) {
      throw new Error("[events] Setiap gambar event API harus berupa object.");
    }

    const item = image as Record<string, unknown>;
    if (
      typeof item.url !== "string" ||
      (item.alt_text !== null && typeof item.alt_text !== "string") ||
      typeof item.sort_order !== "number"
    ) {
      throw new Error("[events] Data galeri gambar event tidak sesuai kontrak.");
    }

    return {
      url: resolvePublicAssetUrl(item.url) ?? item.url,
      altText: item.alt_text,
      sortOrder: item.sort_order,
    };
  });

  if (event.imageUrl === null) {
    delete normalized.imageUrl;
  } else if (typeof event.imageUrl === "string") {
    normalized.imageUrl = resolvePublicAssetUrl(event.imageUrl);
  } else if ("imageUrl" in event) {
    throw new Error("[events] URL gambar event dari API harus berupa string.");
  }

  return { ...normalized, slug: event.slug };
}

export async function fetchEvents(): Promise<RawEvent[]> {
  if (!API_URL) {
    throw new Error(
      "PUBLIC_API_URL wajib diisi. Event tidak akan dimuat dari data demo.",
    );
  }

  return (await fetchPublicCollection("events", { cache: "no-store" })).map(
    toEvent,
  );
}
