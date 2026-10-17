import { BookingError, createBooking } from "@/lib/api/bookings";
import {
  fetchPublicBookingEvents,
  type PublicBookingEvent,
  type PublicBookingSession,
} from "@/lib/api/events";
import { formatIDR } from "@/lib/format";

const dialog = document.querySelector<HTMLDialogElement>("#booking-dialog");

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
          const previousSeats = Number(button.dataset.seats);
          button.dataset.seats = String(session.seatsLeft);
          button.disabled = session.seatsLeft === 0;
          if (session.seatsLeft === 0) {
            button.textContent = "Kuota habis";
          } else if (previousSeats === 0) {
            button.textContent = button.dataset.availableLabel ?? "Pesan ↗";
          }
        });
      document
        .querySelectorAll<HTMLElement>(
          `[data-seats-left="${session.sessionId}"]`,
        )
        .forEach((label) => {
          label.textContent = `Sisa ${session.seatsLeft} kursi`;
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
    event.sessions.filter((session) => session.seatsLeft > 0);

  const selectFirstBookableSession = (event: PublicBookingEvent) => {
    const session = bookableSessions(event)[0] ?? event.sessions[0] ?? null;
    currentSessionId = session?.sessionId ?? "";
    quantity = 1;
  };

  const invalidateAttempt = () => {
    idempotencyKey = "";
    previousAttempt = "";
  };

  const renderEvents = () => {
    const needle = eventSearch.value.trim().toLocaleLowerCase("id-ID");
    const visibleEvents = events.filter((event) =>
      `${event.title} ${event.slug}`.toLocaleLowerCase("id-ID").includes(needle),
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

    if (events.length > 0 && visibleEvents.length === 0) {
      eventsStatus.textContent = "Event tidak ditemukan.";
      eventsStatus.hidden = false;
    } else {
      eventsStatus.hidden = true;
    }
  };

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
    const availableCount = sessions.filter((session) => session.seatsLeft > 0).length;
    sessionCount.textContent = `${availableCount} tersedia${
      sessions.length > availableCount ? ` · ${sessions.length - availableCount} penuh` : ""
    }`;

    for (const session of sessions) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-card session-choice";
      button.setAttribute("role", "option");
      button.setAttribute(
        "aria-selected",
        String(session.sessionId === currentSessionId),
      );
      button.disabled = session.seatsLeft === 0;

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
      seats.className = session.seatsLeft === 0 ? "sold-out" : "";
      seats.textContent =
        session.seatsLeft === 0
          ? "Penuh · 0 slot"
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
      empty.textContent = "Tidak ada sesi untuk event ini.";
      sessionList.append(empty);
    }
    renderTotals();
  };

  const maxQuantity = () => {
    const session = selectedSession();
    return session ? Math.min(20, session.seatsLeft) : 0;
  };

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }).format(new Date(value));

  const formatTime = (value: string) =>
    new Intl.DateTimeFormat("id-ID", {
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
      session ? formatIDR(session.price * quantity) : "Pilih sesi untuk melihat total.",
    );
    bind("max-quantity", `Maks. ${max} slot`);
    nextButton.disabled = !canContinue();
  };

  const canContinue = () => {
    const session = selectedSession();
    const name = form.elements.namedItem("name") as HTMLInputElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    phoneInput.setCustomValidity(
      phoneInput.value.trim() &&
        !/^\+?[0-9][0-9\s().-]{7,29}$/.test(phoneInput.value.trim())
        ? "Format nomor telepon tidak valid."
        : "",
    );
    return Boolean(
      !isLoadingEvents &&
        session &&
        session.seatsLeft > 0 &&
        name.value.trim().length > 0 &&
        name.value.trim().length <= 150 &&
        email.validity.valid &&
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
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    bind("event-name", event.title);
    bind("studio-name", session.studioName);
    bind("session-date", formatDate(session.startsAt));
    bind("session-time", formatTimeRange(session));
    bind("customer-name", name.value.trim());
    bind("customer-email", email.value.trim());
    bind("customer-phone", phone.value.trim());
    bind("quantity", `${quantity} slot${quantity === 1 ? "" : "s"}`);
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
      step === 3 ? "Booking berhasil" : "Booking baru",
    );
    bind(
      "description",
      step === 1
        ? "Pilih event dan sesi, lalu isi data pemesan."
        : step === 2
          ? "Periksa kembali detail booking sebelum dikonfirmasi."
          : "Booking sudah tercatat di sistem.",
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
    eventsStatus.textContent = "Memuat event...";
    eventsStatus.hidden = false;
    retryButton.hidden = true;
    nextButton.disabled = true;
    try {
      events = await fetchPublicBookingEvents();
      if (triggerEventSlug) {
        const event = events.find((item) => item.slug === triggerEventSlug);
        if (!event) {
          throw new Error("Event yang dipilih tidak lagi tersedia untuk booking.");
        }

        currentEventSlug = event.slug;
        const triggerSession = event.sessions.find(
          (session) => session.sessionId === triggerSessionId,
        );
        const defaultSession =
          triggerSession && triggerSession.seatsLeft > 0
            ? triggerSession
            : bookableSessions(event).find(
                (session) => session.studioSlug === triggerStudioSlug,
              ) ?? bookableSessions(event)[0] ?? triggerSession ?? null;
        currentSessionId = defaultSession?.sessionId ?? "";
        if (triggerSession && triggerSession.seatsLeft === 0) {
          eventsStatus.textContent =
            "Sesi yang dipilih sudah penuh. Silakan pilih sesi lain.";
        }
        eventsStatus.hidden = !triggerSession || triggerSession.seatsLeft > 0;
      }
      renderSelections();
    } catch (error) {
      console.error("[booking] Gagal memuat pilihan booking.", error);
      events = [];
      currentEventSlug = "";
      currentSessionId = "";
      eventsStatus.textContent =
        error instanceof Error
          ? error.message
          : "Daftar event gagal dimuat. Coba lagi.";
      eventsStatus.hidden = false;
      retryButton.hidden = false;
      renderSelections();
    } finally {
      isLoadingEvents = false;
      renderTotals();
    }
  };

  const callbackUrl = () => {
    const url = new URL(`${window.location.origin}/booking/after-payment`);
    url.searchParams.set("reference", "{referenceId}");
    return url.toString();
  };

  const submitBooking = async () => {
    const session = selectedSession();
    if (!session || !canContinue() || isSubmitting) return;

    const name = form.elements.namedItem("name") as HTMLInputElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    const attempt = JSON.stringify([
      session.sessionId,
      name.value.trim(),
      email.value.trim(),
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
    confirmButton.textContent = "Memproses...";
    errorBox.hidden = true;
    try {
      const url = callbackUrl();
      const result = await createBooking({
        sessionId: session.sessionId,
        name: name.value.trim(),
        email: email.value.trim(),
        whatsapp: phone.value.trim(),
        quantity,
        idempotencyKey,
        returnUrl: url,
        cancelUrl: url,
      });

      bind("booking-code", result.code);
      bind(
        "payment-status",
        result.paymentStatus === "paid" ? "Lunas" : "Menunggu pembayaran",
      );
      bind("success-total", formatIDR(result.totalAmount));
      bind(
        "hold-message",
        result.holdExpiresAt
          ? `Selesaikan pembayaran sebelum ${formatDateTime(result.holdExpiresAt)}.`
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
          : "Terjadi kendala. Coba lagi sebentar.";
      errorBox.hidden = false;
    } finally {
      isSubmitting = false;
      confirmButton.disabled = false;
      confirmButton.removeAttribute("aria-busy");
      confirmButton.textContent = "Konfirmasi booking";
    }
  };

  const formatDateTime = (value: string) =>
    new Intl.DateTimeFormat("id-ID", {
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
    bind("footer-total", "Memuat sesi...");
    setStep(1);
    eventsStatus.textContent = "Memuat event...";
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
