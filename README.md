# Lasarvision — Dashboard (React + Vite)

Este repo es el **frontend** del dashboard de Lasarvision.

La idea es que sea **fácil de operar** para el equipo de backend:
- variables de entorno claras
- un solo punto de integración (Supabase hoy; API propia opcional mañana)
- comandos estándar (dev/build/lint)

---

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Variables de entorno (mínimas)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Si faltan, la app entra en **Demo mode** (ver `src/EnvGate.tsx`) y deshabilita login/escritura.

---

## Integración con backend (lo importante)

### Opción A (actual): Supabase como backend
- Cliente Supabase: `@supabase/supabase-js`
- Auth + DB se consumen desde el navegador.

**Schema**
- `supabase/schema.sql` contiene el esquema base.

Recomendación para backend:
1) Crear proyecto en Supabase (staging/prod)
2) Aplicar `supabase/schema.sql`
3) Crear policies (RLS) + roles según acceso

> Nota: si necesitas que el dashboard NO use `anon_key` directamente,
> migramos el acceso a un backend (Opción B) y el frontend solo llama APIs.

### Opción B (futuro): API propia (Node/Python/etc.)
Si el backend prefiere un control total (RBAC, auditoría, rate limits):
- agregar `VITE_API_BASE_URL`
- encapsular llamadas en `src/lib/api/*`

---

## Scripts

```bash
npm run dev      # Vite dev server
npm run build    # Typecheck + build a /dist
npm run preview  # Preview build
npm run lint     # ESLint
```

---

## Estructura recomendada (para escalar sin caos)

- `src/pages/*` rutas/pantallas
- `src/components/*` componentes UI reutilizables
- `src/lib/*` clientes (supabase), helpers y utilidades
- `src/contexts/*` estado global de UI/auth

Si esto crece mucho: movemos a `src/features/<feature>/*` (vertical slicing).

---

## Deploy (Vercel)

- Build output: `dist/`
- SPA routing: manejado con `vercel.json` (rewrites a `/`).

---

## Convenciones (para backend devs)

- **No agregar dependencias** sin justificar: qué resuelve, alternativa, costo.
- Todo acceso a datos debe pasar por:
  - `src/lib/supabaseClient.ts` (si usamos Supabase directo), o
  - `src/lib/api/*` (si usamos API propia)

Si me dices qué stack de backend usarán (Supabase / Node / Python), lo ajusto al flujo ideal.
