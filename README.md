# Spotia App

Aplicación construida con **Next.js**, autenticación mediante **NextAuth**, base de datos **PostgreSQL** y orquestación con **Docker Compose**.

---

## Requisitos

Antes de comenzar, asegurate de tener instalado:

1. **Docker**
2. **Docker Compose**
3. **Node.js** (solo si vas a correr el proyecto sin Docker)

---

## Instalación y ejecución (con Docker)

### 1 Clonar el repositorio

```bash
git clone https://github.com/usuario/spotia-app.git
cd spotia-app
```

### 2 Configurar variables de entorno

Copiá el archivo `.env.example` y renombralo a `.env`:

```bash
cp .env.example .env
```

Contenido del archivo `.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/spotia
NEXTAUTH_SECRET=changeme
```

### 3 Levantar los servicios

```bash
docker-compose up -d
```

### 4 Abrir la aplicación

 URL: [http://localhost:3000](http://localhost:3000)

---

## Servicios

* **app**: Aplicación Next.js (Frontend + Backend).
* **db**: Base de datos PostgreSQL con volumen persistente.

---

## Comandos útiles

```bash
docker-compose up -d        # Levanta los servicios
docker-compose down         # Detiene y elimina los contenedores
docker-compose logs app     # Ver logs de la aplicación
```

Entrar directamente a la base de datos:

```bash
docker exec -it spotia-db psql -U postgres -d spotia
```

---

##  Desarrollo local (sin Docker)
### 1. Clonar el repositorio

```bash
git clone git@github.com:gianella12/Spotia3.git
cd spotia3
```

---
### 2 Instalar dependencias
con npm:

```bash
npm install
```
O con pnpm:

```bash
pnpm install
```

---

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto y agregar las variables necesarias.

Ejemplo:

```
DATABASE_URL=postgres://usuario:password@localhost:5432/nombre_db
```

Asegurarse de que la base de datos exista y esté en funcionamiento.

---

### 4. Ejecutar migraciones con Drizzle
Scripts definidos en `package.json`, también se puede ejecutar:

```bash
npm run db:generate
npm run db:migrate
```

---
### 5. Levantar el proyecto en modo desarrollo

```bash
npm run dev
```
O
```bash
pnpm run dev
```

El servidor estará disponible en:

```
http://localhost:3000
```

---


## ⚠️ Problema conocido

Si el proyecto queda detenido en `Starting...` al ejecutar `npm run dev`, eliminar la carpeta `.next` y volver a intentar:

```bash
rm -rf .next
npm run dev
```

##  Notas

* Asegurate de que PostgreSQL esté corriendo si usás el proyecto sin Docker.
* No olvides configurar correctamente las variables de entorno antes de iniciar la app tienes el archivo .env.example como referencia.
