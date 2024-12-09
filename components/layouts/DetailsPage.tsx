"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Calendar, PuzzleIcon, Star } from "lucide-react";
import { Toaster } from "react-hot-toast";


import Game, { Genre } from "@/interfaces/Game";
import TagInfo from "@/components/TagInfo";
import SimilarGames from "@/components/sections/SimilarGames";
import MediaSection from "@/components/sections/MediaSection";
import DetailsHeader from "@/components/sections/DetailsHeader";
import { gameService } from "@/services/gameService";
import { formatDate } from "@/lib/utils";
import { Vortex } from "react-loader-spinner";
import GameInfo from "../sections/GameInfo";

const DEFAULT_GAME: Game = {
    id: 1,
    name: "default",
    cover: { url: "" },
    first_release_date: 0,
    added: 0,
    summary: "",
    platforms: [],
    rating: 0,
    involved_companies: [],
    screenshots: [],
    genres: [],
    similar_games: [],
    url: "",
};

type Props = {
    params: { slug: string };
};

const GameDetailsContent: React.FC<Props> = ({ params }) => {
    const [data, setData] = useState(DEFAULT_GAME);
    const [similarGames, setSimilarGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGameData = async () => {
            if (!params.slug) return;

            try {
                setIsLoading(true);

                const [gameData, similarGamesDetails] = await Promise.all([
                    gameService.fetchGameDetails(params.slug),
                    params.slug
                        ? gameService.fetchSimilarGames(
                              (
                                  await gameService.fetchGameDetails(
                                      params.slug
                                  )
                              ).similar_games || []
                          )
                        : Promise.resolve([]),
                ]);

                setData(gameData);
                setSimilarGames(similarGamesDetails);
            } catch (error) {
                console.error("Error in game data fetching:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGameData();
    }, [params.slug]);

    const getCarouselImages = () =>
        data.screenshots?.map((image) => `https:${image.url}`) || [];

    const getGenreNames = () =>
        data.genres?.map((genre: Genre) => genre.name).join(" & ") || "N/A";

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

    return (
        <div>
            <div className="px-4  max-w-screen-md w-full justify-self-center">
                <DetailsHeader
                    url={data.cover?.url?.replace("thumb", "cover_big") || ""}
                    data={data}
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
                    <SimilarGames similarGames={similarGames} />
                </div>
            </div>
        </div>
    );
};

const DetailsPage: React.FC<Props> = (props) => (
    <Suspense
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
    </Suspense>
);

export default DetailsPage;
