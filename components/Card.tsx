import Game from "@/interfaces/Game";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
    game: Game,
    removeGame: (id: number) => void;
}

const Card: React.FC<Props> = ({ game, removeGame }) => {
    const url = game?.cover?.url?.replace("thumb", "cover_big");
    return (
        <div className="relative hover:scale-110 transition-transform duration-300">
            {url && (
                <Link href={`/details/${game.id}`}>
                    <div className="relative">
                        <Image
                            src={`https:${url}`}
                            alt={game.name}
                            width={120}
                            height={160}
                            quality={100}
                            className="rounded-lg object-cover"
                        />
                        <div className="absolute bottom-2 right-2">
                            <div
                                className="bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent link navigation when clicking trash icon
                                    removeGame(game.id);
                                }}
                            >
                                <Trash className="w-4 h-4 text-gray-700" />
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default Card;