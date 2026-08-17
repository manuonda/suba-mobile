export interface MarkerData {
  lat: number;
  lng: number;
  label?: string;
  id?: string;
  type?: "subte" | "parada" | "user";
  /** Nombre para panel / popup (subte GTFS o parada colectivo) */
  nombre?: string;
  /** Estación padre GTFS (solo subte) */
  parent?: string;
}

export interface MapLayers {
  paradasColectivo: boolean;
  paradasSubte: boolean;
  /** Trazado GTFS (shapes) por línea */
  lineasSubte: boolean;
}

/** Polilínea preprocesada (build-gtfs → shapes.json) */
export interface SubteLineOverlay {
  shapeId: string;
  color: string;
  points: [number, number][];
  /** Letra de la línea para mostrar en el mapa (A, B, C, etc.) */
  label?: string;
}
