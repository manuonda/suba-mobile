/**
 * Fuente: data/subtes/routes.txt → processed/routes.json
 * Contiene: líneas de subte (route_type=1). Excluye premetro (route_type=0).
 * Líneas: A, B, C, D, E, H con nombre, recorrido completo y color oficial.
 */

import rawRoutes from "@/data/subtes/processed/routes.json";

export interface SubteRoute {
  id: string;
  nombre: string;
  nombreLargo: string;
  color: string;
  tipo: number;
}

const ROUTES = rawRoutes as SubteRoute[];

export function getSubteRoutes(): SubteRoute[] {
  return ROUTES;
}

export function getSubteRoute(routeId: string): SubteRoute | undefined {
  return ROUTES.find((r) => r.id === routeId);
}

/** Devuelve el color hex de una línea, fallback gris si no existe */
export function getColorSubte(routeId: string): string {
  return ROUTES.find((r) => r.id === routeId)?.color ?? "#9ca3af";
}
