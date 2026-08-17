import { Tabs } from "expo-router";

/**
 * Bottom tabs: Mapa (home), Buscar, Alertas.
 * Configuración NO es un tab (ver ideas.txt ítem 0 de bondiya, referencia Citymapper) —
 * se implementa como bottom-sheet modal en Sprint 6 (S6-2 en todo-list.json).
 */
export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Mapa" }} />
      <Tabs.Screen name="buscar" options={{ title: "Buscar" }} />
      <Tabs.Screen name="alertas" options={{ title: "Alertas" }} />
    </Tabs>
  );
}
