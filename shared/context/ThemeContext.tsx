import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "suba-theme";

interface ThemeContextValue {
  theme: ThemeMode;
  /** false hasta que se termina de leer el valor persistido de AsyncStorage. */
  hydrated: boolean;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Port de bondiya/app/context/ThemeContext.tsx.
 * localStorage -> AsyncStorage. Se saca la manipulación de `document`
 * (dataset.theme, meta theme-color) — no aplica en RN; el color de la
 * status bar se controla desde app/_layout.tsx con <StatusBar style=.../>
 * leyendo este `theme`.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored === "light" || stored === "dark") {
          setThemeState(stored);
        }
      })
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, theme).catch(() => {
      /* ignore */
    });
  }, [theme, hydrated]);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, hydrated, setTheme, toggleTheme }),
    [theme, hydrated, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
