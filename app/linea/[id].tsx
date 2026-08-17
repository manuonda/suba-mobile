import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

/**
 * 🧑‍💻 TAREA TUYA — Sprint 5 (S5-2 en todo-list.json)
 *
 * Pantalla de detalle de una línea de subte (A, B, C, D, E, H).
 * Referencia en bondiya: app/linea/[id]/page.tsx + LineaPageClient.tsx
 * (ignorá la parte de generateMetadata/JSON-LD, es SEO de Next.js y no aplica acá).
 *
 * Cuando llegues a este sprint vas a tener disponible:
 *   - lib/subte/linea-horarios.ts  → horarios de la línea (portado en Sprint 2).
 *   - lib/subte/lines.ts, stops.ts → estaciones y trazado de la línea.
 *   - shared/constants/subteColors.ts → color oficial de la línea (Sprint 6, o adelantalo si lo necesitás antes).
 *
 * Con eso alcanza para armar la UI: nombre/color de línea, lista de estaciones en orden,
 * horario de primer/último servicio.
 */
export default function LineaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Línea {id}</Text>
      <Text style={styles.subtitle}>TODO: armar esta pantalla (Sprint 5, tarea S5-2).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 24 },
  title: { fontSize: 20, fontWeight: "600" },
  subtitle: { textAlign: "center", color: "#666" },
});
