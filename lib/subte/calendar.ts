/**
 * Fuente:
 *   data/subtes/calendar.txt       → processed/calendar.json
 *   data/subtes/calendar_dates.txt → processed/calendar_dates.json
 * Contiene: días de operación por service_id y excepciones (feriados).
 * service_id: 5=lun-vie, 6=sáb, 7=dom.
 * exception_type: 1=agrega servicio, 2=quita servicio.
 */

import rawCalendar from "@/data/subtes/processed/calendar.json";
import rawCalendarDates from "@/data/subtes/processed/calendar_dates.json";

export interface SubteCalendar {
  serviceId: string;
  lunes: boolean;
  martes: boolean;
  miercoles: boolean;
  jueves: boolean;
  viernes: boolean;
  sabado: boolean;
  domingo: boolean;
  inicio: string;
  fin: string;
}

export interface SubteCalendarDate {
  serviceId: string;
  /** Fecha YYYYMMDD */
  fecha: string;
  /** 1 = agrega servicio, 2 = quita servicio */
  tipo: number;
}

const CALENDAR = rawCalendar as SubteCalendar[];
const CALENDAR_DATES = rawCalendarDates as SubteCalendarDate[];

/**
 * Devuelve el service_id activo para una fecha dada (YYYYMMDD).
 * Tiene en cuenta excepciones de calendar_dates.
 */
export function getServiceIdParaFecha(fechaYYYYMMDD: string): string | undefined {
  const date = new Date(
    parseInt(fechaYYYYMMDD.slice(0, 4)),
    parseInt(fechaYYYYMMDD.slice(4, 6)) - 1,
    parseInt(fechaYYYYMMDD.slice(6, 8))
  );
  const diaSemana = date.getDay(); // 0=dom, 1=lun ... 6=sab

  // Excepciones tienen prioridad
  for (const exc of CALENDAR_DATES) {
    if (exc.fecha === fechaYYYYMMDD) {
      if (exc.tipo === 2) return undefined;
      if (exc.tipo === 1) return exc.serviceId;
    }
  }

  const diaMap: Record<number, keyof SubteCalendar> = {
    0: "domingo",
    1: "lunes",
    2: "martes",
    3: "miercoles",
    4: "jueves",
    5: "viernes",
    6: "sabado",
  };

  const campo = diaMap[diaSemana];
  return CALENDAR.find((c) => c[campo] === true)?.serviceId;
}

/** Devuelve el service_id para hoy */
export function getServiceIdHoy(): string | undefined {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return getServiceIdParaFecha(`${yyyy}${mm}${dd}`);
}
