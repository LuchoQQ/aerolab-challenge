import Game from "@/interfaces/Game";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
    similarGames: Game[];
};

const SimilarGames: React.FC<Props> = ({ similarGames }) => {
    return (
        <div>
            <h3 className="font-bold text-xl text-primary">Similar Games</h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 w-full">
                {similarGames.map((game) => (
                    <Link
                        key={game.id}
                        href={`/details/${game.id}`}
                        className="flex flex-col items-center"
                    >
                        {game.cover?.url ? (
                            <div className="relative w-full aspect-[2/3]">
                                <Image
                                    src={`https:${game.cover.url.replace(
                                        "thumb",
                                        "cover_big"
                                    )}`}
                                    alt={`${game.name} cover`}
                                    fill
                                    quality={100}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
                                No Image
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SimilarGames;
