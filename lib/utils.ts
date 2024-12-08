import { InvolvedCompanies } from "@/interfaces/Game";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}



export function findCompany(involved_companies: InvolvedCompanies[], type = "developer") {
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
        })
    }
    return company;
}


export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month < 10 ? "0" + month : month}/${year}`;
};