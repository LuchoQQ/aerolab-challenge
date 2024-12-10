import Game from "@/interfaces/Game";
import { createSlug, normalizeImageUrl } from "@/lib/utils";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
    game: Game;
    removeGame: (id: number) => void;
};

const Card: React.FC<Props> = ({ game, removeGame }) => {
    const url = normalizeImageUrl(
        game?.cover?.url?.replace("thumb", "cover_big")
    );
    const gameSlug = createSlug(game.name, game.id);

    return (
        <div className="relative">
            <Link href={`/details/${gameSlug}`}>
                {url && (
                    <Image
                        src={url}
                        alt={game.name}
                        width={300}
                        height={400}
                        className="rounded-lg"
                    />
                )}
            </Link>
            <div className="absolute bottom-2 right-2">
                <div
                    className="bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={(e) => {
                        removeGame(game.id);
                    }}
                >
                    <Trash className="w-4 h-4 text-gray-700" />
                </div>
            </div>
        </div>
    );
};

export default Card;