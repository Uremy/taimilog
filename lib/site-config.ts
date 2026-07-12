// lib/site-config.ts
//
// Cambia SITE_URL por tu dominio de producción real (el que usa Vercel
// o tu dominio custom, sin slash final). Idealmente léelo de una env var
// para no hardcodear distintos valores entre preview y producción.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://taimilog.vercel.app';