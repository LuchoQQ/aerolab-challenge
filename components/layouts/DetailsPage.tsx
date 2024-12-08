"use client";

import React, { useEffect, useState } from "react";
import { Calendar, PuzzleIcon, Star } from "lucide-react";
import { Toaster } from "react-hot-toast";

import useGameStore from "@/stores/gameStore";

import Game, { Genre } from "@/interfaces/Game";
import TagInfo from "@/components/TagInfo";
import SimilarGames from "@/components/sections/SimilarGames";
import MediaSection from "@/components/sections/MediaSection";
import CollectButton from "@/components/CollectButton";
import DetailsHeader from "@/components/sections/DetailsHeader";
import { gameService } from "@/services/gameSservice";
import { formatDate } from "@/lib/utils";

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

const DetailsPage: React.FC<Props> = ({ params }) => {
    const [data, setData] = useState<Game>(DEFAULT_GAME);
    const [similarGames, setSimilarGames] = useState<Game[]>([]);
    const { addGame, collectedGames } = useGameStore();

    const isGameCollected = collectedGames.some(
        (game: Game) => game.id === data.id
    );

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                // Fetch main game details
                const gameData = await gameService.fetchGameDetails(
                    params.slug
                );
                setData(gameData);

                // Fetch similar games if available
                if (gameData.similar_games?.length) {
                    const similarGamesDetails =
                        await gameService.fetchSimilarGames(
                            gameData.similar_games
                        );
                    setSimilarGames(similarGamesDetails);
                }
            } catch (error) {
                console.error("Error in game data fetching:", error);
            }
        };

        if (params.slug) {
            fetchGameData();
        }
    }, [params.slug]);

    const getCarouselImages = () =>
        data.screenshots?.map((image) => `https:${image.url}`) || [];

    const getGenreNames = () =>
        data.genres?.map((genre: Genre) => genre.name).join(" & ") || "N/A";

    const handleAddGame = () => {
        addGame(data);
    };

    return (
        <div className="px-4">
            <DetailsHeader
                url={data.cover?.url?.replace("thumb", "cover_big") || ""}
                data={data}
            />

            <CollectButton
                isGameCollected={isGameCollected}
                handleAddGame={handleAddGame}
                data={data}
            />

            <Toaster />

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
                    value={getGenreNames()}
                />
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <MediaSection carouselImages={getCarouselImages()} />
                <SimilarGames similarGames={similarGames} />
            </div>
        </div>
    );
};

export default DetailsPage;
