import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

const Card = ({ game, removeGame }) => {
    let url = game?.cover?.url?.replace("thumb", "cover_big");

    return (
        <div className="relative">
            {url && (
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
                            onClick={() => removeGame(game.id)}
                        >
                            <Trash className="w-4 h-4 text-gray-700" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
