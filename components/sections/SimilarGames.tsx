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
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 w-full md:grid-cols-4">
                {similarGames.map((game) => {
                    const imageUrl = game.cover?.url
                        ? `https:${game.cover.url.replace(
                              "thumb",
                              "cover_big"
                          )}`
                        : "/fallback.webp"; // Fallback image if no cover URL
                    return (
                        <Link
                            key={game.id}
                            href={`/details/${game.id}`}
                            className="flex flex-col items-center transform transition-transform duration-300 ease-in-out hover:scale-105"
                        >
                            <div className="relative w-full aspect-[2/3]">
                                <Image
                                    src={imageUrl ? imageUrl : "/fallback.webp"}
                                    alt={`${game.name} cover`}
                                    sizes="100%"
                                    fill
                                    quality={100}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SimilarGames;
