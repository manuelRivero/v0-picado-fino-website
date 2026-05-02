/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/menu", destination: "/", permanent: false },
      { source: "/galeria", destination: "/", permanent: false },
      { source: "/opiniones", destination: "/", permanent: false },
      { source: "/picado", destination: "/picado-fino", permanent: false },
      { source: "/picado/:path*", destination: "/picado-fino/:path*", permanent: false },
    ]
  },
}

export default nextConfig
