import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*', // Aplica las reglas a todos los bots de búsqueda
            allow: '/', // Permite rastrear todo el sitio
            disallow: '/private/', // Evita que los bots rastreen rutas privadas
        },
        sitemap: 'https://aerolab-challenge-steel.vercel.app/', // Ubicación de tu mapa del sitio
    }
}