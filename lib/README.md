# lib/

- `subte/` — copia verbatim de los 14 archivos + `index.ts` de `bondiya/lib/subte/`. Son funciones puras
  (sin `fs`, sin APIs de browser/Node) que consultan el GTFS estático de subte bundleado en `data/subtes/processed/`.
  Se portan en Sprint 2 (S2-2 en `todo-list.json`).

No confundir con el `lib/` viejo de bondiya en la raíz (ese tiene mezcla de concerns); acá replicamos
solo `lib/subte/`, que es la parte 100% portable tal cual.
