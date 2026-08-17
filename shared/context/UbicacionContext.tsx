import { createContext, useContext, useState, type ReactNode } from "react";

type UbicacionContextType = {
  /** True cuando el usuario está fuera del AMBA (mapa anclado a BA sin avisos) */
  fueraDelArea: boolean;
  setFueraDelArea: (v: boolean) => void;
};

const UbicacionContext = createContext<UbicacionContextType | null>(null);

/** Port verbatim de bondiya/app/context/UbicacionContext.tsx (no usa storage). */
export function UbicacionProvider({ children }: { children: ReactNode }) {
  const [fueraDelArea, setFueraDelArea] = useState(false);

  return (
    <UbicacionContext.Provider value={{ fueraDelArea, setFueraDelArea }}>
      {children}
    </UbicacionContext.Provider>
  );
}

export function useUbicacion() {
  const ctx = useContext(UbicacionContext);
  if (!ctx) throw new Error("useUbicacion debe usarse dentro de UbicacionProvider");
  return ctx;
}
