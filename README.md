# Taimilog

> **Jardín digital, apuntes de medicina y contemplaciones.**

Taimilog es un espacio digital personal y evolutivo dedicado a sistematizar el aprendizaje en el camino por la medicina, así como a albergar ensayos y escritos independientes. 

Funciona como un segundo cerebro público donde las ideas germinan y crecen orgánicamente. Está construido sobre una arquitectura estática ultrarrápida y orientada al rendimiento, priorizando la lectura profunda sin distracciones ni latencia.

---

## 🛠️ Stack Tecnológico

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router, SSG & Edge Runtime)
* **Gestor de Contenido / Docs:** [Fumadocs](https://fumadocs.dev/) (Framework Mode con MDX)
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Lenguaje:** TypeScript

---

## 📂 Estructura del Proyecto

El repositorio está dividido en dos grandes colecciones de conocimiento gestionadas de forma independiente:

| Ruta / Carpeta | Descripción |
| :--- | :--- |
| `app/(home)` | Portada principal, telemetría de interfaz y manifiesto. |
| `app/medicina` | **Sistema 01:** Apuntes clínicos y resúmenes de la carrera de Medicina (ciencias básicas y clínicas). |
| `app/biblioteca` | **Sistema 02:** El jardín digital (ensayos, blog, reflexiones literarias y marcadores). |
| `app/og` | Enrutador unificado para la generación estática de tarjetas sociales (Open Graph) por colección. |
| `content/` | Archivos fuente en formato `.mdx` organizados por semestre, materia y sección. |
| `lib/source.ts` | Adaptador de contenido y configuración de *loaders* para las colecciones en Fumadocs. |

---

## 🚀 Desarrollo Local

Asegúrate de tener instalado **Node.js** (v20 o superior). Clona el repositorio y ejecuta el servidor de desarrollo con tu gestor de paquetes preferido:

```bash
# Instalar dependencias
npm install
# o
pnpm install

# Iniciar servidor local
npm run dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado en tiempo real. 

### Comando de Compilación (Producción)

Para validar el pre-renderizado estático (SSG), la generación de índices de búsqueda y las imágenes OG:

```bash
npm run build
```

---

## 📜 Licencia

El código fuente es de libre referencia para propósitos educativos y de arquitectura web. Los apuntes clínicos y ensayos son de autoría personal.
