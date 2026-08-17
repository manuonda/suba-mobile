import { StyleSheet, Text, View } from "react-native";

/**
 * Tab "Buscar" — equivalente a features/buscar (BuscadorFallback, ChipsAccesoRapido) en bondiya.
 * Placeholder de Sprint 0, se completa en Sprint 4. Tarea: S4-1 en todo-list.json.
 */
export default function BuscarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar 🔎</Text>
      <Text style={styles.subtitle}>Buscador de estaciones y líneas (Sprint 4).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 24 },
  title: { fontSize: 22, fontWeight: "600" },
  subtitle: { textAlign: "center", color: "#666" },
});
