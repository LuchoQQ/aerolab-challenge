import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://aerolab-challenge-steel.vercel.app/',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://aerolab-challenge-steel.vercel.app/details/1',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ]
}