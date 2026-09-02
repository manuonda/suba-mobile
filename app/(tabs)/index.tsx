import { StyleSheet, Text, View } from "react-native";
import { useGPS } from "@/shared/hooks/useGPS";
import { getEstaciones, getSubteRoutes } from "@/lib/subte";

/**
 * Tab "Mapa" — pantalla principal (equivalente a app/page.tsx + AppDashboard.tsx en bondiya).
 * Por ahora muestra el estado de useGPS() y un conteo de datos GTFS de subte
 * cargados desde lib/subte (Sprint 2), para verificar ambas capas end-to-end
 * en Expo Go sin necesitar el development build de MapLibre (S1-3, todavía pendiente).
 */
export default function MapaScreen() {
  const gps = useGPS();
  const estaciones = getEstaciones();
  const rutas = getSubteRoutes();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa 🚇</Text>
      <Text style={styles.subtitle}>
        Acá va el mapa MapLibre con las estaciones de subte (falta S1-3).
      </Text>

      <View style={styles.debugBox}>
        <Text style={styles.debugLabel}>useGPS() — debug</Text>
        <Text style={styles.debugLine}>status: {gps.status}</Text>
        <Text style={styles.debugLine}>
          coords: {gps.coords ? `${gps.coords.lat.toFixed(4)}, ${gps.coords.lng.toFixed(4)}` : "—"}
        </Text>
        {gps.error && <Text style={styles.debugError}>error: {gps.error}</Text>}
      </View>

      <View style={styles.debugBox}>
        <Text style={styles.debugLabel}>lib/subte (GTFS estático) — debug</Text>
        <Text style={styles.debugLine}>estaciones: {estaciones.length}</Text>
        <Text style={styles.debugLine}>líneas: {rutas.map((r) => r.id).join(", ")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
  },
  debugBox: {
    marginTop: 24,
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 12,
    gap: 4,
  },
  debugLabel: { fontSize: 11, fontWeight: "700", color: "#94a3b8", textTransform: "uppercase" },
  debugLine: { fontSize: 13, color: "#334155" },
  debugError: { fontSize: 13, color: "#dc2626" },
});
