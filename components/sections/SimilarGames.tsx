import Game from "@/interfaces/Game";
import { createSlug, normalizeImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

type Props = {
    similarGames: Game[];
};

const SimilarGames: React.FC<Props> = ({ similarGames }) => {

    const removeToast = () => {
        toast.remove()
    }
    return (
        <div>
            <h3 className="font-bold text-xl text-primary">Similar Games</h3>
            <div className="grid grid-cols-3 gap-4" onClick={() => removeToast()}>
                {similarGames.map((game) => {
                    const imageUrl = normalizeImageUrl(
                        game.cover?.url?.replace("thumb", "cover_big")
                    );


                    const gameSlug = createSlug(game.name, game.id);
                    console.log(game)
                    return (
                        <Link key={game.id} href={`/details/${gameSlug}`}>
                            <div>
                                <Image
                                    src={imageUrl}
                                    alt={game.name}
                                    width={200}
                                    height={300}
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
