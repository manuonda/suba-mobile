/**
 * Fuente: data/subtes/stop_times.txt → processed/stop_times.json
 * Contiene: horarios de llegada/salida por viaje, agrupados por trip_id.
 * Paradas ordenadas por stop_sequence (orden de recorrido).
 * Complementa el forecast en tiempo real con horarios estáticos.
 */

import rawStopTimes from "@/data/subtes/processed/stop_times.json";

export interface StopTimeEntry {
  stopId: string;
  llegada: string;
  salida: string;
  seq: number;
}

export interface SubteStopTimes {
  tripId: string;
  paradas: StopTimeEntry[];
}

const STOP_TIMES = rawStopTimes as SubteStopTimes[];

const BY_TRIP = new Map(STOP_TIMES.map((s) => [s.tripId, s]));

export function getStopTimesByTrip(tripId: string): SubteStopTimes | undefined {
  return BY_TRIP.get(tripId);
}

/** Todas las paradas de un trip en orden de recorrido */
export function getParadasDeViaje(tripId: string): StopTimeEntry[] {
  return BY_TRIP.get(tripId)?.paradas ?? [];
}

/** Horario de un stop específico dentro de un trip */
export function getHorarioEnParada(
  tripId: string,
  stopId: string
): StopTimeEntry | undefined {
  return BY_TRIP.get(tripId)?.paradas.find((p) => p.stopId === stopId);
}
