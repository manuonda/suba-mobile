export type GPSStatus = "idle" | "requesting" | "granted" | "denied" | "unavailable";

export interface GPSState {
  status: GPSStatus;
  coords: { lat: number; lng: number } | null;
  error: string | null;
  requestPermission: () => void;
}
