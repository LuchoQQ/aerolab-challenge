import DetailsPage from "@/components/layouts/DetailsPage";
import { notFound } from 'next/navigation';

export default async function Page({
    params,
}: {
    params: { slug: string }; 
}) {
    // Extract the ID from the last part of the slug
    const idMatch = params.slug.match(/-(\d+)$/);
    
    if (!idMatch) {
        // If no ID is found, use Next.js notFound function
        notFound();
    }

    const gameId = parseInt(idMatch[1], 10);

    if (isNaN(gameId)) {
        // If parsing fails, use notFound
        notFound();
    }

    return <DetailsPage gameId={gameId} />;
}