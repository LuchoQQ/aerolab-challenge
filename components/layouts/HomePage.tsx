"use client";

import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Header from "../sections/Header";
import NoItemsCollected from "../NoItemsCollected";
import useGameStore from "@/stores/gameStore";
import Card from "../Card";
import ButtonSelector from "../ButtonSelector";
import { motion } from "framer-motion";

const HomePage = () => {
    const { collectedGames, initializeStore, removeGame } = useGameStore();
    const [activeButton, setActiveButton] = useState<string>("lastAdded");
    const [filteredGames, setFilteredGames] = useState(collectedGames);
    const [isFixed, setIsFixed] = useState(false);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        initializeStore();
    }, [initializeStore]);

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

    useEffect(() => {
        let sortedGames = [...collectedGames];

        if (activeButton === "newest") {
            sortedGames.sort(
                (a, b) => b.first_release_date - a.first_release_date
            );
        } else if (activeButton === "oldest") {
            sortedGames.sort(
                (a, b) => a.first_release_date - b.first_release_date
            );
        } else if (activeButton === "lastAdded") {
            sortedGames.sort((a, b) => b.added - a.added);
        }
        setFilteredGames(sortedGames);
    }, [activeButton, collectedGames]);

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (buttonsRef.current && placeholderRef.current) {
                const rect = placeholderRef.current.getBoundingClientRect();
                const shouldBeFixed = rect.top <= 0;
                setIsFixed(shouldBeFixed);

                if (shouldBeFixed) {
                    buttonsRef.current.style.position = "fixed";
                    buttonsRef.current.style.top = "0";
                    buttonsRef.current.style.left = "0";
                    buttonsRef.current.style.right = "0";
                    buttonsRef.current.style.zIndex = "10";
                } else {
                    buttonsRef.current.style.position = "static";
                    buttonsRef.current.style.boxShadow = "none";
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Call once to set initial state

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex flex-col max-w-screen-2xl mx-auto bg-gray-100 min-h-screen">
            <Header />

            <div className="px-2">
                <h2 className="text-xl font-bold text-primary mb-4 px-2">
                    Saved Games
                </h2>
                <div
                    ref={placeholderRef}
                    style={{ height: isFixed ? "56px" : "auto" }}
                >
                    <div
                        ref={buttonsRef}
                        className={`flex mb-8 gap-3 transition-all duration-300 ease-in-out ${
                            isFixed
                                ? "fixed top-0 left-0 right-0 justify-center z-10 mt-10"
                                : ""
                        }`}
                    >
                        <div
                            className={`flex gap-3 p-2 rounded-full ${
                                isFixed
                                    ? "shadow-md bg-[#fdfdfdb2] backdrop-blur-md"
                                    : "bg-gray-100"
                            }`}
                        >
                            <ButtonSelector
                                label="Last Added"
                                isActive={activeButton === "lastAdded"}
                                onClick={() => setActiveButton("lastAdded")}
                            />
                            <ButtonSelector
                                label="Newest"
                                isActive={activeButton === "newest"}
                                onClick={() => setActiveButton("newest")}
                            />
                            <ButtonSelector
                                label="Oldest"
                                isActive={activeButton === "oldest"}
                                onClick={() => setActiveButton("oldest")}
                            />
                        </div>
                    </div>
                </div>

                {/*                 <div
                    className="fixed top-0 left-0 right-0 h-1 bg-primary transform origin-left transition-transform duration-300 ease-in-out"
                    style={{ transform: isFixed ? "scaleX(1)" : "scaleX(0)" }}
                />
 */}

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={cardsContainerVariants}
                    className="sm:px-4 md:px-6"
                >
                    {filteredGames.length > 0 ? (
                        <ul className="grid grid-cols-3 gap-1 w-full">
                            {filteredGames.map((game) => (
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
        </div>
    );
};

export default HomePage;
