import React, { useState, useEffect, Fragment, useRef } from "react";
import { Combobox, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import default_games from "../lib/default_games.js";
interface SearchItem {
    id: number;
    name: string;
    cover: { url: string };
}

// Default popular games to show when the input is opened
const DEFAULT_GAMES = default_games;

export function GameSearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<SearchItem[]>(DEFAULT_GAMES);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    useEffect(() => {
        // If no search term, use default games
        if (searchTerm.length === 0) {
            setResults(DEFAULT_GAMES);
        }
    }, [searchTerm]);

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

    useEffect(() => {
        const timerId = setTimeout(fetchResults, 500);
        return () => clearTimeout(timerId);
    }, [searchTerm]);

    return (
        <div className="w-72">
            <Combobox>
                <div className="relative">
                    <div className="flex items-center relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left sm:text-sm">
                        <Search className="text-black" />
                        <Combobox.Button className="absolute inset-0 w-full h-full" />
                        <Combobox.Input
                            ref={inputRef}
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none focus:outline-none focus:ring-0"
                            displayValue={(item: SearchItem) =>
                                item ? item.name : ""
                            }
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                            }}
                            placeholder="Search games..."
                        />
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
                                            `relative cursor-default select-none py-2 pl-2 pr-4 ${
                                                active
                                                    ? "bg-teal-600 text-white"
                                                    : "text-gray-900"
                                            }`
                                        }
                                        value={game}
                                        onClick={() =>
                                            router.push(`/details/${game.id}`)
                                        }
                                    >
                                        {({}) => (
                                            <div className="flex items-center">
                                                {game.cover &&
                                                game.cover.url ? (
                                                    <Image
                                                        src={`https:${game.cover.url}`}
                                                        alt={game.name}
                                                        width={30}
                                                        height={30}
                                                        className="mr-2"
                                                    />
                                                ) : null}
                                                {game.name.length > 20
                                                    ? `${game.name.slice(
                                                          0,
                                                          20
                                                      )}...`
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
