"use client";

import React, { useEffect } from "react";
import { Calendar, PuzzleIcon, Star } from 'lucide-react';
import { Toaster } from "react-hot-toast";

import TagInfo from "@/components/TagInfo";
import SimilarGames from "@/components/sections/SimilarGames";
import MediaSection from "@/components/sections/MediaSection";
import DetailsHeader from "@/components/sections/DetailsHeader";
import { formatDate } from "@/lib/utils";
import { Vortex } from "react-loader-spinner";
import GameInfo from "../sections/GameInfo";
import { useGameDetails, useSimilarGames } from '@/hooks/useGameQueries';
import { Genre } from "@/interfaces/Game";
import useGameStore from "@/stores/gameStore";

type Props = {
    params: { slug: number };
};

const GameDetailsContent: React.FC<Props> = ({ params }) => {
    // data store
    const { collectedGames, initializeStore, addGame } = useGameStore();

    // react query
    const { data, isLoading: isLoadingGame } = useGameDetails(params.slug);
    const { data: similarGames, isLoading: isLoadingSimilarGames } = useSimilarGames(params.slug);
   
    // inicializar data con el localstorage
    useEffect(() => {
        initializeStore();
    }, [initializeStore]);

    // flags
    const isLoading = isLoadingGame || isLoadingSimilarGames;

    // handlers
    const getCarouselImages = () =>
        data?.screenshots?.map((image) => `https:${image.url}`) || [];

    const getGenreNames = () =>
        data?.genres?.map((genre: Genre) => genre.name).join(" & ") || "N/A";

    if (isLoading) {
        return (
            <div className="flex justify-center items-center mt-40">
                <Vortex
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="vortex-loading"
                    wrapperStyle={{}}
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

    if (!data) {
        return <div>No game data found</div>;
    }

    return (
        <div>
            <div className="px-4  max-w-screen-md w-full justify-self-center">
                <DetailsHeader
                    url={data.cover?.url?.replace("thumb", "cover_big") || ""}
                    data={data}
                    collectedGames={collectedGames}
                    addGame={addGame}
                    id={params.slug}
                />

                <Toaster />

                <div className="flex flex-wrap gap-3 mt-5">
                    <TagInfo
                        icon={Star}
                        label="Rating"
                        value={
                            data.rating ? (data.rating / 10).toFixed(1) : "N/A"
                        }
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
            <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
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
        }
    >
        <GameDetailsContent {...props} />
    </React.Suspense>
);

export default DetailsPage;