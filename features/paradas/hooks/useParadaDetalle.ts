/**
 * Hook que compone toda la información estática GTFS para una parada de subte.
 * No hace llamadas HTTP — usa los JSON procesados en data/subtes/processed/.
 */

import { useMemo } from "react";
import {
  getSubteStop,
  getEstacionDeParada,
  getAccesosDeEstacion,
  getTrips,
  getHorarioEnParada,
  getFrecuenciaActual,
  formatFrecuencia,
  getServiceIdHoy,
  getTransfersDesde,
  getSubteRoute,
  getPrimeroUltimoServicioLinea,
} from "@/lib/subte";
import type {
  SubteStop,
  SubteEstacion,
  SubteAcceso,
  SubteTrip,
  SubteRoute,
  StopTimeEntry,
  FranjaHoraria,
  SubteTransfer,
} from "@/lib/subte";

export interface ViajeEnParada {
  trip: SubteTrip;
  route: SubteRoute | undefined;
  horario: StopTimeEntry | undefined;
  /** Franja horaria activa ahora mismo */
  frecuenciaAhora: FranjaHoraria | undefined;
  frecuenciaTexto: string | undefined;
}

export interface TrasbordomDetalle {
  transfer: SubteTransfer;
  stopDestino: SubteStop | undefined;
  estacionDestino: SubteEstacion | undefined;
  route: SubteRoute | undefined;
  tiempoTexto: string;
}

export interface ParadaDetalle {
  stop: SubteStop | undefined;
  estacion: SubteEstacion | undefined;
  accesos: SubteAcceso[];
  /** Sentido de circulación derivado del sufijo del ID */
  sentido: string | undefined;
  /** Viajes que pasan por esta parada, del servicio activo hoy */
  viajes: ViajeEnParada[];
  /** Hora del primer servicio en esta parada (HH:MM) */
  primerServicio: string | undefined;
  /** Hora del último servicio en esta parada (HH:MM) */
  ultimoServicio: string | undefined;
  trasbordos: TrasbordomDetalle[];
  serviceIdHoy: string | undefined;
}

function horaActualHHMM(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function parseSentido(stopId: string): string | undefined {
  const sufijo = stopId.slice(-1).toUpperCase();
  const map: Record<string, string> = { N: "Norte", S: "Sur", E: "Este", O: "Oeste" };
  return map[sufijo];
}

/** Convierte HH:MM (24h) a formato con a.m./p.m. para claridad */
function formatHoraAmPm(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(":");
  const h = parseInt(hStr || "0", 10) % 24;
  const m = (mStr || "00").slice(0, 2);
  if (h === 0) return `12:${m} a.m.`;
  if (h === 12) return `12:${m} p.m.`;
  if (h < 12) return `${h}:${m} a.m.`;
  return `${h - 12}:${m} p.m.`;
}

export function useParadaDetalle(stopId: string): ParadaDetalle {
  return useMemo(() => {
    const stop = getSubteStop(stopId);
    const estacion = getEstacionDeParada(stopId);
    const accesos = estacion ? getAccesosDeEstacion(estacion.id) : [];
    const sentido = parseSentido(stopId);
    const serviceIdHoy = getServiceIdHoy();
    const hora = horaActualHHMM();

    // Todos los viajes que incluyen esta parada, filtrados por servicio de hoy
    const todosLosViajes = getTrips();
    const viajesEnParada = todosLosViajes.filter((t) => {
      if (serviceIdHoy && t.serviceId !== serviceIdHoy) return false;
      return getHorarioEnParada(t.id, stopId) !== undefined;
    });

    const viajes: ViajeEnParada[] = viajesEnParada.map((trip) => {
      const route = getSubteRoute(trip.routeId);
      const horario = getHorarioEnParada(trip.id, stopId);
      const frecuenciaAhora = getFrecuenciaActual(trip.id, hora);
      return {
        trip,
        route,
        horario,
        frecuenciaAhora,
        frecuenciaTexto: frecuenciaAhora
          ? formatFrecuencia(frecuenciaAhora.cada)
          : undefined,
      };
    });

    // Primer y último servicio: desde la línea (frequencies.json), no desde la parada
    const routeId = viajes[0]?.trip?.routeId;
    const horariosLinea = routeId
      ? getPrimeroUltimoServicioLinea(routeId, serviceIdHoy ?? undefined)
      : undefined;
    const primerServicio = horariosLinea
      ? formatHoraAmPm(horariosLinea.primero)
      : undefined;
    const ultimoServicio = horariosLinea
      ? formatHoraAmPm(horariosLinea.ultimo)
      : undefined;

    // Trasbordos
    const rawTransfers = getTransfersDesde(stopId);
    const trasbordos: TrasbordomDetalle[] = rawTransfers.map((t) => {
      const stopDestino = getSubteStop(t.hasta);
      const estacionDestino = getEstacionDeParada(t.hasta);
      // Línea del destino: buscar cualquier viaje que pase por ese stop
      const tripDestino = todosLosViajes.find(
        (trip) => getHorarioEnParada(trip.id, t.hasta) !== undefined
      );
      const route = tripDestino ? getSubteRoute(tripDestino.routeId) : undefined;
      const minutos = Math.ceil(t.tiempoMin / 60);
      return {
        transfer: t,
        stopDestino,
        estacionDestino,
        route,
        tiempoTexto: `${minutos} min caminando`,
      };
    });

    return {
      stop,
      estacion,
      accesos,
      sentido,
      viajes,
      primerServicio,
      ultimoServicio,
      trasbordos,
      serviceIdHoy,
    };
  }, [stopId]);
}
