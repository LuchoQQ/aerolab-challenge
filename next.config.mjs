/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https", // Asegúrate de que el protocolo sea https
                hostname: "images.igdb.com", // El hostname correcto
                port: "", // Deja vacío, ya que no estamos usando un puerto específico
                pathname: "/igdb/image/upload/**", // Permite todas las imágenes que coincidan con este patrón
            },
        ],
    },
};

export default nextConfig;
