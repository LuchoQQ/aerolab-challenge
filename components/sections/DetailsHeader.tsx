import Game from "@/interfaces/Game";
import { findCompany } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import CollectButton from "../CollectButton";

type Props = {
    url: string;
    data: Game;
    collectedGames: Game[];
    addGame: (data: Game) => void;
    id: number;
};

const DetailsHeader: React.FC<Props> = ({
    url,
    data,
    collectedGames,
    addGame,
    id,
}) => {
    const isGameCollected = collectedGames.some(
        (game: Game) => game.id === data.id
    );

    const handleAddGame = () => {
        addGame(data);
    };

    const involvedCompany: { name: string; id: number } | null =
        data.involved_companies.length > 0
            ? findCompany(data.involved_companies)
            : null;
    return (
        <>
            <div className="flex gap-6 items-start">
                {url ? (
                    <div className="relative w-[120px] md:w-[200px] aspect-[2/3]">
                        <Image
                            src={`https:${url}`}
                            alt="Portada juego"
                            fill
                sizes="100%"
                            quality={100}
                            className="rounded-lg object-cover"
                        />
                    </div>
                ) : (
                    <div>No cover image available</div>
                )}
                <div className="flex-1">
                    <h3 className="font-bold text-primary text-xl">
                        {data?.name}
                    </h3>
                    <h3 className="text-primary font-semibold opacity-80">
                        {involvedCompany
                            ? involvedCompany.name
                            : "No company involved"}
                    </h3>
                    <div className="hidden md:block">
                        <CollectButton
                            isGameCollected={isGameCollected}
                            handleAddGame={handleAddGame}
                            data={data}
                            id={id}
                        />
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <CollectButton
                    isGameCollected={isGameCollected}
                    handleAddGame={handleAddGame}
                    data={data}
                    id={id}
                />
            </div>
        </>
    );
};

export default DetailsHeader;
