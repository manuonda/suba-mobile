/**
 * Fuente: data/subtes/trips.txt → processed/trips.json
 * Contiene: viajes por línea, día de servicio y sentido.
 * service_id: 5=lun-vie, 6=sáb, 7=dom.
 * direction: 0=ida, 1=vuelta.
 */

import rawTrips from "@/data/subtes/processed/trips.json";

export interface SubteTrip {
  id: string;
  routeId: string;
  serviceId: string;
  headsign: string;
  /** 0 = ida, 1 = vuelta */
  direction: number;
  shapeId: string;
}

const TRIPS = rawTrips as SubteTrip[];

export function getTrips(): SubteTrip[] {
  return TRIPS;
}

export function getTrip(tripId: string): SubteTrip | undefined {
  return TRIPS.find((t) => t.id === tripId);
}

/** Viajes de una línea específica (ej: "LineaA") */
export function getTripsByRoute(routeId: string): SubteTrip[] {
  return TRIPS.filter((t) => t.routeId === routeId);
}

/** Viajes activos según service_id (5=lun-vie, 6=sáb, 7=dom) */
export function getTripsByService(serviceId: string): SubteTrip[] {
  return TRIPS.filter((t) => t.serviceId === serviceId);
}
