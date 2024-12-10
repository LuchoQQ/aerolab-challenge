import { InvolvedCompanies } from "@/interfaces/Game";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}



export function findCompany(involved_companies: InvolvedCompanies[], type = "developer"): { name: string; id: number } | null {
    let company = null;
    if (involved_companies) {
        involved_companies.forEach((involved_company: InvolvedCompanies) => {
            if (type === "developer" && involved_company.developer === true) {
                company = {
                    id: involved_company.company.id,
                    name: involved_company.company.name,
                }
            } else if (type === "publisher" && involved_company.publisher === true) {
                company = {
                    id: involved_company.company.id,
                    name: involved_company.company.name,
                }
            }
        });
    }
    return company; // company can be null
}


export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month < 10 ? "0" + month : month}/${year}`;
};

export function createSlug(name: string | undefined | null, id: number): string {
    // If name is undefined or null, use a default slug
    if (!name) {
        return `game-${id}`;
    }

    return `${name.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .trim()}-${id}`;
}
export function normalizeImageUrl(url?: string): string {
    if (!url) return '/fallback.webp';

    // If the URL starts with //, prepend https:
    if (url.startsWith('//')) {
        return `https:${url}`;
    }

    // If the URL is already absolute, return it as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    // If it's a relative path, you might want to handle it differently
    return `/fallback.webp`;
}