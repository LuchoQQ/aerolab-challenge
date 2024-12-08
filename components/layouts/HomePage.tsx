"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import useGameStore from "@/stores/gameStore";
import CollectedGamed from "../sections/CollectedGamed";
import HomeButtons from "../sections/HomeButtons";

const HomePage = () => {
    const { collectedGames } =
        useGameStore();
    const [filteredGames, setFilteredGames] = useState(collectedGames);
    const [isFixed, setIsFixed] = useState(false);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

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
        <>
            <div className="px-2">
                <HomeButtons
                    setFilteredGames={setFilteredGames}
                    isFixed={isFixed}
                />
                <CollectedGamed filteredGames={filteredGames} />
            </div>
        </>
    );
};

export default HomePage;
