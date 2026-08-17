import type { AppLocale } from "./types";

/** Metadatos de UI: bandera + nombre nativo (los datos GTFS no se traducen). */
export const LOCALE_OPTIONS: {
  code: AppLocale;
  flag: string;
  native: string;
}[] = [
  { code: "es", flag: "🇦🇷", native: "Español" },
  { code: "en", flag: "🇬🇧", native: "English" },
  { code: "pt-BR", flag: "🇧🇷", native: "Português" },
  { code: "pl", flag: "🇵🇱", native: "Polski" },
  { code: "en-US", flag: "🇺🇸", native: "English (US/CA)" },
  { code: "ja", flag: "🇯🇵", native: "日本語" },
  { code: "zh", flag: "🇨🇳", native: "中文" },
];

export function isAppLocale(v: string): v is AppLocale {
  return LOCALE_OPTIONS.some((o) => o.code === v);
}
