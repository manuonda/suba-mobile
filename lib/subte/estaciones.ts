/**
 * Fuente: data/subtes/stops.txt → processed/estaciones.json
 * Contiene: estaciones padre (location_type=1) derivadas de agrupar plataformas
 * por parent_station. Cada estación incluye sus andenes y accesos físicos.
 * Coordenadas = promedio de las plataformas hijas.
 */

import rawEstaciones from "@/data/subtes/processed/estaciones.json";

export interface SubteEstacion {
  id: string;
  nombre: string;
  lat: number;
  lng: number;
  /** IDs de plataformas/andenes (ej: ["1164N","1164S"]) */
  plataformas: string[];
  /** IDs de accesos físicos (entradas/salidas) */
  accesos: string[];
}

const ESTACIONES = rawEstaciones as SubteEstacion[];

export function getEstaciones(): SubteEstacion[] {
  return ESTACIONES;
}

export function getEstacion(id: string): SubteEstacion | undefined {
  return ESTACIONES.find((e) => e.id === id);
}

/** Busca la estación padre a la que pertenece una plataforma o acceso */
export function getEstacionDeParada(stopId: string): SubteEstacion | undefined {
  return ESTACIONES.find(
    (e) => e.plataformas.includes(stopId) || e.accesos.includes(stopId)
  );
}

/** Marcadores listos para el mapa (un punto por estación, no por andén) */
export function estacionesToMarkers() {
  return ESTACIONES.map((e) => ({
    id: e.id,
    lat: e.lat,
    lng: e.lng,
    type: "subte" as const,
    nombre: e.nombre,
    parent: e.id,
    label: e.nombre,
  }));
}
