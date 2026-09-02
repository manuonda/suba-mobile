/**
 * Tipos para la respuesta del endpoint serviceAlerts de la API Subtes GCBA.
 *
 * @see https://apitransporte.buenosaires.gob.ar/subtes/serviceAlerts
 *
 * Las alertas de servicio permiten proporcionar actualizaciones cuando se produce
 * una interrupción en la red (obras, cierres de estaciones, demoras, etc.).
 *
 * Las demoras y cancelaciones de viajes individuales suelen comunicarse a través
 * de trip updates (forecastGTFS), no de service alerts.
 *
 * Estructura GTFS-RT: Header (metadata) + Entity (array de alertas).
 */

/** Metadata del feed en tiempo real */
export interface SubteServiceAlertHeader {
  gtfs_realtime_version: string;
  incrementality?: number;
  timestamp: number;
}

/** Texto traducido (ej: español) */
export interface SubteServiceAlertTranslation {
  text: string;
  language?: string;
}

/** Cadena con traducciones por idioma */
export interface SubteServiceAlertTranslatedString {
  translation: SubteServiceAlertTranslation[];
}

/** Entidad afectada por la alerta (línea, parada, etc.) */
export interface SubteServiceAlertInformedEntity {
  agency_id?: string;
  route_id?: string;
  route_type?: number;
  trip?: unknown;
  stop_id?: string;
}

/** Contenido de la alerta */
export interface SubteServiceAlert {
  active_period?: unknown[];
  informed_entity?: SubteServiceAlertInformedEntity[];
  cause?: number;
  effect?: number;
  url?: SubteServiceAlertTranslatedString | null;
  header_text?: SubteServiceAlertTranslatedString;
  description_text?: SubteServiceAlertTranslatedString;
}

/** Entidad del feed (una alerta) */
export interface SubteServiceAlertEntity {
  id: string;
  is_deleted?: boolean;
  trip_update?: unknown;
  vehicle?: unknown;
  alert?: SubteServiceAlert;
}

/** Respuesta completa del endpoint serviceAlerts */
export interface SubteServiceAlertGTFS {
  header?: SubteServiceAlertHeader;
  entity?: SubteServiceAlertEntity[];
}
