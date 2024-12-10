"use client";

import React, { useState, useEffect } from "react";
import useGameStore from "@/stores/gameStore";
import CollectedGamed from "../sections/CollectedGamed";
import HomeButtons from "../sections/HomeButtons";

const HomePage = () => {
    const { collectedGames } = useGameStore();
    const [filteredGames, setFilteredGames] = useState(collectedGames);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial data loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return null; // This will be handled by the skeleton in Suspense

    return (
        <div className="px-2">
            <HomeButtons setFilteredGames={setFilteredGames} />
            <CollectedGamed filteredGames={filteredGames} />
        </div>
    );
};

export default HomePage;