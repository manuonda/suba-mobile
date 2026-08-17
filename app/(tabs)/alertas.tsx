import { StyleSheet, Text, View } from "react-native";

/**
 * Tab "Alertas" — equivalente a useAlertasSubtes() + AlertaServicio/ListaAlertas en bondiya.
 * Placeholder de Sprint 0, se completa en Sprint 3. Tarea: S3-1 en todo-list.json.
 */
export default function AlertasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alertas ⚠️</Text>
      <Text style={styles.subtitle}>Alertas de servicio del subte en vivo (Sprint 3).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 24 },
  title: { fontSize: 22, fontWeight: "600" },
  subtitle: { textAlign: "center", color: "#666" },
});
