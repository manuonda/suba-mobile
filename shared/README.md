# shared/

Código transversal, sin lógica de un dominio específico — calcado del `shared/` de bondiya.

- `components/mapa/` — el mapa (MapLibre + OpenFreeMap). Sprint 1. Referencia: `bondiya/shared/components/mapa/Mapa.tsx`.
- `components/shell/` — chrome de la app (status bar, pantalla de permisos, etc). Sprint 1.
- `components/ui/` — primitivos genéricos (íconos, botones) sin lógica de dominio.
- `hooks/useGPS.ts` — hook de ubicación con `expo-location`. Sprint 1. Referencia: `bondiya/shared/hooks/useGPS.ts` (mantener el mismo shape `GPSStatus`/`GPSState`).
- `types/mapa.ts` — copia verbatim de `MarkerData`, `MapLayers`, `SubteLineOverlay` desde `bondiya/shared/types/mapa.ts`.
- `constants/geo.ts` — `BA_CENTER` y radio de servicio AMBA, copia verbatim de `bondiya/shared/constants/geo.ts`.
- `constants/subteColors.ts` — Sprint 6: única fuente de verdad para los colores de línea (hoy inconsistentes en 3 lugares en bondiya).
- `utils/geo.ts` — Haversine, formateo de distancia, copia verbatim de `bondiya/shared/utils/geo.ts`.
- `context/` — Theme, Locale, Ubicación (Context), Accedido (zustand en memoria, no persistido). Sprint 1.

Ver `docs/plan-migracion.md` para el detalle de cada sprint y `todo-list.json` para el estado de cada tarea.
