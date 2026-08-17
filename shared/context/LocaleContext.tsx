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
import { MESSAGES, type AppLocale, type MessageKey } from "@/lib/i18n/messages";
import { isAppLocale } from "@/lib/i18n/locales";

const STORAGE_KEY = "suba-locale";
const DEFAULT_LOCALE: AppLocale = "es";

interface LocaleContextValue {
  locale: AppLocale;
  /** v1 es español-only: el selector de idioma queda oculto/deshabilitado en la UI
   *  (ver docs/plan-migracion.md, Sprint 1) aunque la infra de mensajes ya soporta
   *  los 7 locales de bondiya para cuando se habilite en v2. */
  setLocale: (l: AppLocale) => void;
  t: (key: MessageKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Port de bondiya/app/context/LocaleContext.tsx.
 * localStorage -> AsyncStorage. Se saca `document.documentElement.lang`
 * (no aplica en RN). MESSAGES/AppLocale/MessageKey se portaron sin cambios
 * desde lib/i18n/ (son datos puros).
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored && isAppLocale(stored)) {
        setLocaleState(stored);
      }
    });
  }, []);

  const setLocale = useCallback((l: AppLocale) => {
    setLocaleState(l);
    AsyncStorage.setItem(STORAGE_KEY, l).catch(() => {
      /* ignore */
    });
  }, []);

  const t = useCallback((key: MessageKey) => MESSAGES[locale][key] ?? String(key), [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
