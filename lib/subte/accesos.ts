/**
 * Fuente: data/subtes/stops.txt → processed/accesos.json
 * Contiene: entradas y salidas físicas de estaciones (location_type=2).
 * Incluye escaleras, ascensores y puertas con coords y descripción de calle.
 * Referenciadas por parent_station a su estación.
 */

import rawAccesos from "@/data/subtes/processed/accesos.json";

export interface SubteAcceso {
  id: string;
  descripcion: string;
  lat: number;
  lng: number;
  /** ID de la estación padre */
  parent: string;
  accesible?: boolean;
}

const ACCESOS = rawAccesos as SubteAcceso[];

export function getAccesos(): SubteAcceso[] {
  return ACCESOS;
}

/** Accesos que pertenecen a una estación específica */
export function getAccesosDeEstacion(estacionId: string): SubteAcceso[] {
  return ACCESOS.filter((a) => a.parent === estacionId);
}

/** Solo accesos accesibles (ascensores/rampas) de una estación */
export function getAccesosAccesibles(estacionId: string): SubteAcceso[] {
  return ACCESOS.filter((a) => a.parent === estacionId && a.accesible === true);
}
