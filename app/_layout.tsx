import { useEffect, useState } from "react";
import { AppState, type AppStateStatus, Platform } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import { ThemeProvider, useTheme } from "@/shared/context/ThemeContext";
import { LocaleProvider } from "@/shared/context/LocaleContext";
import { UbicacionProvider } from "@/shared/context/UbicacionContext";
import { useAccedidoStore } from "@/shared/context/AccedidoStore";
import { useGPS } from "@/shared/hooks/useGPS";
import { PantallaPermisos } from "@/shared/components/shell/PantallaPermisos";

/**
 * Reemplaza el `refetchOnWindowFocus` de TanStack Query (que no existe en RN):
 * cuando la app vuelve a foreground, se refetchean las queries activas
 * (usado por useAlertasSubtes en Sprint 3). Ver docs/plan-migracion.md, Sprint 1.
 */
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

function RootStack() {
  const { theme } = useTheme();
  const gps = useGPS();
  const hasAccedido = useAccedidoStore((s) => s.hasAccedido);
  const acceder = useAccedidoStore((s) => s.acceder);

  // Equivalente a bondiya/app/page.tsx: gate de permisos antes del resto de la app.
  if (!hasAccedido) {
    return (
      <>
        <PantallaPermisos gps={gps} onSkip={acceder} />
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
      </>
    );
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="linea/[id]" options={{ title: "Línea" }} />
        <Stack.Screen name="parada/[id]" options={{ title: "Estación" }} />
      </Stack>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </>
  );
}

/**
 * Layout raíz — equivalente a bondiya/app/provider.tsx + app/layout.tsx.
 * Mismo orden de providers: QueryClientProvider > ThemeProvider > LocaleProvider
 * > UbicacionProvider. AccedidoStore es zustand (sin Provider). MapViewContext
 * queda afuera por ahora (ver nota en docs/plan-migracion.md sobre IA de settings).
 */
export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocaleProvider>
          <UbicacionProvider>
            <RootStack />
          </UbicacionProvider>
        </LocaleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
