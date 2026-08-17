export interface Coords {
  lat: number;
  lng: number;
}

export function calcularDistancia(a: Coords, b: Coords): number {
  const R = 6371000; // metros
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const c =
    2 * Math.atan2(
      Math.sqrt(sinDLat * sinDLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLng * sinDLng),
      Math.sqrt(1 - sinDLat * sinDLat - Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLng * sinDLng)
    );
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function formatDistancia(metros: number): string {
  if (metros < 1000) return `${Math.round(metros)}m`;
  return `${(metros / 1000).toFixed(1)}km`;
}

/** Radio del área de servicio AMBA en metros (~60 km) */
const RADIO_AMBA_METROS = 60_000;

/** Indica si las coordenadas están dentro del área de servicio (AMBA) */
export function isWithinServiceArea(lat: number, lng: number): boolean {
  const user: Coords = { lat, lng };
  const distance = calcularDistancia(user, { lat: -34.6037, lng: -58.3816 });
  return distance <= RADIO_AMBA_METROS;
}
