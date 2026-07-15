/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/menu", destination: "/", permanent: true },
      { source: "/galeria", destination: "/", permanent: true },
      { source: "/opiniones", destination: "/", permanent: true },
      { source: "/picado-fino/menu", destination: "/picado-fino", permanent: true },
      { source: "/picado-fino/galeria", destination: "/picado-fino", permanent: true },
      { source: "/picado-fino/opiniones", destination: "/picado-fino", permanent: true },
      { source: "/la-esquina/menu", destination: "/la-esquina", permanent: true },
      { source: "/la-esquina/galeria", destination: "/la-esquina", permanent: true },
      { source: "/la-esquina/opiniones", destination: "/la-esquina", permanent: true },
      { source: "/picado", destination: "/picado-fino", permanent: false },
      { source: "/picado/:path*", destination: "/picado-fino/:path*", permanent: false },
    ]
  },
}

export default nextConfig
