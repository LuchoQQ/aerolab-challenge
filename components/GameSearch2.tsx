import React, { useState, useEffect, Fragment, useRef } from "react";
import { Combobox, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import useGameStore from "../stores/gameStore";
import { Search } from "lucide-react";

interface SearchItem {
    id: number;
    name: string;
    cover: { url: string };
}

// Default popular games to show when the input is opened
const DEFAULT_GAMES = [
    { id: 1, name: "The Legend of Zelda: Breath of the Wild", cover: { url: "//images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg" } },
    { id: 2, name: "Red Dead Redemption 2", cover: { url: "//images.igdb.com/igdb/image/upload/t_cover_big/co1ir3.jpg" } },
    { id: 3, name: "Elden Ring", cover: { url: "//images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg" } },
    { id: 4, name: "God of War", cover: { url: "//images.igdb.com/igdb/image/upload/t_cover_big/co1ypq.jpg" } },
    { id: 5, name: "Cyberpunk 2077", cover: { url: "//images.igdb.com/igdb/image/upload/t_cover_big/co2f5h.jpg" } }
];

export function GameSearch2() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<SearchItem[]>(DEFAULT_GAMES);
    const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const { addGame } = useGameStore();

    useEffect(() => {
        // If no search term, use default games
        if (searchTerm.length === 0) {
            setResults(DEFAULT_GAMES);
        }
    }, [searchTerm]);

    useEffect(() => {
        const fetchResults = async () => {
            if (searchTerm.length > 2) {
                setIsLoading(true);
                axios
                    .post("/api/games", { name: searchTerm })
                    .then((res) => {
                        setResults(res.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching games:", error);
                        setResults([]); 
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        };

        const timerId = setTimeout(fetchResults, 500);
        return () => clearTimeout(timerId);
    }, [searchTerm]);

    const handleAddGame = (game: SearchItem) => {
        addGame(game);
        setSelectedItem(game);
    };

    return (
        <div className="w-72">
            <Combobox 
                value={selectedItem} 
                onChange={(game) => {
                    handleAddGame(game);
                }}
            >
                <div className="relative">
                    <div className="flex items-center relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left sm:text-sm">
                        <Search className="text-black"/>
                        <Combobox.Button as="div" className="w-full">
                            <Combobox.Input
                                ref={inputRef}
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none focus:outline-none focus:ring-0"
                                displayValue={(item: SearchItem) => (item ? item.name : "")}
                                onChange={(event) => {
                                    setSearchTerm(event.target.value);
                                }}
                                placeholder="Buscar..."
                            />
                            <Combobox.Button />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => {
                            setSearchTerm(""); 
                        }}
                    >
                        <Combobox.Options 
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                            static
                        >
                            {isLoading ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Cargando...
                                </div>
                            ) : results.length === 0 && searchTerm !== "" ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    {searchTerm.length > 2
                                        ? "No hay resultados"
                                        : "Escribe para buscar"}
                                </div>
                            ) : (
                                results.map((game) => (
                                    <Combobox.Option
                                        key={game.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-5 pr-4 ${
                                                active ? "bg-teal-600 text-white" : "text-gray-900"
                                            }`
                                        }
                                        value={game}
                                    >
                                        {({ selected, active }) => (
                                            <div className="flex items-center">
                                                {game.cover && game.cover.url ? (
                                                    <Image
                                                        src={`https:${game.cover.url}`}
                                                        alt={game.name}
                                                        width={50}
                                                        height={50}
                                                        className="mr-2"
                                                    />
                                                ) : null}
                                                {game.name.length > 20
                                                    ? `${game.name.slice(0, 20)}...`
                                                    : game.name}
                                            </div>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}