/**
 * Fuente: data/subtes/frequencies.txt → processed/frequencies.json
 * Contiene: frecuencia de paso por franja horaria, agrupada por trip_id.
 * headway_secs = segundos entre trenes consecutivos.
 * Ejemplo: A01 entre 7:21 y 10:00 → cada 216s (~4 min).
 */

import rawFrequencies from "@/data/subtes/processed/frequencies.json";

export interface FranjaHoraria {
  inicio: string;
  fin: string;
  /** Segundos entre trenes */
  cada: number;
}

export interface SubteFrequency {
  tripId: string;
  franjas: FranjaHoraria[];
}

const FREQUENCIES = rawFrequencies as SubteFrequency[];

const BY_TRIP = new Map(FREQUENCIES.map((f) => [f.tripId, f]));

export function getFrequencies(): SubteFrequency[] {
  return FREQUENCIES;
}

export function getFrequency(tripId: string): SubteFrequency | undefined {
  return BY_TRIP.get(tripId);
}

/**
 * Devuelve la franja activa para un trip dado un horario "HH:MM".
 * Retorna undefined si está fuera de servicio.
 */
export function getFrecuenciaActual(
  tripId: string,
  horaActual: string
): FranjaHoraria | undefined {
  const freq = BY_TRIP.get(tripId);
  if (!freq) return undefined;
  return freq.franjas.find((f) => horaActual >= f.inicio && horaActual < f.fin);
}

/** Formatea segundos a texto legible: "Cada 4 min" */
export function formatFrecuencia(segundos: number): string {
  const minutos = Math.round(segundos / 60);
  return `Cada ${minutos} min`;
}
