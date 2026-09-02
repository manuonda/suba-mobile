/**
 * Fuente: data/subtes/stops.txt → processed/stops.json
 * Contiene: plataformas/andenes (location_type=0) donde el pasajero aborda.
 * IDs con sufijo N/S/E/O indican sentido de circulación (ej: "1164N", "1164S").
 */

import rawStops from "@/data/subtes/processed/stops.json";

export interface SubteStop {
  id: string;
  nombre: string;
  lat: number;
  lng: number;
  /** ID de la estación padre (ej: "1164") */
  parent?: string;
  accesible?: boolean;
}

const STOPS = rawStops as SubteStop[];

export function getSubteStops(): SubteStop[] {
  return STOPS;
}

export function getSubteStop(stopId: string): SubteStop | undefined {
  return STOPS.find((s) => s.id === stopId);
}

/** Plataformas que pertenecen a una estación padre */
export function getStopsByParent(parentId: string): SubteStop[] {
  return STOPS.filter((s) => s.parent === parentId);
}

/** Datos listos para el mapa (tipo `subte`) */
export function subteStopsToMarkers() {
  return STOPS.map((s) => ({
    id: s.id,
    lat: s.lat,
    lng: s.lng,
    type: "subte" as const,
    nombre: s.nombre,
    parent: s.parent,
    label: s.nombre,
  }));
}
