"use client";

import React from "react";
import { Calendar, PuzzleIcon, Star } from "lucide-react";
import { Vortex } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";

import { Genre } from "@/interfaces/Game";
import TagInfo from "@/components/TagInfo";
import SimilarGames from "@/components/sections/SimilarGames";
import MediaSection from "@/components/sections/MediaSection";
import DetailsHeader from "@/components/sections/DetailsHeader";
import GameInfo from "@/components/sections/GameInfo";
import { formatDate } from "@/lib/utils";
import { useGameDetails, useSimilarGames } from "@/hooks/useGameQueries";

type Props = {
    params: { slug: string };
};

const GameDetailsContent: React.FC<Props> = ({ params }) => {
    const { data, isLoading: isLoadingGame } = useGameDetails(params.slug);
    const { data: similarGames, isLoading: isLoadingSimilarGames } = useSimilarGames(params.slug);

    const isLoading = isLoadingGame || isLoadingSimilarGames;

    const getCarouselImages = () =>
        data?.screenshots?.map((image) => `https:${image.url}`) || [];

    const getGenreNames = () =>
        data?.genres?.map((genre: Genre) => genre.name).join(" & ") || "N/A";

    // Spinner con espacio reservado para evitar CLS
    if (isLoading) {
        return (
            <div
                className="flex justify-center items-center"
                style={{ minHeight: "calc(100vh - 160px)" }} // Espacio fijo para evitar CLS
            >
                <Vortex
                    visible={true}
                    height={80}
                    width={80}
                    ariaLabel="vortex-loading"
                    wrapperClass="vortex-wrapper"
                    colors={[
                        "#FF00AE",
                        "#3c1661",
                        "#D23F63",
                        "#67c076",
                        "orange",
                        "#3C1661",
                    ]}
                />
            </div>
        );
    }

    // Sin datos
    if (!data) {
        return <div className="text-center">No game data found</div>;
    }

    return (
        <div>
            {/* Toaster con posición fija */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 5000,
                    style: { zIndex: 9999 },
                }}
            />

            {/* Contenido principal */}
            <div className="px-4 max-w-screen-md w-full justify-self-center">
                <DetailsHeader
                    url={data.cover?.url?.replace("thumb", "cover_big") || ""}
                    data={data}
                />

                <div className="flex flex-wrap gap-3 mt-5">
                    <TagInfo
                        icon={Star}
                        label="Rating"
                        value={data.rating ? (data.rating / 10).toFixed(1) : "N/A"}
                    />
                    <TagInfo
                        icon={Calendar}
                        label="Release"
                        value={formatDate(data.first_release_date)}
                    />
                    <TagInfo
                        icon={PuzzleIcon}
                        label="Genre"
                        value={`${getGenreNames().slice(0, 40)}...`}
                    />
                </div>

                <div className="flex flex-col gap-4 mt-6">
                    <GameInfo data={data} />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    <MediaSection carouselImages={getCarouselImages()} />
                    <SimilarGames similarGames={similarGames || []} />
                </div>
            </div>
        </div>
    );
};

const DetailsPage: React.FC<Props> = (props) => (
    <React.Suspense
        fallback={
            <div
                className="flex justify-center items-center"
                style={{ minHeight: "calc(100vh - 160px)" }} // Espacio reservado
            >
                <Vortex
                    visible={true}
                    height={80}
                    width={80}
                    ariaLabel="vortex-loading"
                    wrapperClass="vortex-wrapper"
                    colors={[
                        "#FF00AE",
                        "#3c1661",
                        "#D23F63",
                        "#67c076",
                        "orange",
                        "#3C1661",
                    ]}
                />
            </div>
        }
    >
        <GameDetailsContent {...props} />
    </React.Suspense>
);

export default DetailsPage;
