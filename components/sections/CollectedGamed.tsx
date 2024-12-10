import React from "react";
import { motion } from "framer-motion";
import Game from "@/interfaces/Game";
import Card from "../Card";
import NoItemsCollected from "../NoItemsCollected";
import useGameStore from "@/stores/gameStore";

type Props = {
    filteredGames: Game[];
};

const CollectedGamed: React.FC<Props> = ({ filteredGames }) => {
    const { removeGame } = useGameStore();

    // animaciones del contenedor de la coleccion
    const cardsContainerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delayChildren: 0.3,
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="flex justify-center">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={cardsContainerVariants}
                className="sm:px-4 md:px-6 max-w-screen-md  "
            >
                {filteredGames?.length > 0 ? (
                    <ul className="grid grid-cols-3 gap-3 w-full md:grid-cols-4 md:gap-10">
                        {filteredGames.map((game: Game) => (
                            <li
                                key={game.id}
                                className="flex flex-col items-center w-full"
                            >
                                <Card game={game} removeGame={removeGame} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <NoItemsCollected />
                )}
            </motion.div>
        </div>
    );
};

export default CollectedGamed;
