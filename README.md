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

### 1 Instalar dependencias

```bash
npm install
```

### 2 Ejecutar servidor de desarrollo

```bash
npm run dev
```

### 3 Abrir la aplicación

 URL: [http://localhost:3000](http://localhost:3000)

---

##  Notas

* Asegurate de que PostgreSQL esté corriendo si usás el proyecto sin Docker.
* No olvides configurar correctamente las variables de entorno antes de iniciar la app.
