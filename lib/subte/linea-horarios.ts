/**
 * Funciones para la pantalla de detalle de línea.
 * Horarios primer/último servicio por terminal y tipo de día.
 * Fuentes: trips, frequencies, routes.
 */

import { getTripsByRoute } from "./trips";
import { getFrequency } from "./frequencies";
import { getParadasDeViaje } from "./stop-times";
import { getEstacionDeParada, getEstaciones } from "./estaciones";
import type { SubteEstacion } from "./estaciones";

/** Service IDs: 5=lun-vie, 6=sáb, 7=dom */
const SERVICE_LUN_VIE = "5";
const SERVICE_SAB = "6";
const SERVICE_DOM = "7";

export interface HorarioPorDia {
  primero: string;
  ultimo: string;
}

export interface HorarioTerminal {
  terminal: string;
  lunVie: HorarioPorDia;
  sab: HorarioPorDia;
  dom: HorarioPorDia;
}

/** Convierte "5:30:00" → "05:30" */
function formatHHMM(timeStr: string): string {
  const parts = timeStr.trim().split(":");
  const h = parseInt(parts[0] || "0", 10) % 24;
  const m = parseInt(parts[1] || "0", 10);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Compara tiempos "HH:MM" o "H:MM:SS" */
function timeToMinutes(t: string): number {
  const [h, m] = t.split(/[:\s]/).map((x) => parseInt(x, 10) || 0);
  return h * 60 + m;
}

function minTime(a: string, b: string): string {
  return timeToMinutes(a) <= timeToMinutes(b) ? a : b;
}

function maxTime(a: string, b: string): string {
  return timeToMinutes(a) >= timeToMinutes(b) ? a : b;
}

/**
 * Horarios primer/último servicio por terminal.
 * Usa frequencies.json: inicio de la primera franja = primero, fin de la última = último.
 */
export function getHorariosPorLinea(routeId: string): HorarioTerminal[] {
  const routeIdNorm = routeId.startsWith("Linea") ? routeId : `Linea${routeId.toUpperCase()}`;
  const trips = getTripsByRoute(routeIdNorm);

  const byTerminal = new Map<string, Map<string, { primero: string; ultimo: string }>>();

  for (const trip of trips) {
    const freq = getFrequency(trip.id);
    if (!freq || freq.franjas.length === 0) continue;

    const primera = freq.franjas[0];
    const ultima = freq.franjas[freq.franjas.length - 1];
    const primero = primera.inicio;
    const ultimo = ultima.fin;

    const terminal = trip.headsign;
    if (!byTerminal.has(terminal)) {
      byTerminal.set(terminal, new Map());
    }
    const byService = byTerminal.get(terminal)!;
    const existing = byService.get(trip.serviceId);
    if (existing) {
      byService.set(trip.serviceId, {
        primero: minTime(existing.primero, primero),
        ultimo: maxTime(existing.ultimo, ultimo),
      });
    } else {
      byService.set(trip.serviceId, { primero, ultimo });
    }
  }

  const result: HorarioTerminal[] = [];
  for (const [terminal, byService] of byTerminal) {
    const lunVie = byService.get(SERVICE_LUN_VIE) ?? { primero: "—", ultimo: "—" };
    const sab = byService.get(SERVICE_SAB) ?? { primero: "—", ultimo: "—" };
    const dom = byService.get(SERVICE_DOM) ?? { primero: "—", ultimo: "—" };
    result.push({
      terminal,
      lunVie: {
        primero: formatHHMM(lunVie.primero),
        ultimo: formatHHMM(lunVie.ultimo),
      },
      sab: {
        primero: formatHHMM(sab.primero),
        ultimo: formatHHMM(sab.ultimo),
      },
      dom: {
        primero: formatHHMM(dom.primero),
        ultimo: formatHHMM(dom.ultimo),
      },
    });
  }

  return result;
}

/** Mapeo service_id → clave de día en HorarioTerminal */
const SERVICE_TO_KEY: Record<string, "lunVie" | "sab" | "dom"> = {
  "5": "lunVie",
  "6": "sab",
  "7": "dom",
};

/**
 * Primer y último servicio de una línea para hoy (según service_id).
 * Fuente: frequencies.json vía getHorariosPorLinea.
 * Útil para pantalla de parada: horarios oficiales de operación de la línea.
 */
export function getPrimeroUltimoServicioLinea(
  routeId: string,
  serviceId: string | undefined
): { primero: string; ultimo: string } | undefined {
  const horarios = getHorariosPorLinea(routeId);
  if (horarios.length === 0) return undefined;
  const diaKey: "lunVie" | "sab" | "dom" =
    (serviceId && SERVICE_TO_KEY[serviceId]) || "lunVie";
  const timeToMin = (t: string) => {
    const [hh, mm] = t.split(":").map((x) => parseInt(x, 10) || 0);
    return hh * 60 + mm;
  };
  let primeroMin = 24 * 60;
  let ultimoMin = 0;
  for (const h of horarios) {
    const dia = h[diaKey];
    if (dia.primero !== "—" && dia.ultimo !== "—") {
      primeroMin = Math.min(primeroMin, timeToMin(dia.primero));
      ultimoMin = Math.max(ultimoMin, timeToMin(dia.ultimo));
    }
  }
  if (ultimoMin === 0) return undefined;
  const h1 = Math.floor(primeroMin / 60);
  const m1 = primeroMin % 60;
  const h2 = Math.floor(ultimoMin / 60);
  const m2 = ultimoMin % 60;
  return {
    primero: `${String(h1).padStart(2, "0")}:${String(m1).padStart(2, "0")}`,
    ultimo: `${String(h2).padStart(2, "0")}:${String(m2).padStart(2, "0")}`,
  };
}

/**
 * Estaciones únicas de una línea (ordenadas por recorrido, usando primer trip).
 * Via trips → stop_times → estaciones padre.
 */
export function getEstacionesDeLinea(routeId: string): SubteEstacion[] {
  const routeIdNorm = routeId.startsWith("Linea") ? routeId : `Linea${routeId.toUpperCase()}`;
  const trips = getTripsByRoute(routeIdNorm);
  if (trips.length === 0) return [];

  const firstTrip = trips[0];
  const paradas = getParadasDeViaje(firstTrip.id);
  const estacionesMap = new Map<string, SubteEstacion>();

  for (const p of paradas) {
    const est = getEstacionDeParada(p.stopId);
    if (est && !estacionesMap.has(est.id)) {
      estacionesMap.set(est.id, est);
    }
  }

  return Array.from(estacionesMap.values());
}

/** Estaciones de subte con sus líneas, para listado de Paradas. Fuente: GTFS estaciones.json + trips. */
export interface EstacionParaLista {
  id: string;
  nombre: string;
  lineas: string[];
  tipo: "subte";
}

const LINEAS_ORDER = ["A", "B", "C", "D", "E", "H"];

export function getEstacionesParaLista(): EstacionParaLista[] {
  const estacionToLineas = new Map<string, Set<string>>();

  for (const letra of LINEAS_ORDER) {
    const routeId = `Linea${letra}`;
    const estaciones = getEstacionesDeLinea(routeId);
    for (const e of estaciones) {
      if (!estacionToLineas.has(e.id)) estacionToLineas.set(e.id, new Set());
      estacionToLineas.get(e.id)!.add(letra);
    }
  }

  const estaciones = getEstaciones();
  return estaciones
    .filter((e) => estacionToLineas.has(e.id))
    .map((e) => ({
      id: e.id,
      nombre: e.nombre,
      lineas: Array.from(estacionToLineas.get(e.id)!).sort(),
      tipo: "subte" as const,
    }));
}
