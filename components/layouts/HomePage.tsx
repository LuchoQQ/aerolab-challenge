"use client";

import React, { useState } from "react";
import useGameStore from "@/stores/gameStore";
import CollectedGamed from "../sections/CollectedGamed";
import HomeButtons from "../sections/HomeButtons";

const HomePage = () => {
    const { collectedGames } = useGameStore();
    const [filteredGames, setFilteredGames] = useState(collectedGames);

    return (
        <>
            <div className="px-2">
                <HomeButtons setFilteredGames={setFilteredGames} />
                <CollectedGamed filteredGames={filteredGames} />
            </div>
        </>
    );
};

export default HomePage;
