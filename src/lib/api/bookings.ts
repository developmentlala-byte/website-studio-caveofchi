const API_URL = import.meta.env.PUBLIC_API_URL?.replace(/\/+$/, "");

export interface BookingInput {
  sessionId: string;
  name: string;
  whatsapp: string;
  quantity: number;
  idempotencyKey: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface BookingResult {
  code: string;
  bookingStatus: string;
  paymentStatus: string;
  totalAmount: number;
  holdExpiresAt: string | null;
  paymentUrl: string;
}

export interface BookingStatus {
  code: string;
  eventName: string;
  studioName: string;
  startsAt: string;
  unitPrice: number;
  quantity: number;
  totalAmount: number;
  bookingStatus: string;
  paymentStatus: string;
  holdExpiresAt: string | null;
}

export class BookingError extends Error {
  constructor(message: string, readonly code?: string) {
    super(message);
  }
}

export function bookingReceiptUrl(code: string): string {
  return `${getApiUrl()}/public/event-bookings/${encodeURIComponent(code)}/receipt`;
}

function getApiUrl(): string {
  if (!API_URL) {
    throw new BookingError("Reservasi belum tersedia. Silakan hubungi Cave of Chi.");
  }

  return API_URL;
}

function requestHeaders(jsonBody = false): Headers {
  const headers = new Headers({ Accept: "application/json" });
  if (jsonBody) headers.set("Content-Type", "application/json");
  if (new URL(getApiUrl()).hostname.endsWith(".ngrok-free.dev")) {
    headers.set("ngrok-skip-browser-warning", "true");
  }
  return headers;
}

async function responseMessage(response: Response): Promise<{ message: string; code?: string }> {
  const payload: unknown = await response.json().catch(() => null);
  if (
    typeof payload === "object" &&
    payload !== null &&
    "message" in payload &&
    typeof payload.message === "string"
  ) {
    return {
      message: payload.message,
      code: "code" in payload && typeof payload.code === "string" ? payload.code : undefined,
    };
  }

  return { message: "Permintaan booking tidak dapat diproses." };
}

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  const response = await fetch(`${getApiUrl()}/public/event-bookings`, {
    method: "POST",
    headers: requestHeaders(true),
    body: JSON.stringify({
      session_id: input.sessionId,
      customer_name: input.name,
      customer_phone: input.whatsapp,
      quantity: input.quantity,
      idempotency_key: input.idempotencyKey,
      return_url: input.returnUrl,
      cancel_url: input.cancelUrl,
    }),
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    const error = await responseMessage(response);
    throw new BookingError(error.message, error.code);
  }

  const payload: unknown = await response.json();
  if (
    typeof payload !== "object" ||
    payload === null ||
    !("success" in payload) ||
    payload.success !== true ||
    !("data" in payload) ||
    typeof payload.data !== "object" ||
    payload.data === null ||
    !("booking_code" in payload.data) ||
    typeof payload.data.booking_code !== "string" ||
    !("booking_status" in payload.data) ||
    typeof payload.data.booking_status !== "string" ||
    !("payment_status" in payload.data) ||
    typeof payload.data.payment_status !== "string" ||
    !("total_amount" in payload.data) ||
    typeof payload.data.total_amount !== "number" ||
    !("hold_expires_at" in payload.data) ||
    (typeof payload.data.hold_expires_at !== "string" &&
      payload.data.hold_expires_at !== null) ||
    !("payment_url" in payload.data) ||
    typeof payload.data.payment_url !== "string"
  ) {
    throw new BookingError("Respons server booking tidak valid.");
  }

  const paymentUrl = new URL(payload.data.payment_url);
  const validHosts = ["app.midtrans.com", "app.sandbox.midtrans.com"];
  if (paymentUrl.protocol !== "https:" || !validHosts.includes(paymentUrl.hostname)) {
    throw new BookingError("Tautan pembayaran Midtrans tidak valid.");
  }

  return {
    code: payload.data.booking_code,
    bookingStatus: payload.data.booking_status,
    paymentStatus: payload.data.payment_status,
    totalAmount: payload.data.total_amount,
    holdExpiresAt: payload.data.hold_expires_at,
    paymentUrl: paymentUrl.toString(),
  };
}

export async function fetchBookingStatus(code: string): Promise<BookingStatus> {
  const response = await fetch(
    `${getApiUrl()}/public/event-bookings/${encodeURIComponent(code)}`,
    {
      headers: requestHeaders(),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!response.ok) {
    const error = await responseMessage(response);
    throw new BookingError(error.message, error.code);
  }

  const payload: unknown = await response.json();
  if (
    typeof payload !== "object" ||
    payload === null ||
    !("success" in payload) ||
    payload.success !== true ||
    !("data" in payload) ||
    typeof payload.data !== "object" ||
    payload.data === null
  ) {
    throw new BookingError("Respons status booking tidak valid.");
  }

  const data = payload.data;
  if (
    !("booking_code" in data) ||
    typeof data.booking_code !== "string" ||
    !("event_name" in data) ||
    typeof data.event_name !== "string" ||
    !("session_studio" in data) ||
    typeof data.session_studio !== "string" ||
    !("session_starts_at" in data) ||
    typeof data.session_starts_at !== "string" ||
    !("unit_price" in data) ||
    typeof data.unit_price !== "number" ||
    !("quantity" in data) ||
    typeof data.quantity !== "number" ||
    !("total_amount" in data) ||
    typeof data.total_amount !== "number" ||
    !("booking_status" in data) ||
    typeof data.booking_status !== "string" ||
    !("payment_status" in data) ||
    typeof data.payment_status !== "string" ||
    !("hold_expires_at" in data) ||
    (typeof data.hold_expires_at !== "string" && data.hold_expires_at !== null)
  ) {
    throw new BookingError("Respons status booking tidak lengkap.");
  }

  return {
    code: data.booking_code,
    eventName: data.event_name,
    studioName: data.session_studio,
    startsAt: data.session_starts_at,
    unitPrice: data.unit_price,
    quantity: data.quantity,
    totalAmount: data.total_amount,
    bookingStatus: data.booking_status,
    paymentStatus: data.payment_status,
    holdExpiresAt: data.hold_expires_at,
  };
}
