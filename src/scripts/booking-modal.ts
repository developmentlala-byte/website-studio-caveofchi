import { BookingError, createBooking } from "@/lib/api/bookings";
import {
  fetchPublicBookingEvents,
  type PublicBookingEvent,
  type PublicBookingSession,
} from "@/lib/api/events";
import { formatIDR } from "@/lib/format";
import { translate, type Locale } from "@/lib/i18n";

const dialog = document.querySelector<HTMLDialogElement>("#booking-dialog");
const locale: Locale = document.documentElement.lang === "en" ? "en" : "id";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

let refreshingAvailability = false;

const refreshSessionAvailability = async () => {
  if (refreshingAvailability) return;
  refreshingAvailability = true;
  try {
    const events = await fetchPublicBookingEvents();
    const sessions = events.flatMap((event) => event.sessions);
    for (const session of sessions) {
      document
        .querySelectorAll<HTMLButtonElement>(
          `[data-book][data-session-id="${session.sessionId}"]`,
        )
        .forEach((button) => {
          button.dataset.seats = String(session.seatsLeft);
          button.dataset.bookable = String(session.isBookable);
          button.disabled = session.seatsLeft === 0 || !session.isBookable;
          if (session.salesStatus === "sold_out" || session.seatsLeft === 0) {
            button.textContent = translate(locale, "Kuota habis");
          } else if (session.salesStatus === "coming_soon") {
            button.textContent = session.registrationOpensAt
              ? `${translate(locale, "Dibuka")} ${formatDate(session.registrationOpensAt)}`
              : translate(locale, "Segera dibuka");
          } else if (session.salesStatus === "closed") {
            button.textContent = translate(locale, "Pendaftaran ditutup");
          } else if (session.isBookable) {
            button.textContent =
              button.dataset.availableLabel ?? translate(locale, "Pesan sekarang ↗");
          }
        });
      document
        .querySelectorAll<HTMLElement>(
          `[data-seats-left="${session.sessionId}"]`,
        )
        .forEach((label) => {
          label.textContent =
            session.salesStatus === "sold_out" || session.seatsLeft === 0
              ? translate(locale, "Kuota habis")
              : session.salesStatus === "coming_soon"
                ? session.registrationOpensAt
                  ? `${translate(locale, "Dibuka")} ${formatDate(session.registrationOpensAt)}`
                  : translate(locale, "Penjualan segera dibuka")
                : session.salesStatus === "closed"
                  ? translate(locale, "Pendaftaran ditutup")
                  : `${session.seatsLeft} ${translate(locale, session.seatsLeft === 1 ? "spot" : "spots")} ${translate(locale, "tersisa")}`;
        });
    }
    document.dispatchEvent(
      new CustomEvent("booking-events-updated", { detail: events }),
    );
  } catch (error) {
    console.error("[booking] Gagal memperbarui sesi dari API publik.", error);
  } finally {
    refreshingAvailability = false;
  }
};

void refreshSessionAvailability();
window.setInterval(() => void refreshSessionAvailability(), 30_000);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    void refreshSessionAvailability();
  }
});

if (dialog) {
  const form = dialog.querySelector<HTMLFormElement>("[data-form]")!;
  const eventSearch = dialog.querySelector<HTMLInputElement>("[data-event-search]")!;
  const eventList = dialog.querySelector<HTMLElement>("[data-events]")!;
  const eventPagination = dialog.querySelector<HTMLElement>(
    "[data-event-pagination]",
  )!;
  const eventPrevious = dialog.querySelector<HTMLButtonElement>(
    "[data-event-previous]",
  )!;
  const eventNext = dialog.querySelector<HTMLButtonElement>(
    "[data-event-next]",
  )!;
  const eventPageLabel = dialog.querySelector<HTMLElement>(
    "[data-event-page]",
  )!;
  const eventsStatus = dialog.querySelector<HTMLElement>("[data-events-status]")!;
  const retryButton = dialog.querySelector<HTMLButtonElement>("[data-retry]")!;
  const sessionList = dialog.querySelector<HTMLElement>("[data-sessions]")!;
  const sessionCount = dialog.querySelector<HTMLElement>("[data-session-count]")!;
  const quantityInput = dialog.querySelector<HTMLInputElement>("#bk-qty")!;
  const errorBox = dialog.querySelector<HTMLElement>("[data-error]")!;
  const nextButton = dialog.querySelector<HTMLButtonElement>('[data-action="next"]')!;
  const confirmButton = dialog.querySelector<HTMLButtonElement>(
    '[data-action="confirm"]',
  )!;
  const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;

  let events: PublicBookingEvent[] = [];
  let currentEventSlug = "";
  let currentEventPage = 1;
  const eventPageSize = 5;
  let currentSessionId = "";
  let triggerEventSlug = "";
  let triggerStudioSlug = "";
  let triggerSessionId = "";
  let step = 1;
  let quantity = 1;
  let idempotencyKey = "";
  let previousAttempt = "";
  let isLoadingEvents = false;
  let isSubmitting = false;

  const bind = (key: string, value: string) => {
    dialog
      .querySelectorAll<HTMLElement>(`[data-bind="${key}"]`)
      .forEach((element) => {
        element.textContent = value;
      });
  };

  const selectedEvent = () =>
    events.find((event) => event.slug === currentEventSlug) ?? null;

  const selectedSession = () =>
    selectedEvent()?.sessions.find(
      (session) => session.sessionId === currentSessionId,
    ) ?? null;

  const bookableSessions = (event: PublicBookingEvent) =>
    event.sessions.filter(
      (session) => session.isBookable && session.seatsLeft > 0,
    );

  const selectFirstBookableSession = (event: PublicBookingEvent) => {
    const session = bookableSessions(event)[0] ?? null;
    currentSessionId = session?.sessionId ?? "";
    quantity = 1;
  };

  const invalidateAttempt = () => {
    idempotencyKey = "";
    previousAttempt = "";
  };

  const renderEvents = () => {
    const needle = eventSearch.value.trim().toLocaleLowerCase(locale === "en" ? "en-US" : "id-ID");
    const matchingEvents = events.filter((event) =>
      `${event.title} ${event.slug}`.toLocaleLowerCase(locale === "en" ? "en-US" : "id-ID").includes(needle),
    );
    const pageCount = Math.max(1, Math.ceil(matchingEvents.length / eventPageSize));
    currentEventPage = Math.min(currentEventPage, pageCount);
    const visibleEvents = matchingEvents.slice(
      (currentEventPage - 1) * eventPageSize,
      currentEventPage * eventPageSize,
    );
    eventList.replaceChildren();
    for (const event of visibleEvents) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-card event-choice";
      button.setAttribute("role", "option");
      button.setAttribute(
        "aria-selected",
        String(event.slug === currentEventSlug),
      );
      button.textContent = event.title;
      button.addEventListener("click", () => {
        currentEventSlug = event.slug;
        selectFirstBookableSession(event);
        invalidateAttempt();
        renderSelections();
      });
      eventList.append(button);
    }

    eventPagination.hidden = matchingEvents.length <= eventPageSize;
    eventPrevious.disabled = currentEventPage <= 1 || isLoadingEvents;
    eventNext.disabled = currentEventPage >= pageCount || isLoadingEvents;
    eventPageLabel.textContent = locale === "en"
      ? `Page ${currentEventPage} of ${pageCount}`
      : `Halaman ${currentEventPage} dari ${pageCount}`;

    if (events.length > 0 && matchingEvents.length === 0) {
      eventsStatus.textContent = translate(locale, "Event tidak ditemukan.");
      eventsStatus.hidden = false;
    } else if (events.length === 0) {
      eventsStatus.textContent = translate(locale, "Belum ada event yang tersedia.");
      eventsStatus.hidden = false;
    } else {
      eventsStatus.hidden = true;
    }
  };

  eventSearch.addEventListener("input", () => {
    currentEventPage = 1;
    renderEvents();
  });
  eventPrevious.addEventListener("click", () => {
    if (currentEventPage <= 1) return;
    currentEventPage -= 1;
    renderEvents();
  });
  eventNext.addEventListener("click", () => {
    const needle = eventSearch.value.trim().toLocaleLowerCase(locale === "en" ? "en-US" : "id-ID");
    const pageCount = Math.ceil(
      events.filter((event) =>
        `${event.title} ${event.slug}`.toLocaleLowerCase(locale === "en" ? "en-US" : "id-ID").includes(needle),
      ).length / eventPageSize,
    );
    if (currentEventPage >= pageCount) return;
    currentEventPage += 1;
    renderEvents();
  });

  const renderSelections = () => {
    const event = selectedEvent();
    renderEvents();
    sessionList.replaceChildren();

    if (!event) {
      sessionCount.textContent = "";
      renderTotals();
      return;
    }

    const sessions = [...event.sessions].sort(
      (a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt),
    );
    const availableCount = sessions.filter(
      (session) => session.isBookable && session.seatsLeft > 0,
    ).length;
    const comingSoonCount = sessions.filter(
      (session) => session.salesStatus === "coming_soon",
    ).length;
    const closedCount = sessions.filter(
      (session) => session.salesStatus === "closed",
    ).length;
    sessionCount.textContent = sessions.length === 0
      ? translate(locale, "Jadwal menyusul")
      : [
          availableCount > 0 ? (locale === "en" ? `${availableCount} available` : `${availableCount} dapat dipesan`) : "",
          comingSoonCount > 0 ? (locale === "en" ? `${comingSoonCount} opening soon` : `${comingSoonCount} segera dibuka`) : "",
          sessions.some((session) => session.salesStatus === "sold_out")
            ? translate(locale, "beberapa kuota habis")
            : "",
          closedCount > 0 ? (locale === "en" ? `${closedCount} registration closed` : `${closedCount} pendaftaran ditutup`) : "",
        ].filter(Boolean).join(" · ");

    for (const session of sessions) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-card session-choice";
      button.setAttribute("role", "option");
      button.setAttribute(
        "aria-selected",
        String(session.sessionId === currentSessionId),
      );
      button.disabled =
        session.seatsLeft === 0 || !session.isBookable;

      const date = document.createElement("span");
      date.className = "session-meta";
      date.textContent = `${session.studioName} · ${formatDate(session.startsAt)}`;

      const name = document.createElement("strong");
      name.textContent = formatTimeRange(session);

      const bottom = document.createElement("span");
      bottom.className = "session-bottom";
      const price = document.createElement("span");
      price.textContent = formatIDR(session.price);
      const seats = document.createElement("span");
      seats.className =
        session.salesStatus === "sold_out" ? "sold-out" : "";
      seats.textContent =
        session.salesStatus === "sold_out" || session.seatsLeft === 0
          ? translate(locale, "Kuota habis")
          : session.salesStatus === "coming_soon"
            ? session.registrationOpensAt
              ? `${translate(locale, "Penjualan dibuka")} ${formatDate(session.registrationOpensAt)}`
              : translate(locale, "Penjualan segera dibuka")
            : session.salesStatus === "closed"
              ? translate(locale, "Pendaftaran ditutup")
              : locale === "en"
                ? `${session.seatsLeft} ${session.seatsLeft === 1 ? "spot" : "spots"} left`
                : `Sisa ${session.seatsLeft} slot`;
      bottom.append(price, seats);
      button.append(name, date, bottom);
      button.addEventListener("click", () => {
        currentSessionId = session.sessionId;
        quantity = 1;
        invalidateAttempt();
        renderSelections();
      });
      sessionList.append(button);
    }

    if (sessions.length === 0) {
      const empty = document.createElement("p");
      empty.className = "load-message";
      empty.textContent = translate(locale, "Jadwal sesi segera diumumkan.");
      sessionList.append(empty);
    }
    renderTotals();
  };

  const maxQuantity = () => {
    const session = selectedSession();
    return session ? Math.min(20, session.seatsLeft) : 0;
  };

  const formatTime = (value: string) =>
    new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(new Date(value));

  const formatTimeRange = (session: PublicBookingSession) => {
    const endsAt = new Date(
      Date.parse(session.startsAt) + session.durationMinutes * 60_000,
    ).toISOString();
    return `${formatTime(session.startsAt)} – ${formatTime(endsAt)} WIB`;
  };

  const renderTotals = () => {
    const session = selectedSession();
    const max = maxQuantity();
    quantity = max > 0 ? Math.min(Math.max(1, quantity), max) : 1;
    quantityInput.value = String(quantity);
    quantityInput.max = String(Math.max(1, max));
    quantityInput.disabled = max === 0;
    dialog
      .querySelectorAll<HTMLButtonElement>("[data-step]")
      .forEach((button) => {
        const amount = Number(button.dataset.step);
        button.disabled =
          !session ||
          max === 0 ||
          (amount < 0 && quantity <= 1) ||
          (amount > 0 && quantity >= max);
      });

    bind("unit-price", session ? formatIDR(session.price) : "–");
    bind("total", session ? formatIDR(session.price * quantity) : "–");
    bind(
      "footer-total",
      session ? formatIDR(session.price * quantity) : translate(locale, "Pilih sesi untuk melihat total."),
    );
    bind("max-quantity", locale === "en" ? `Max ${max} spots` : `Maks. ${max} slot`);
    nextButton.disabled = !canContinue();
  };

  const canContinue = () => {
    const session = selectedSession();
    const name = form.elements.namedItem("name") as HTMLInputElement;
    phoneInput.setCustomValidity(
      phoneInput.value.trim() &&
        !/^\+?[0-9][0-9\s().-]{7,29}$/.test(phoneInput.value.trim())
        ? translate(locale, "Format nomor telepon tidak valid.")
        : "",
    );
    return Boolean(
      !isLoadingEvents &&
        session &&
        session.isBookable &&
        session.seatsLeft > 0 &&
        name.value.trim().length > 0 &&
        name.value.trim().length <= 150 &&
        phoneInput.validity.valid &&
        quantityInput.validity.valid &&
        Number(quantityInput.value) === quantity &&
        Number.isInteger(quantity) &&
        quantity > 0 &&
        quantity <= maxQuantity(),
    );
  };

  const renderConfirmation = () => {
    const event = selectedEvent();
    const session = selectedSession();
    if (!event || !session) return;

    const name = form.elements.namedItem("name") as HTMLInputElement;
    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    bind("event-name", event.title);
    bind("studio-name", session.studioName);
    bind("session-date", formatDate(session.startsAt));
    bind("session-time", formatTimeRange(session));
    bind("customer-name", name.value.trim());
    bind("customer-phone", phone.value.trim());
    bind("quantity", locale === "en" ? `${quantity} ${quantity === 1 ? "spot" : "spots"}` : `${quantity} slot`);
    bind("confirm-unit-price", formatIDR(session.price));
    bind("confirm-total", formatIDR(session.price * quantity));
  };

  const setStep = (nextStep: number) => {
    step = nextStep;
    dialog.querySelectorAll<HTMLElement>("[data-step-panel]").forEach((panel) => {
      panel.hidden = Number(panel.dataset.stepPanel) !== step;
    });
    dialog.querySelectorAll<HTMLElement>("[data-step-indicator]").forEach((item) => {
      const itemStep = Number(item.dataset.stepIndicator);
      item.classList.toggle("active", itemStep === step);
      item.classList.toggle("complete", itemStep < step);
      const indicator = item.querySelector("span");
      if (indicator) indicator.textContent = itemStep < step ? "✓" : String(itemStep);
    });

    bind(
      "heading",
      translate(locale, step === 3 ? "Booking berhasil dibuat" : "Booking baru"),
    );
    bind(
      "description",
      step === 1
        ? translate(locale, "Pilih event dan sesi, lalu isi data pemesan.")
        : step === 2
          ? translate(locale, "Periksa kembali detail booking sebelum dikonfirmasi.")
          : translate(locale, "Booking sudah tercatat di sistem."),
    );
    dialog.querySelector<HTMLElement>(".footer-total")!.hidden = step === 3;
    dialog.querySelector<HTMLButtonElement>('[data-action="cancel"]')!.hidden =
      step !== 1;
    dialog.querySelector<HTMLButtonElement>('[data-action="back"]')!.hidden =
      step !== 2;
    nextButton.hidden = step !== 1;
    confirmButton.hidden = step !== 2;
    dialog.querySelector<HTMLButtonElement>('[data-action="done"]')!.hidden =
      step !== 3;
  };

  const loadEvents = async () => {
    isLoadingEvents = true;
    eventsStatus.textContent = translate(locale, "Memuat event...");
    eventsStatus.hidden = false;
    retryButton.hidden = true;
    nextButton.disabled = true;
    try {
      events = await fetchPublicBookingEvents();
      currentEventPage = 1;
      if (triggerEventSlug) {
        const event = events.find((item) => item.slug === triggerEventSlug);
        if (!event) {
          throw new Error(translate(locale, "Event yang dipilih tidak lagi tersedia untuk booking."));
        }

        currentEventSlug = event.slug;
        const eventIndex = events.findIndex((item) => item.slug === event.slug);
        currentEventPage = Math.floor(eventIndex / eventPageSize) + 1;
        const triggerSession = event.sessions.find(
          (session) => session.sessionId === triggerSessionId,
        );
        const defaultSession =
          triggerSession && triggerSession.isBookable && triggerSession.seatsLeft > 0
            ? triggerSession
            : bookableSessions(event).find(
                (session) => session.studioSlug === triggerStudioSlug,
              ) ?? bookableSessions(event)[0] ?? null;
        currentSessionId = defaultSession?.sessionId ?? "";
        if (triggerSession && !triggerSession.isBookable) {
          eventsStatus.textContent =
            triggerSession.salesStatus === "coming_soon"
              ? translate(locale, "Penjualan sesi ini belum dibuka.")
              : triggerSession.salesStatus === "sold_out"
                ? translate(locale, "Sesi yang dipilih sudah penuh. Silakan pilih sesi lain.")
                : translate(locale, "Pendaftaran sesi ini sudah ditutup.");
        }
        eventsStatus.hidden = !triggerSession || triggerSession.isBookable;
      }
      renderSelections();
    } catch (error) {
      console.error("[booking] Gagal memuat pilihan booking.", error);
      events = [];
      currentEventSlug = "";
      currentSessionId = "";
      currentEventPage = 1;
      eventsStatus.textContent =
        error instanceof Error
          ? error.message
          : translate(locale, "Daftar event gagal dimuat. Coba lagi.");
      eventsStatus.hidden = false;
      retryButton.hidden = false;
      renderSelections();
    } finally {
      isLoadingEvents = false;
      eventPrevious.disabled = currentEventPage <= 1;
      const currentNeedle = eventSearch.value.trim().toLocaleLowerCase(locale === "en" ? "en-US" : "id-ID");
      const matchingEventCount = events.filter((event) =>
        `${event.title} ${event.slug}`
          .toLocaleLowerCase(locale === "en" ? "en-US" : "id-ID")
          .includes(currentNeedle),
      ).length;
      eventNext.disabled =
        currentEventPage >= Math.ceil(matchingEventCount / eventPageSize);
      renderTotals();
    }
  };

  const callbackUrl = () => {
    const url = new URL(`${window.location.origin}${locale === "en" ? "/en" : ""}/booking/after-payment`);
    url.searchParams.set("reference", "{referenceId}");
    return url.toString();
  };

  const submitBooking = async () => {
    const session = selectedSession();
    if (!session || !canContinue() || isSubmitting) return;

    const name = form.elements.namedItem("name") as HTMLInputElement;
    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    const attempt = JSON.stringify([
      session.sessionId,
      name.value.trim(),
      phone.value.trim(),
      quantity,
    ]);
    if (attempt !== previousAttempt || !idempotencyKey) {
      idempotencyKey = crypto.randomUUID();
      previousAttempt = attempt;
    }

    isSubmitting = true;
    confirmButton.disabled = true;
    confirmButton.setAttribute("aria-busy", "true");
    confirmButton.textContent = translate(locale, "Memproses...");
    errorBox.hidden = true;
    try {
      const url = callbackUrl();
      const result = await createBooking({
        sessionId: session.sessionId,
        name: name.value.trim(),
        whatsapp: phone.value.trim(),
        quantity,
        idempotencyKey,
        returnUrl: url,
        cancelUrl: url,
      });

      bind("booking-code", result.code);
      bind(
        "payment-status",
        result.paymentStatus === "paid"
          ? translate(locale, "Lunas")
          : translate(locale, "Menunggu pembayaran"),
      );
      bind("success-total", formatIDR(result.totalAmount));
      bind(
        "hold-message",
        result.holdExpiresAt
          ? `${translate(locale, "Selesaikan pembayaran sebelum")} ${formatDateTime(result.holdExpiresAt)}.`
          : "",
      );
      const paymentLink = dialog.querySelector<HTMLAnchorElement>(
        "[data-payment-link]",
      )!;
      paymentLink.href = result.paymentUrl;
      paymentLink.hidden = result.paymentStatus === "paid";
      setStep(3);
    } catch (error) {
      if (
        error instanceof BookingError &&
        ["PAYMENT_PROVIDER_UNAVAILABLE", "PAYMENT_LINK_UNAVAILABLE"].includes(
          error.code ?? "",
        )
      ) {
        idempotencyKey = "";
      }
      errorBox.textContent =
        error instanceof BookingError
          ? error.message
          : translate(locale, "Terjadi kendala. Coba lagi sebentar.");
      errorBox.hidden = false;
    } finally {
      isSubmitting = false;
      confirmButton.disabled = false;
      confirmButton.removeAttribute("aria-busy");
      confirmButton.textContent = translate(locale, "Konfirmasi booking");
    }
  };

  const formatDateTime = (value: string) =>
    new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(new Date(value));

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const trigger = event.target.closest<HTMLElement>("[data-book]");
    if (!trigger) return;
    event.preventDefault();

    triggerEventSlug = trigger.dataset.eventSlug ?? "";
    triggerStudioSlug = trigger.dataset.studioSlug ?? "";
    triggerSessionId = trigger.dataset.sessionId ?? "";
    const hasSelectionContext = Boolean(
      triggerEventSlug || triggerStudioSlug || triggerSessionId,
    );
    if (
      hasSelectionContext &&
      (!triggerEventSlug || !triggerStudioSlug || !triggerSessionId)
    ) {
      console.error("[booking] Tombol booking tidak memiliki event, studio, atau sesi.");
      return;
    }

    form.reset();
    eventSearch.value = "";
    events = [];
    currentEventSlug = "";
    currentSessionId = "";
    quantity = 1;
    idempotencyKey = "";
    previousAttempt = "";
    errorBox.hidden = true;
    bind("footer-total", translate(locale, "Memuat sesi..."));
    setStep(1);
    eventsStatus.textContent = translate(locale, "Memuat event...");
    eventsStatus.hidden = false;
    retryButton.hidden = true;
    renderSelections();
    dialog.showModal();
    void loadEvents();
  });

  dialog.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target === dialog || event.target.closest("[data-close]")) {
      dialog.close();
    }
  });

  dialog.addEventListener("cancel", () => dialog.close());
  eventSearch.addEventListener("input", renderEvents);
  retryButton.addEventListener("click", () => void loadEvents());

  form.addEventListener("input", () => {
    if (document.activeElement === quantityInput) return;
    invalidateAttempt();
    renderTotals();
  });
  const syncQuantity = () => {
    const max = maxQuantity();
    const value = Number(quantityInput.value);
    if (!Number.isInteger(value) || value < 1 || max === 0) {
      nextButton.disabled = true;
      return;
    }
    quantity = Math.min(max, value);
    quantityInput.value = String(quantity);
    invalidateAttempt();
    renderTotals();
  };
  quantityInput.addEventListener("input", syncQuantity);
  quantityInput.addEventListener("change", syncQuantity);

  dialog.querySelectorAll<HTMLButtonElement>("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const max = maxQuantity();
      quantity = Math.max(
        1,
        Math.min(max, quantity + Number(button.dataset.step)),
      );
      quantityInput.value = String(quantity);
      invalidateAttempt();
      renderTotals();
    });
  });

  dialog
    .querySelector<HTMLButtonElement>('[data-action="cancel"]')!
    .addEventListener("click", () => dialog.close());
  nextButton.addEventListener("click", () => {
    if (!form.reportValidity() || !canContinue()) return;
    renderConfirmation();
    errorBox.hidden = true;
    setStep(2);
  });
  dialog
    .querySelector<HTMLButtonElement>('[data-action="back"]')!
    .addEventListener("click", () => {
      errorBox.hidden = true;
      setStep(1);
    });
  confirmButton.addEventListener("click", () => void submitBooking());
  dialog
    .querySelector<HTMLButtonElement>('[data-action="done"]')!
    .addEventListener("click", () => dialog.close());
}
