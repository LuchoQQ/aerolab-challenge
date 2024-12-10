import DetailsPage from "@/components/layouts/DetailsPage";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: number }>;
}) {
    // resolver los params
    const resolvedParams = await params;

    return <DetailsPage params={resolvedParams} />;
}
