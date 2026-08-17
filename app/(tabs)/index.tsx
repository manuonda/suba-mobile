import { StyleSheet, Text, View } from "react-native";
import { useGPS } from "@/shared/hooks/useGPS";

/**
 * Tab "Mapa" — pantalla principal (equivalente a app/page.tsx + AppDashboard.tsx en bondiya).
 * Por ahora muestra el estado de useGPS() para verificar el hook end-to-end.
 * El mapa MapLibre se agrega en S1-3 (todo-list.json) y las estaciones/líneas
 * reales de subte en Sprint 2.
 */
export default function MapaScreen() {
  const gps = useGPS();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa 🚇</Text>
      <Text style={styles.subtitle}>
        Acá va el mapa MapLibre con las estaciones de subte (Sprint 1-2).
      </Text>

      <View style={styles.debugBox}>
        <Text style={styles.debugLabel}>useGPS() — debug</Text>
        <Text style={styles.debugLine}>status: {gps.status}</Text>
        <Text style={styles.debugLine}>
          coords: {gps.coords ? `${gps.coords.lat.toFixed(4)}, ${gps.coords.lng.toFixed(4)}` : "—"}
        </Text>
        {gps.error && <Text style={styles.debugError}>error: {gps.error}</Text>}
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
