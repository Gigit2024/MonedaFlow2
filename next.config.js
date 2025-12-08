/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Solo incluye opciones experimentales válidas para tu versión
    // serverActions: true, // si necesitas Server Actions
    // optimizeCss: true,  // si usas optimización CSS
  }
}

module.exports = nextConfig