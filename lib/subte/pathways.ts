/**
 * Fuente: data/subtes/pathways.txt → processed/pathways.json
 * Contiene: conexiones físicas dentro y entre estaciones (pasillos, escaleras,
 * ascensores, puertas). Relaciona plataformas de distintas líneas en combinaciones.
 * pathway_mode: 1=corredor, 2=escalera, 3=escalera mecánica, 4=puerta, 5=salida, 6=ascensor.
 */

import rawPathways from "@/data/subtes/processed/pathways.json";

export interface SubtePathway {
  id: string;
  desde: string;
  hasta: string;
  /** 1=corredor, 2=escalera, 3=escalera mecánica, 4=puerta, 5=salida, 6=ascensor */
  modo: number;
  cartel?: string;
  bidireccional: boolean;
  /** Tiempo de recorrido en segundos */
  tiempo: number;
}

export const PATHWAY_MODO: Record<number, string> = {
  1: "Corredor",
  2: "Escalera",
  3: "Escalera mecánica",
  4: "Puerta",
  5: "Salida",
  6: "Ascensor",
};

const PATHWAYS = rawPathways as SubtePathway[];

export function getPathways(): SubtePathway[] {
  return PATHWAYS;
}

/** Todas las conexiones que salen desde un stop (o llegan si es bidireccional) */
export function getPathwaysDesde(stopId: string): SubtePathway[] {
  return PATHWAYS.filter(
    (p) => p.desde === stopId || (p.bidireccional && p.hasta === stopId)
  );
}

/** Conexión directa entre dos stops (en cualquier sentido) */
export function getPathwayEntre(
  fromId: string,
  toId: string
): SubtePathway | undefined {
  return PATHWAYS.find(
    (p) =>
      (p.desde === fromId && p.hasta === toId) ||
      (p.bidireccional && p.desde === toId && p.hasta === fromId)
  );
}

/** Tiempo de caminata entre dos stops vía pathway (segundos), undefined si no hay conexión */
export function getTiempoPathway(
  fromId: string,
  toId: string
): number | undefined {
  return getPathwayEntre(fromId, toId)?.tiempo;
}
