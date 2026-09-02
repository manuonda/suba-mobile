/**
 * Fuente: data/subtes/fare_attributes.txt → processed/fare_attributes.json
 * Contiene: tarifas base del subte en ARS.
 * payment_method: 0=prepago (SUBE), 1=abordo.
 */

import rawFares from "@/data/subtes/processed/fare_attributes.json";

export interface SubteFare {
  id: string;
  precio: number;
  moneda: string;
  /** 0 = prepago (SUBE), 1 = abordo */
  metodoPago: number;
  trasbordos: number;
}

const FARES = rawFares as SubteFare[];

export function getFares(): SubteFare[] {
  return FARES;
}

/** Tarifa prepago (método 0 = SUBE) */
export function getTarifaSUBE(): SubteFare | undefined {
  return FARES.find((f) => f.metodoPago === 0);
}

/** Formatea precio en ARS: "$1.363" */
export function formatPrecio(precio: number): string {
  return `$${precio.toLocaleString("es-AR")}`;
}
