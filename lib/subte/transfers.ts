/**
 * Fuente: data/subtes/transfers.txt → processed/transfers.json
 * Contiene: tiempos mínimos de trasbordo entre paradas de distintas líneas.
 * transfer_type=2 indica tiempo mínimo recomendado en segundos.
 * Ejemplo: Lima A (1073N) → Diagonal Norte C (1098O) = 132s.
 */

import rawTransfers from "@/data/subtes/processed/transfers.json";

export interface SubteTransfer {
  desde: string;
  hasta: string;
  tipo: number;
  /** Tiempo mínimo de trasbordo en segundos */
  tiempoMin: number;
}

const TRANSFERS = rawTransfers as SubteTransfer[];

export function getTransfers(): SubteTransfer[] {
  return TRANSFERS;
}

/** Trasbordos posibles desde un stop (hacia otras líneas) */
export function getTransfersDesde(stopId: string): SubteTransfer[] {
  return TRANSFERS.filter((t) => t.desde === stopId);
}

/** Tiempo mínimo de trasbordo entre dos stops (segundos), undefined si no hay trasbordo */
export function getTiempoTransfer(
  fromId: string,
  toId: string
): number | undefined {
  return TRANSFERS.find((t) => t.desde === fromId && t.hasta === toId)?.tiempoMin;
}
