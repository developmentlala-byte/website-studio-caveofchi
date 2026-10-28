export type Locale = "id" | "en";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALES: Locale[] = ["id", "en"];

export type Entry = {
  id: string;
  en: string;
};

export type Messages = Record<string, Entry>;

export function defineMessages<const T extends Messages>(messages: T): T {
  return messages;
}

type Params = Record<string, string | number>;

function interpolate(text: string, params?: Params): string {
  if (!params) return text;

  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

export function createT<const T extends Messages>(locale: Locale, messages: T) {
  return (key: keyof T & string, params?: Params): string => {
    const entry = messages[key];

    if (!entry) {
      if (import.meta.env.DEV) {
        console.warn(`[i18n] kunci tidak ada: "${key}"`);
      }

      return key;
    }

    return interpolate(entry[locale] || entry[DEFAULT_LOCALE], params);
  };
}

export function toLocale(value: string | undefined): Locale {
  return value === "en" ? "en" : DEFAULT_LOCALE;
}
