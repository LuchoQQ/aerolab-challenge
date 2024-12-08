"use client";
import { Swords } from "lucide-react";
import React, { useState } from "react";
import GameSearchCombobox from "../GameSearchBar";
import { GameSearch2 } from "../GameSearch2";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);

    return (
        <div className="w-full h-[200px] sm:h-[300px] justify-center mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF86D9] to-[#FF86D900] opacity-60 z-0"></div>
            <div className="w-full h-full bg-no-repeat bg-hero bg-auto sm:bg-contain absolute inset-0 z-10"></div>
            <div className="relative z-20 text-white flex items-center justify-center h-full">
                <div className="flex flex-col">
                    <div className="flex sm:justify-center justify-start gap-2 items-center">
                        <div className="border-2 border-[#FF86D9] rounded-2xl p-1 shadow-sm shadow-[#FF86D9] bg-gradient-to-b from-white to-[|#ff86d988]">
                            <Swords className="w-8 h-8 text-primary" />
                        </div>{" "}
                        <h2 className="font-bold text-2xl text-primary">
                            Gaming Haven Z
                        </h2>
                    </div>
                    <div className="flex w-full max-w-xl mt-4 items-center bg-white rounded-full shadow-lg px-4 py-2">
                        <GameSearch2 />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
