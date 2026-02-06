# 📦 Inventory Management Frontend — Next.js + TypeScript

Frontend desarrollado como parte de un **technical test**, enfocado en la gestión de inventario, bienes, reportes y movimientos.  
La aplicación **consume endpoints del backend** según los requerimientos del reto, sin replicar lógica de negocio del servidor.

---

## 🧩 Stack Tecnológico

- **Next.js** (App Router)
- **TypeScript**
- **React**
- **Tailwind CSS**
- **Jest + React Testing Library**
- **JWT Auth**
- **Fetch API**
- **React Hot Toast**

---

## 🎯 Funcionalidades Implementadas

### ✅ Gestión de Categorías
- Listado de categorías
- Creación y actualización

### ✅ Gestión de Bienes (Items)
- Alta individual
- Alta por lote
- Listado con filtros
- Activación / desactivación

### ✅ Reportes
- Reportes por categoría
- Métricas de activos vs dados de baja

### ✅ Movimientos de Inventario
- Historial de movimientos
- Filtro por tipo (Altas / Bajas)

## 🔌 Integración con Backend

Este frontend **consume datos exclusivamente desde el backend mock implementado en la misma app**, usando endpoints como:

- `/categories`
- `/items`
- `/reports/category`
- `/movements`
- `/auth`

Toda la lógica de persistencia y reglas de negocio reside en el servidor local.

---

## 🔐 Autenticación (JWT)

El proyecto utiliza **JWT (JSON Web Tokens)** para la autenticación del administrador.

### Implementación:
- Tokens almacenados en **cookies HTTP**
- Validación del token mediante **middleware de Next.js**
- Protección de rutas privadas (`/admin/*`)
- Redirección automática si el usuario no está autenticado
- Acceso bloqueado a páginas protegidas sin sesión válida

📌 Esto asegura que solo usuarios autenticados puedan acceder al panel administrativo.

---

## ▶️ Cómo Ejecutar el Proyecto

### 1️⃣ Instalar dependencias

```bash
npm install
```

### 2️⃣ Ejecutar en modo desarrollo

```bash
npm run dev
```

### 3️⃣ Abrir en el navegador:

```bash
http://localhost:3000
```
### 4️⃣ Iniciar sesión con credenciales de prueba:
- **Email**: `admin@test.com`
- **Password**: `123456`

---

## 🧪 Ejecutar Tests

El proyecto incluye **tests unitarios y de integración básicos** usando **Jest** y **React Testing Library**.

### ▶️ Ejecutar todos los tests

```bash
npm run test
```

---

## 🧪 Sobre los Tests Implementados

Se incluyeron **tests unitarios y de integración básicos**, seleccionados estratégicamente para validar:

### ✔️ Unit Tests
- Servicios que consumen API
- Manejo de errores en peticiones
- Normalización de respuestas del backend

### ✔️ Integration Tests
- Renderizado de páginas clave
- Carga de datos asincrónicos
- Aplicación de filtros en UI
- Interacción entre componentes y estado

> No se busca cobertura completa, sino demostrar **cómo estructurar tests útiles, mantenibles y realistas en frontend**.

---

## 📎 Notas Finales

Este proyecto fue desarrollado priorizando:

- Arquitectura clara y modular
- Separación entre lógica de UI y consumo de API
- Buenas prácticas en React + Next.js
- Experiencia de usuario simple y funcional
- Testing práctico enfocado en casos reales

El alcance del testing es **intencionalmente parcial**, ya que el objetivo principal del reto es demostrar **criterio técnico, estructura limpia y capacidad de integración frontend**, más que cobertura total.

---

## 👤 Autor

**Justin Yamberla**  
Frontend Developer

---