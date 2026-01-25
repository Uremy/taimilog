import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      // 1. Unsplash (Nuevo) 📸
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // 2. Picsum (Para pruebas)
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      // 3. GitHub (Issues y Avatares)
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      // 4. jsDelivr (Tu Repo Mochila)
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      // 5. Cloudinary (Futuro)
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
    ];
  },
};

export default withMDX(config);