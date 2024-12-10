import DetailsPage from "@/components/layouts/DetailsPage";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: number }>;
}) {
    // Resolve the promise
    const resolvedParams = await params;

    return <DetailsPage params={resolvedParams} />;
}
