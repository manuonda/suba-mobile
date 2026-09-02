/**
 * Barrel de lib/subte/
 * Re-exporta todo para importar desde "@/lib/subte"
 */

// Tipos de la API GCBA en tiempo real (usados en hooks/useSubtes.ts)
// Las llamadas HTTP viven en app/api/subtes/forecast/route.ts y alertas/route.ts
export interface ForecastSubte {
  route_id: string;
  trip_id: string;
  stop_id: string;
  arrival_time: number;
  departure_time: number;
}

export * from "./stops";
export * from "./lines";
export * from "./routes";
export * from "./estaciones";
export * from "./accesos";
export * from "./trips";
export * from "./stop-times";
export * from "./frequencies";
export * from "./calendar";
export * from "./pathways";
export * from "./transfers";
export * from "./fares";
export * from "./linea-horarios";
