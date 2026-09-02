import type {
  SubteServiceAlert,
  SubteServiceAlertTranslatedString,
} from "@/types/subtes/subteServiceAlert";

export function pickTranslatedText(
  ts: SubteServiceAlertTranslatedString | null | undefined,
  preferLang = "es"
): string {
  const list = ts?.translation;
  if (!list?.length) return "";
  const byLang = list.find((t) => t.language === preferLang);
  return (byLang ?? list[0]).text;
}

export function routeIdsFromAlert(alert: SubteServiceAlert | undefined | null): string[] {
  const raw =
    alert?.informed_entity
      ?.map((e) => e.route_id)
      .filter((r): r is string => typeof r === "string" && r.length > 0) ?? [];
  return [...new Set(raw)];
}

/** Convierte route_id del feed (SubteA, LineaA, …) al id canónico LineaA de rutas locales. */
export function canonicalLineaRouteId(routeId: string): string {
  const t = routeId.trim();
  const m = /^(?:Subte|Linea)_?([A-Za-z0-9]+)$/i.exec(t);
  if (m) return `Linea${m[1].toUpperCase()}`;
  return t;
}

/** "LineaA" / "SubteA" → "Línea A" */
export function formatLineaRouteLabel(routeId: string): string {
  const canon = canonicalLineaRouteId(routeId);
  const m = /^Linea([A-Z0-9]+)$/i.exec(canon);
  if (m) return `Línea ${m[1].toUpperCase()}`;
  return routeId;
}
