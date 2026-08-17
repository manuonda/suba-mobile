import { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";
import { BA_CENTER } from "@/shared/constants/geo";
import type { GPSState, GPSStatus } from "@/shared/types/gps";

export type { GPSState, GPSStatus };

/**
 * Port de bondiya/shared/hooks/useGPS.ts (navigator.geolocation) a expo-location.
 * Mantiene el mismo shape (GPSStatus/GPSState) para que los componentes que lo
 * consuman necesiten el mínimo cambio posible.
 */
export function useGPS(): GPSState {
  const [status, setStatus] = useState<GPSStatus>("idle");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPosition = useCallback(async () => {
    try {
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        setStatus("unavailable");
        setError("El GPS está desactivado en el dispositivo");
        setCoords(BA_CENTER);
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setStatus("granted");
      setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
      setError(null);
    } catch (err) {
      setStatus("denied");
      setError(err instanceof Error ? err.message : "No se pudo obtener la ubicación");
      setCoords(BA_CENTER);
    }
  }, []);

  const requestPermission = useCallback(() => {
    setStatus("requesting");
    Location.requestForegroundPermissionsAsync().then(({ status: permStatus }) => {
      if (permStatus !== "granted") {
        setStatus("denied");
        setError("Permiso de ubicación denegado");
        setCoords(BA_CENTER);
        return;
      }
      fetchPosition();
    });
  }, [fetchPosition]);

  useEffect(() => {
    // Chequea el permiso existente sin disparar el diálogo nativo.
    Location.getForegroundPermissionsAsync().then(({ status: permStatus }) => {
      if (permStatus === "granted") {
        fetchPosition();
      } else if (permStatus === "denied") {
        setStatus("denied");
        setCoords(BA_CENTER);
      }
      // Si es "undetermined" queda en "idle" — el usuario dispara requestPermission()
      // desde la pantalla de permisos (equivalente a PantallaPermisos en bondiya).
    });
  }, [fetchPosition]);

  return { status, coords, error, requestPermission };
}
