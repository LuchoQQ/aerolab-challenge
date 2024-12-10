import useGameStore from "@/stores/gameStore";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ButtonSelector from "../ButtonSelector";
import Game from "@/interfaces/Game";

type Props = {
    setFilteredGames: (games: Game[]) => void;
};

const HomeButtons: React.FC<Props> = ({ setFilteredGames }) => {
    const { collectedGames, initializeStore } = useGameStore();
    const [isFixed, setIsFixed] = useState(false);

    const [activeButton, setActiveButton] = useState<string>("lastAdded");

    // inicializar estados globales
    useEffect(() => {
        initializeStore();
    }, [initializeStore]);


    // manejar el scroll los botones
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
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    // sorting accionada por el cambio en los botones
    useEffect(() => {
        const sortedGames = [...collectedGames];

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

    const buttonsRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <h2 className="text-xl font-bold text-primary mb-4 px-2 md: text-center">
                Saved Games
            </h2>
            <div
                ref={placeholderRef}
                style={{ height: isFixed ? "56px" : "auto" }}
            >
                <div
                    ref={buttonsRef}
                    className={`flex md:justify-center mb-8 gap-3 transition-all duration-300 ease-in-out ${
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
        </>
    );
};

export default HomeButtons;
