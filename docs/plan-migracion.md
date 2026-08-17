# Plan: Migración de BondiYa (Next.js PWA) a suba-mobile (React Native + Expo)

## Contexto

`bondiya` es una PWA Next.js que muestra transporte público del AMBA (colectivos, subtes, trenes) usando la API del GCBA. El objetivo es llevar esta app a mobile nativo (`suba-mobile`, repo actualmente vacío) para publicar en Play Store, dado que una PWA no llega a las tiendas de apps ni ofrece la misma experiencia nativa (GPS confiable en background, mapas fluidos, notificaciones push a futuro).

Auditoría del código real de bondiya (no el `plan-architecture.md`, que describe una estructura aspiracional ya parcialmente superada) muestra que:
- **Solo subtes tiene datos reales** (GTFS estático completo en `data/subtes/processed/*.json`, generado por `scripts/download_gtfs.py` + `scripts/build-gtfs.ts`). **Colectivos está 100% mockeado** (paradas falsas generadas en `lib/paradas-mock.ts`, sin GTFS real).
- La estructura vigente es `features/{subtes,paradas,buscar,colectivos}/` + `shared/` (no la de `plan-architecture.md`); `hooks/`, `lib/geo.ts`, `constants/geo.ts` en la raíz son shims deprecados que reexportan desde `shared/`.
- Gran parte de la lógica de dominio (`lib/subte/*.ts`, `shared/utils/geo.ts`, tipos en `shared/types/mapa.ts`) es JS puro sin APIs de browser/Node — **portable casi textual** a React Native.
- Las credenciales GCBA (`GCBA_CLIENT_ID`/`SECRET`) solo viven server-side en `app/api/*/route.ts` — la app mobile **nunca** debe tenerlas; debe consumir la API ya desplegada de bondiya en Vercel.

### Decisiones ya tomadas con el usuario
1. **Framework**: Expo (managed) + TypeScript — necesita `expo-location`, mapas nativos, EAS Build/Submit para Play Store y OTA updates sin reinventar módulos nativos.
2. **Scope v1**: **Subte-only**. Colectivos queda para v2 cuando exista una fuente GTFS/tiempo-real real (hoy es 100% mock).
3. **Mapa**: **MapLibre GL Native** (`@maplibre/maplibre-react-native`) con tiles de **OpenFreeMap** (gratis, sin API key, sin billing por uso) — evita el riesgo de costo de Google Maps Platform a ~10.000 usuarios/día que planteó el usuario, y mantiene la filosofía open-source/OSM que ya usa el Leaflet del web.
4. **Plataforma**: **Android primero** (Play Store) vía EAS Build; iOS se agrega después con costo de código casi nulo (Expo es cross-platform).
5. **Backend**: no se duplica el proxy GCBA. `suba-mobile` consume la API ya desplegada de bondiya (`/api/subtes/forecast`, `/api/subtes/alertas`) vía HTTPS — sin CORS issues porque son llamadas nativas, no de browser.

---

## Estructura del proyecto

Bootstrap con `npx create-expo-app@latest . --template blank-typescript` dentro de `suba-mobile/`, reflejando el patrón `features/` + `shared/` de bondiya pero con Expo Router (file-based, mismo modelo mental que el App Router de Next.js que ya usan):

```
suba-mobile/
  app/                          # Expo Router — pantallas
    _layout.tsx                 # providers, theme, fuentes (equivalente a app/provider.tsx)
    (tabs)/
      _layout.tsx                # Tabs: Mapa, Buscar, Alertas
      index.tsx                  # Mapa/dashboard (ex app/page.tsx + AppDashboard.tsx)
      buscar.tsx
      alertas.tsx
    linea/[id].tsx                # ex app/linea/[id]/page.tsx (sin SSR/JSON-LD)
    parada/[id].tsx               # ex app/parada/[id]/page.tsx (sin SSR/JSON-LD)
  features/
    subtes/{components,hooks}/    # useSubtes.ts port
    paradas/{components,hooks}/   # useParadaDetalle.ts port
    buscar/components/
  shared/
    components/{mapa,shell,ui}/
    hooks/useGPS.ts               # port con expo-location
    types/mapa.ts                 # copia verbatim: MarkerData, MapLayers, SubteLineOverlay
    constants/{geo.ts,subteColors.ts}
    utils/geo.ts                  # copia verbatim: Haversine, formatDistancia, isWithinServiceArea
    context/                      # Theme, Locale, Ubicacion (Context); Accedido (zustand, en memoria)
  lib/subte/                      # copia verbatim de los 14 archivos + index.ts de bondiya
  data/subtes/processed/          # *.json GTFS copiados como assets bundleados (316K total)
```

**Config de settings**: siguiendo `ideas.txt` ítem 0 (referencia Citymapper), Configuración no es un tab propio sino un bottom-sheet modal accesible desde un ícono — así se elimina el tab "mapa" separado del resto de la navegación.

**Dependencias clave a instalar**: `@tanstack/react-query`, `@react-native-async-storage/async-storage`, `expo-location`, `expo-router`, `@maplibre/maplibre-react-native` (+ su config plugin — requiere development build, no corre en Expo Go desde el Sprint 1), `zustand` (para el flag "accedido" en memoria).

---

## Plan por Sprints

### Sprint 0 — Setup (1-2 días)
- `create-expo-app` + `eas build:configure` (perfiles `development`/`preview`/`production`, Android primero: `apk` para preview, `aab` para production).
- `app.json`: package Android, ícono/splash derivados de `bondiya/public/icon-suba.png`.
- Instalar dependencias core y armar la estructura de carpetas de arriba.
- Variable `EXPO_PUBLIC_API_ORIGIN` apuntando al deploy de Vercel de bondiya (único "env var" necesario del lado cliente).

### Sprint 1 — GPS + Mapa base (4-6 días, el ítem de mayor riesgo)
- Portar `shared/hooks/useGPS.ts` → `expo-location` (`requestForegroundPermissionsAsync`, `getCurrentPositionAsync`), **preservando el mismo shape** `GPSStatus`/`GPSState` (`idle|requesting|granted|denied|unavailable`) para minimizar cambios en los consumidores.
- Portar `ThemeContext`/`LocaleContext` (`localStorage`→`AsyncStorage`, sin manipulación de DOM) y `AccedidoContext` (`sessionStorage`→ zustand en memoria, **no** AsyncStorage, para que el gate de permisos se repita en cada apertura fría de la app, igual que hoy se repite por sesión de tab).
- Armar `app/_layout.tsx` con el mismo orden de providers que `bondiya/app/provider.tsx`, agregando el wiring de `focusManager` de TanStack Query vía `AppState` (reemplaza `refetchOnWindowFocus`, que no existe en RN).
- Renderizar el mapa base con MapLibre + estilo de OpenFreeMap (mapa vacío, sin datos todavía) — reimplementar `shared/components/mapa/Mapa.tsx` contra la API de MapLibre (`MapView`, `ShapeSource`/`LineLayer`, `PointAnnotation`, `UserLocation`), reusando **sin cambios** los contratos de `shared/types/mapa.ts` (`MarkerData`, `MapLayers`, `SubteLineOverlay`).

### Sprint 2 — Capa de datos de subte (3-4 días)
- Copiar `data/subtes/processed/*.json` como assets bundleados.
- Copiar `lib/subte/*.ts` (14 archivos + `index.ts`) **textual** — confirmado sin dependencias de Node/browser.
- Portar `features/paradas/hooks/useParadaDetalle.ts` textual (es pura composición `useMemo` sobre `lib/subte`, sin HTTP).
- Renderizar estaciones y líneas reales en el mapa vía `subteLinesForMap()`/`estacionesToMarkers()`.

### Sprint 3 — Datos en vivo (forecast/alertas) (2-3 días)
- Portar `features/subtes/hooks/useSubtes.ts`, cambiando el fetch de rutas relativas a `${EXPO_PUBLIC_API_ORIGIN}/api/subtes/forecast` y `/api/subtes/alertas`, preservando polling (`refetchInterval` 15s forecast / 60s alertas).
- "Paradas cercanas" (`/api/paradas/cercanas`): dado que es filtrado local sobre GTFS estático (sin llamar al GCBA), conviene resolverlo **on-device** con `lib/subte` + `shared/utils/geo.ts` en vez de pegarle a la API — evita un round-trip innecesario.

### Sprint 4 — Buscador (2-3 días)
Portar `features/buscar/components/{BuscadorFallback,ChipsAccesoRapido}.tsx` — no depende de GCBA, solo de nombres de estaciones/líneas de `lib/subte`.

### Sprint 5 — Detalle de estación y línea (4-5 días)
Portar `app/parada/[id]` y `app/linea/[id]` **sin** la capa SSR/`generateMetadata`/JSON-LD (no aplica en app nativa, no hay superficie SEO) — solo la lógica de los client components, que ya consume `useParadaDetalle` y `lib/subte/linea-horarios.ts`.

### Sprint 6 — Pulido y publicación (3-5 días + tiempo de revisión de Play Store)
- Unificar los colores de línea de subte en un solo archivo `constants/subteColors.ts` (hoy están inconsistentes en 3 lugares: `constants/subtes.ts`, `app/globals.css` claro y oscuro, y `route_color` del GTFS — usar GTFS como fuente de verdad).
- Bottom-sheet de Configuración (tema, próximamente idioma — v1 solo español).
- `eas build --platform android --profile production` + `eas submit`.
- **Política de privacidad obligatoria**: Play Store exige URL de política de privacidad para apps que piden `ACCESS_FINE_LOCATION`. Bondiya no tiene una hoy — hay que redactarla y publicarla (puede vivir en el propio sitio de bondiya, ej. `/privacidad`) **antes** de poder enviar a revisión. Tratar como tarea bloqueante, no de último momento.
- Cuenta de Google Play Console (USD 25 pago único) es prerequisito fuera del código.

**Estimado total: ~3.5–5 semanas full-time.**

---

## Dónde queda esto documentado

Este archivo (`/home/manuonda/.claude/plans/necestio-trabajar-en-un-rustling-globe.md`) es el plan de la sesión de `/plan` — vive fuera del repo y no es fácil de encontrar después. Para que el plan y el reparto de features sea algo que puedas consultar mientras trabajás, como parte del **Sprint 0** se crean dos archivos dentro del propio repo `suba-mobile/`:

- **`docs/plan-migracion.md`** — copia persistente de este plan completo (contexto, decisiones, estructura, sprints, reparto de tareas). Es el documento de referencia a largo plazo, versionado en git junto con el código.
- **`todo-list.json`** (raíz del repo) — el tracker de tareas con estado (`pending/in_progress/done`) y dueño (`assistant/user`) descrito abajo, para ir tildando progreso sprint a sprint.

Además, las decisiones clave (scope subte-only, MapLibre+OpenFreeMap, Android primero, reparto de tareas) ya quedaron guardadas en la memoria persistente de Claude Code (engram) asociada a este proyecto, así que si retomamos en otra sesión no hay que re-explicar el contexto — pero el `docs/plan-migracion.md` dentro del repo es la fuente de verdad "legible por humanos" que te queda a vos como referencia de trabajo.

## Reparto de tareas: qué arma cada uno

El usuario quiere involucrarse directamente en el código para aprender RN, no solo recibir la app terminada. Reparto acordado:

- **Yo (asistente) armo la base**: Sprint 0 (setup Expo/EAS), Sprint 1 (GPS + mapa MapLibre), Sprint 2 (capa de datos GTFS de subte), Sprint 3 (forecast/alertas en vivo), Sprint 4 (buscador), y Sprint 6 (pulido/publicación) — es infraestructura repetitiva y la parte más "de fontanería" (setup nativo, providers, wiring de red).
- **El usuario arma las pantallas de detalle** (Sprint 5): `app/parada/[id].tsx` y `app/linea/[id].tsx`. Para cuando lleguemos a ese sprint, la base ya va a estar lista (hooks `useParadaDetalle`, `lib/subte/*`, componentes de mapa, providers), así que el usuario puede enfocarse pura y exclusivamente en construir la UI de esas dos pantallas usando los hooks/datos ya armados — buen punto de entrada a React Native sin pelear con setup nativo (MapLibre, permisos GPS, etc.).
- En el `todo-list.json` (ver abajo) cada tarea de Sprint 5 queda marcada con `"owner": "user"`; el resto con `"owner": "assistant"`. Esto es un punto de partida — se puede renegociar sprint a sprint si el usuario quiere sumar o soltar alguna pantalla.

## Seguimiento: `todo-list.json`

Para llevar registro de qué está hecho, en progreso o pendiente (y quién lo hace), se crea en la raíz de `suba-mobile/` un archivo `todo-list.json` como parte del Sprint 0. Esquema:

```json
{
  "updated_at": "2026-08-17",
  "tasks": [
    {
      "id": "S0-0",
      "sprint": 0,
      "title": "Crear docs/plan-migracion.md (copia persistente del plan) y este todo-list.json",
      "owner": "assistant",
      "status": "pending",
      "notes": "Fuente de verdad legible dentro del repo, versionada en git",
      "files": ["docs/plan-migracion.md", "todo-list.json"]
    },
    {
      "id": "S0-1",
      "sprint": 0,
      "title": "Bootstrap proyecto Expo + TypeScript",
      "owner": "assistant",
      "status": "pending",
      "notes": "",
      "files": ["app.json", "package.json", "eas.json"]
    },
    {
      "id": "S0-2",
      "sprint": 0,
      "title": "Configurar EAS (perfiles development/preview/production)",
      "owner": "assistant",
      "status": "pending",
      "notes": "",
      "files": ["eas.json"]
    },
    {
      "id": "S1-1",
      "sprint": 1,
      "title": "Portar useGPS a expo-location",
      "owner": "assistant",
      "status": "pending",
      "notes": "Preservar shape GPSStatus/GPSState de bondiya/shared/hooks/useGPS.ts",
      "files": ["shared/hooks/useGPS.ts"]
    },
    {
      "id": "S1-2",
      "sprint": 1,
      "title": "Portar Theme/Locale/Accedido context",
      "owner": "assistant",
      "status": "pending",
      "notes": "localStorage->AsyncStorage, sessionStorage->zustand en memoria",
      "files": ["shared/context/ThemeContext.tsx", "shared/context/LocaleContext.tsx", "shared/context/AccedidoStore.ts"]
    },
    {
      "id": "S1-3",
      "sprint": 1,
      "title": "Mapa base con MapLibre + OpenFreeMap",
      "owner": "assistant",
      "status": "pending",
      "notes": "Reimplementar shared/components/mapa/Mapa.tsx, reusar shared/types/mapa.ts sin cambios",
      "files": ["shared/components/mapa/Mapa.tsx", "shared/types/mapa.ts"]
    },
    {
      "id": "S2-1",
      "sprint": 2,
      "title": "Bundlear data/subtes/processed/*.json como assets",
      "owner": "assistant",
      "status": "pending",
      "notes": "",
      "files": ["data/subtes/processed/"]
    },
    {
      "id": "S2-2",
      "sprint": 2,
      "title": "Portar lib/subte/*.ts (14 archivos + index) verbatim",
      "owner": "assistant",
      "status": "pending",
      "notes": "",
      "files": ["lib/subte/"]
    },
    {
      "id": "S2-3",
      "sprint": 2,
      "title": "Portar useParadaDetalle.ts",
      "owner": "assistant",
      "status": "pending",
      "notes": "",
      "files": ["features/paradas/hooks/useParadaDetalle.ts"]
    },
    {
      "id": "S3-1",
      "sprint": 3,
      "title": "Portar useSubtes.ts (forecast/alertas) contra API de bondiya",
      "owner": "assistant",
      "status": "pending",
      "notes": "EXPO_PUBLIC_API_ORIGIN + AppState/focusManager para refetch on foreground",
      "files": ["features/subtes/hooks/useSubtes.ts"]
    },
    {
      "id": "S4-1",
      "sprint": 4,
      "title": "Portar Buscador (BuscadorFallback, ChipsAccesoRapido)",
      "owner": "assistant",
      "status": "pending",
      "notes": "",
      "files": ["features/buscar/components/"]
    },
    {
      "id": "S5-1",
      "sprint": 5,
      "title": "Pantalla detalle de estación (parada/[id])",
      "owner": "user",
      "status": "pending",
      "notes": "Portar lógica de bondiya app/parada/[id]/page.tsx + ParadaPageClient.tsx (sin SSR/JSON-LD), usando useParadaDetalle ya armado",
      "files": ["app/parada/[id].tsx"]
    },
    {
      "id": "S5-2",
      "sprint": 5,
      "title": "Pantalla detalle de línea (linea/[id])",
      "owner": "user",
      "status": "pending",
      "notes": "Portar lógica de bondiya app/linea/[id]/page.tsx + LineaPageClient.tsx (sin SSR/JSON-LD), usando lib/subte/linea-horarios.ts ya portado",
      "files": ["app/linea/[id].tsx"]
    },
    {
      "id": "S6-1",
      "sprint": 6,
      "title": "Unificar colores de línea de subte (constants/subteColors.ts)",
      "owner": "assistant",
      "status": "pending",
      "notes": "GTFS route_color como fuente de verdad",
      "files": ["shared/constants/subteColors.ts"]
    },
    {
      "id": "S6-2",
      "sprint": 6,
      "title": "Bottom-sheet de Configuración",
      "owner": "assistant",
      "status": "pending",
      "notes": "",
      "files": []
    },
    {
      "id": "S6-3",
      "sprint": 6,
      "title": "Política de privacidad + EAS Build/Submit a Play Store",
      "owner": "assistant",
      "status": "pending",
      "notes": "Bloqueante: Play Store exige URL de política de privacidad por uso de ACCESS_FINE_LOCATION",
      "files": []
    }
  ]
}
```

`status` acepta `"pending" | "in_progress" | "done"`. A medida que avancemos, este archivo se va actualizando (a mano o pidiéndome que lo actualice) para tener una foto rápida del progreso sin depender de leer git log.

---

## Explícitamente fuera de v1
`features/colectivos/*`, `app/api/colectivos/route.ts`, `lib/colectivos-gcba.ts`, `lib/paradas-mock.ts`, `app/api/parada/[id]/route.ts` (está 100% mockeado, nada real que portar todavía).

## Testing
Bondiya no tiene tests. Para suba-mobile, agregar `jest` + `jest-expo` (preset oficial de Expo) acotado a la capa pura `lib/subte/*.ts` (funciones determinísticas sobre JSON estático — el lugar de mayor retorno con menor esfuerzo). No testear MapLibre ni flujos de permisos GPS con unit tests — cubrir eso con QA manual en dispositivo real como checklist del Sprint 6.

---

## Archivos críticos de bondiya para referenciar/portar
- `lib/subte/index.ts` (+ sus 13 archivos hermanos) — capa de datos GTFS pura, base de todo.
- `shared/hooks/useGPS.ts` — contrato de estados a preservar en el port con `expo-location`.
- `shared/components/mapa/Mapa.tsx` + `shared/types/mapa.ts` — lógica de mapa a reimplementar con MapLibre; los tipos se mantienen igual.
- `features/subtes/hooks/useSubtes.ts` — targets de fetch y polling exactos a replicar.
- `features/paradas/hooks/useParadaDetalle.ts` — patrón de referencia para hooks de vista compuestos.
- `app/provider.tsx` — orden de providers a replicar en `app/_layout.tsx`.
- `data/subtes/processed/` — los JSON de GTFS a bundlear.

## Verificación
- Cada sprint: `npx tsc --noEmit` limpio.
- Sprint 1 en adelante: correr con development build (`eas build --profile development` o `npx expo run:android`) en un dispositivo/emulador Android real, porque MapLibre no corre en Expo Go.
- Sprint 3: confirmar en dispositivo que el polling de forecast/alertas sigue funcionando al volver la app a foreground (verificar el wiring de `AppState`/`focusManager`).
- Sprint 6: build de `preview` (APK) instalado en un Android físico antes de enviar el `production` (AAB) a Play Store; checklist manual de permisos GPS (otorgado/denegado/revocado desde Settings).
