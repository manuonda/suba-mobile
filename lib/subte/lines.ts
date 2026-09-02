/**
 * Fuente: data/subtes/shapes.txt + trips.txt → processed/shapes.json
 * Contiene: polilíneas geográficas de cada línea para dibujar en el mapa.
 * Cada entrada representa un trazado único (route + shape_id).
 */

import raw from "@/data/subtes/processed/shapes.json";
import type { SubteLineOverlay } from "@/shared/types/mapa";

interface RawShapeLine {
  routeId: string;
  shapeId: string;
  color: string;
  points: [number, number][];
}

function getLineaLabel(routeId: string): string {
  const m = routeId.match(/Linea([A-H])/i);
  return m ? m[1].toUpperCase() : routeId.replace(/^Linea/i, "").charAt(0)?.toUpperCase() || "";
}

/** Polilíneas GTFS listas para el componente Mapa */
export function subteLinesForMap(): SubteLineOverlay[] {
  const data = raw as RawShapeLine[];
  return data.map((r) => ({
    shapeId: r.shapeId,
    color: r.color,
    points: r.points,
    label: getLineaLabel(r.routeId),
  }));
}

/** Polilíneas filtradas por línea (ej: "LineaA") */
export function subteLinesForRoute(routeId: string): SubteLineOverlay[] {
  const data = raw as RawShapeLine[];
  return data
    .filter((r) => r.routeId === routeId)
    .map((r) => ({
      shapeId: r.shapeId,
      color: r.color,
      points: r.points,
      label: getLineaLabel(r.routeId),
    }));
}
