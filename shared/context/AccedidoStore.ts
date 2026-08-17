import { create } from "zustand";

interface AccedidoState {
  hasAccedido: boolean;
  setHasAccedido: (v: boolean) => void;
  acceder: () => void;
}

/**
 * Port de bondiya/app/context/AccedidoContext.tsx (sessionStorage) a zustand
 * SIN persistencia — a propósito. sessionStorage se resetea por sesión de tab
 * en el browser; en RN el equivalente semántico más cercano es un store en
 * memoria que se resetea en cada apertura fría de la app (no AsyncStorage,
 * que persistiría para siempre y suprimiría el gate de permisos después del
 * primer uso). Ver docs/plan-migracion.md, Sprint 1.
 */
export const useAccedidoStore = create<AccedidoState>((set) => ({
  hasAccedido: false,
  setHasAccedido: (v) => set({ hasAccedido: v }),
  acceder: () => set({ hasAccedido: true }),
}));
