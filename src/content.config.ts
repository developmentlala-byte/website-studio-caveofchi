import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { fetchEvents } from "@/lib/api/events";

const events = defineCollection({
  loader: async () => {
    const raw = await fetchEvents();
    return raw.map((e) => ({ ...e, id: e.slug })); // id entry = slug → URL detail
  },
  // Validasi di sini: data API yang bentuknya salah akan menggagalkan build dengan pesan jelas.
  schema: z.object({
    eventId: z.string(), // ID di sistemmu (dipakai untuk booking)
    slug: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string().optional(),
    category: z.enum(["creative", "wellness", "social"]).nullable().optional(),
    space: z.string().min(1),
    studioName: z.string().min(1),
    price: z.number().int().nonnegative(),
    startsAt: z.coerce.date(),
    durationMinutes: z.number().int().positive(),
    capacity: z.number().int().positive(),
    seatsLeft: z.number().int().nonnegative(),
    imageUrl: z.url({ protocol: /^https?$/ }).optional(),
    images: z.array(z.object({
      url: z.url({ protocol: /^https?$/ }),
      altText: z.string().nullable(),
      sortOrder: z.number().int().nonnegative(),
    })).default([]),
    included: z.array(z.string()).default([]),
    sessions: z.array(z.object({
      sessionId: z.string(),
      startsAt: z.coerce.date(),
      durationMinutes: z.number().int().positive(),
      price: z.number().int().nonnegative(),
      capacity: z.number().int().positive(),
      seatsLeft: z.number().int().nonnegative(),
      space: z.string().min(1),
      studioName: z.string().min(1),
    })).default([]),
  }),
});

export const collections = { events };
