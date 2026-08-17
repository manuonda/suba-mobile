import { Pressable, StyleSheet, Text, View } from "react-native";
import type { GPSState } from "@/shared/types/gps";
import { useLocale } from "@/shared/context/LocaleContext";

interface PantallaPermisosProps {
  gps: GPSState;
  onSkip: () => void;
}

// TODO Sprint 6 (S6-1): reemplazar por shared/constants/subteColors.ts (fuente única,
// generada desde GTFS route_color) — hoy son los mismos valores que bondiya/constants/subtes.ts.
const LINEAS = [
  { letra: "A", color: "#60a5fa", oscuro: false },
  { letra: "B", color: "#f87171", oscuro: false },
  { letra: "C", color: "#a78bfa", oscuro: false },
  { letra: "D", color: "#34d399", oscuro: false },
  { letra: "E", color: "#fb923c", oscuro: false },
  { letra: "H", color: "#B8912A", oscuro: true },
] as const;

const FEATURES = [
  { emoji: "📍", titleKey: "featureNearTitle", descKey: "featureNearDesc" },
  { emoji: "🗺️", titleKey: "featureMapTitle", descKey: "featureMapDesc" },
  { emoji: "🚇", titleKey: "featureArrivalsTitle", descKey: "featureArrivalsDesc" },
] as const;

/**
 * Port simplificado de bondiya/shared/components/shell/PantallaPermisos.tsx.
 * Se deja para un sprint de pulido: reproducir el diseño Tailwind original con
 * estilos nativos equivalentes (gradientes, iconos SVG de shared/components/ui/Icons.tsx).
 * Por ahora prioriza que el flujo de permisos funcione end-to-end.
 * Selector de idioma omitido (v1 español-only, ver docs/plan-migracion.md).
 */
export function PantallaPermisos({ gps, onSkip }: PantallaPermisosProps) {
  const { t } = useLocale();

  return (
    <View style={styles.container}>
      <View style={styles.stripe}>
        {LINEAS.map((l) => (
          <View key={l.letra} style={[styles.stripeSegment, { backgroundColor: l.color }]} />
        ))}
      </View>

      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>S</Text>
        </View>

        <Text style={styles.title}>Suba</Text>
        <Text style={styles.tagline}>{t("welcomeTagline")}</Text>

        <View style={styles.chips}>
          {LINEAS.map((l) => (
            <View key={l.letra} style={[styles.chip, { backgroundColor: l.color }]}>
              <Text style={[styles.chipText, { color: l.oscuro ? "#0f172a" : "#fff" }]}>
                {l.letra}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f.titleKey} style={styles.featureRow}>
              <Text style={styles.featureEmoji}>{f.emoji}</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{t(f.titleKey)}</Text>
                <Text style={styles.featureDesc}>{t(f.descKey)}</Text>
              </View>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => {
            gps.requestPermission();
            onSkip();
          }}
          disabled={gps.status === "requesting"}
          style={({ pressed }) => [
            styles.button,
            (pressed || gps.status === "requesting") && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            {gps.status === "requesting" ? t("btnAccessLoading") : t("btnAccess")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const PRIMARY = "#4f46e5";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA" },
  stripe: { flexDirection: "row", height: 4 },
  stripeSegment: { flex: 1 },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 20,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { color: "#fff", fontSize: 28, fontWeight: "900" },
  title: { fontSize: 32, fontWeight: "800", color: PRIMARY },
  tagline: { fontSize: 14, color: "#64748b", textAlign: "center", maxWidth: 280 },
  chips: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 },
  chip: { minWidth: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center", paddingHorizontal: 6 },
  chipText: { fontSize: 11, fontWeight: "700" },
  features: { width: "100%", gap: 12 },
  featureRow: {
    flexDirection: "row",
    gap: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
    padding: 14,
    alignItems: "flex-start",
  },
  featureEmoji: { fontSize: 22 },
  featureText: { flex: 1, gap: 2 },
  featureTitle: { fontSize: 14, fontWeight: "600", color: "#0f172a" },
  featureDesc: { fontSize: 12, color: "#64748b" },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: PRIMARY,
    alignItems: "center",
  },
  buttonPressed: { opacity: 0.7 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
