import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

/**
 * 🧑‍💻 TAREA TUYA — Sprint 5 (S5-1 en todo-list.json)
 *
 * Pantalla de detalle de una estación de subte.
 * Referencia en bondiya: app/parada/[id]/page.tsx + ParadaPageClient.tsx
 * (ignorá la parte de generateMetadata/JSON-LD, es SEO de Next.js y no aplica acá).
 *
 * Cuando llegues a este sprint vas a tener disponible:
 *   - features/paradas/hooks/useParadaDetalle.ts  → hook con toda la info de la estación
 *     (accesos, horarios, frecuencia actual, combinaciones) ya armado en Sprint 2.
 *   - lib/subte/*  → funciones puras de consulta sobre el GTFS de subte.
 *
 * Con eso alcanza para armar la UI: nombre de estación, línea(s), accesos,
 * próxima frecuencia, combinaciones con otras líneas.
 */
export default function ParadaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estación {id}</Text>
      <Text style={styles.subtitle}>TODO: armar esta pantalla (Sprint 5, tarea S5-1).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 24 },
  title: { fontSize: 20, fontWeight: "600" },
  subtitle: { textAlign: "center", color: "#666" },
});
