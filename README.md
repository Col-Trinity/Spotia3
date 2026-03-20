# Spotia App

Aplicación construida con **Next.js**, autenticación mediante **NextAuth**, base de datos **PostgreSQL/Supabase** y análisis de música con **IA**.

---

## 📋 Requisitos

Antes de comenzar, asegurate de tener instalado:

1. **Node.js** 18+ ([descargar](https://nodejs.org/))
2. **pnpm** ([instalar](https://pnpm.io/installation))
3. **Docker** y **Docker Compose** (opcional, solo para desarrollo local con BD)
4. Una cuenta en **Supabase** (para producción) o PostgreSQL local (para desarrollo)

---

## 🚀 Instalación rápida

### 1. Clonar el repositorio

```bash
git clone https://github.com/Col-Trinity/Spotia3.git
cd Spotia3
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` y renómbralo a `.env.local`:

```bash
cp .env.example .env.local
```

Luego, rellena las variables necesarias:

```dotenv
# NextAuth
NEXTAUTH_URL="http://127.0.0.1:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Spotify OAuth
SPOTIFY_CLIENT_ID="your-spotify-client-id"
SPOTIFY_CLIENT_SECRET="your-spotify-client-secret"

# Gemini AI
AI_PROVIDER="gemini"
GEMINI_API_KEY="your-gemini-api-key"

# Base de datos - Elige una opción:

# Opción A: Supabase (Producción - recomendado)
DATABASE_URL="postgresql://postgres:your-password@db.xxx.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Opción B: PostgreSQL Local (Desarrollo)
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="your-local-password"
POSTGRES_DB="spotia"
```

---

## 🗄️ Configuración de la Base de Datos

### Opción 1: Supabase (Producción)

1. Ve a [Supabase](https://supabase.com) y crea un proyecto
2. Copia tu URL y API Key en `.env.local`
3. **Ejecuta las migraciones para crear las tablas:**

```bash
pnpm run db:migrate
```

**Para verificar que funcionó:**

```bash
pnpm run dev
```

### Opción 2: PostgreSQL Local (Desarrollo)

1. Levanta Docker Compose:

```bash
docker-compose up -d
```

2. Aplica las migraciones:

```bash
pnpm run db:migrate
```

3. (Opcional) Abre Drizzle Studio:

```bash
pnpm run db:studio
```

---

## 🎯 Variables de Entorno - Guía detallada

### Spotify OAuth

1. Ve a [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Crea una nueva aplicación
3. Copia `Client ID` y `Client Secret`
4. En "Redirect URIs" agrega: `http://localhost:3000/api/auth/callback/spotify`

### Gemini API

1. Ve a [Google AI Studio](https://aistudio.google.com/apikey)
2. Crea una nueva API Key
3. Cópiala en `GEMINI_API_KEY`

### Supabase

1. Ve a [Supabase](https://supabase.com) y crea un proyecto
2. En **Settings → API** copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. En **Settings → Database** copia la conexión PostgreSQL → `DATABASE_URL`

---

## 📦 Scripts disponibles

```bash
# Desarrollo
pnpm run dev              # Inicia el servidor en modo desarrollo
pnpm run build            # Compila para producción
pnpm run start            # Inicia el servidor de producción

# Base de datos
pnpm run db:migrate       # Aplica migraciones (Drizzle)
pnpm run db:generate      # Genera nuevas migraciones
pnpm run db:studio        # Abre Drizzle Studio (UI para la BD)
pnpm run db:dev           # Levanta PostgreSQL con Docker

# Testing
pnpm run test             # Corre los tests
pnpm run test:watch       # Corre tests en modo watch

# Código
pnpm run lint             # Ejecuta ESLint
```

---

## 📁 Estructura del proyecto

```
Spotia3/
├── src/
│   ├── app/              # Rutas y páginas de Next.js
│   ├── components/       # Componentes React reutilizables
│   ├── db/
│   │   ├── schema.ts     # Esquema de la base de datos
│   │   └── migrations/   # Migraciones de Drizzle
│   ├── lib/
│   │   ├── generations.ts # Funciones para consultar generaciones
│   │   ├── supabase.ts   # Cliente de Supabase
│   │   └── aiClient.ts   # Integración con Gemini
│   └── types/            # Tipos TypeScript
├── .env.local            # Variables de entorno (no subir a git)
├── .env.example          # Plantilla de variables
├── drizzle.config.ts     # Configuración de Drizzle ORM
└── package.json
```

---

## 🗃️ Estructura de la Base de Datos

### users

- `id` (UUID): ID único del usuario
- `email` (varchar): Email del usuario
- `name` (varchar): Nombre del usuario
- `image` (text): URL de la foto de perfil
- `created_at` (timestamp): Fecha de creación
- `updated_at` (timestamp): Última actualización

### generations

- `id` (UUID): ID único de la generación
- `user_id` (UUID): Relación con el usuario
- `generation` (JSON): Datos de la generación de IA
- `created_at` (timestamp): Fecha de creación
- `updated_at` (timestamp): Última actualización (se actualiza cada 3 meses automáticamente)

### accounts, sessions, verification_tokens

- Tablas de NextAuth para autenticación y gestión de sesiones

---

## 🛠️ Desarrollo Local (Sin Docker)

Si **no quieres usar Docker**, puedes desarrollar contra Supabase directamente:

1. Sigue los pasos de "Instalación rápida"
2. Usa **Supabase** (opción recomendada)
3. Ejecuta:

```bash
pnpm run dev
```

---

## ⚠️ Problemas conocidos y soluciones

### Error: "Cannot connect to Supabase"

```
Error: getaddrinfo ENOTFOUND xxx.supabase.co
```

**Soluciones:**

- Verifica que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` estén correctos
- Si estás en Argentina, considera usar una **VPN** (Cloudflare WARP, ProtonVPN, etc.)
- Verifica tu conexión a internet

### Error: "Starting..." se queda colgado

Elimina la carpeta `.next` y vuelve a intentar:

```bash
rm -rf .next
pnpm run dev
```

### Error de migraciones con Drizzle

Asegúrate de que:

1. Tienes las variables de entorno correctas
2. PostgreSQL está corriendo (si es local)
3. Ejecuta: `pnpm run db:generate` antes de `pnpm run db:migrate`

### RLS (Row Level Security) en Supabase

Las políticas de seguridad ya están configuradas:

- ✅ Los usuarios solo ven sus propios datos
- ✅ Las generaciones se actualizan automáticamente cada 3 meses
- ⚠️ Esto es **crítico para producción** - no lo desactives

---

## 🔐 Seguridad

- **Nunca publiques tu `.env.local`** en GitHub
- El archivo `.gitignore` ya excluye `.env.local`
- Las variables `NEXT_PUBLIC_*` son públicas (usadas en el navegador)
- Las otras variables son privadas (solo en el servidor)

---

## 🤝 Contribuir

1. Crea una rama: `git checkout -b feature/tu-feature`
2. Commit tus cambios: `git commit -m 'Agrego nueva feature'`
3. Push a la rama: `git push origin feature/tu-feature`
4. Abre un Pull Request

---

## 📝 Notas importantes

- **Base de datos**: Spotia usa Supabase en producción y PostgreSQL local en desarrollo
- **Autenticación**: NextAuth maneja Spotify OAuth y email/password
- **IA**: Usa Gemini de Google para analizar música
- **ORM**: Drizzle ORM para type-safe database queries
- **Framework**: Next.js 16 con React 19

---

## 📞 Ayuda

Si tienes problemas:

1. Verifica tu `.env.local` está bien configurado
2. Lee los logs en la consola (F12)
3. Consulta la sección "Problemas conocidos" arriba
4. Pregunta en Discord o abre un Issue

---

**¡Happy coding! 🚀**
