# data/

- `subtes/processed/*.json` — GTFS estático de subte ya procesado (stops, routes, estaciones, accesos,
  trips, stop_times, frequencies, calendar, calendar_dates, pathways, transfers, fare_attributes).
  Se copian tal cual desde `bondiya/data/subtes/processed/` en Sprint 2 (S2-1 en `todo-list.json`), ~316K total.

**Cómo se actualizan**: el pipeline de descarga/build (`scripts/download_gtfs.py` + `scripts/build-gtfs.ts`)
sigue viviendo en bondiya. Cuando el GTFS de subte cambie, correr `npm run gtfs:update && npm run gtfs:build`
en bondiya y volver a copiar los `.json` regenerados acá. Al ser solo datos JS/JSON, la actualización se puede
distribuir como OTA update (`eas update`) sin pasar por revisión de Play Store.
