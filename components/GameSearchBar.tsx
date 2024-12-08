import React, { useState, useCallback, useEffect } from "react";
import { Check, Search } from "lucide-react";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { cn } from "@/lib/utils";

export default function GameSearchCombobox({
    open,
    setOpen,
    selectedGame,
    setSelectedGame,
}) {
    const [searchTerm, setSearchTerm] = useState(""); // Store the search term
    const [filteredGames, setFilteredGames] = useState([]); // Store filtered games
    const [isSearching, setIsSearching] = useState(false); // Flag to show loading state

    // Function to debounce the search
    const debouncedSearch = useCallback(
        debounce((term: string) => {
            if (term.trim() === "") {
                setFilteredGames([]); // Clear the list if the search term is empty
                setIsSearching(false);
                return;
            }

            // Make the actual API call to fetch the games based on the search term
            axios
                .post("/api/games", { name: term })
                .then((res) => {
                    // Asegurarse de que los datos tengan la estructura correcta
                    const formattedGames = res.data.map((game) => ({
                        id: game.id,
                        value: game.id.toString(), // Convertir a string para comparaciones
                        label: game.name,
                        image: game.image || "/placeholder-game.jpg", // Añadir imagen por defecto si no existe
                    }));

                    setFilteredGames(formattedGames);
                    setIsSearching(false);
                })
                .catch((error) => {
                    console.error("Error fetching games:", error);
                    setFilteredGames([]); // Limpiar los juegos en caso de error
                    setIsSearching(false);
                });
        }, 500), // Delay of 500ms
        []
    );

    // Handle the search term change
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);

        // Establecer búsqueda solo si hay algo escrito
        if (value.trim() !== "") {
            setIsSearching(true);
            // Call the debounced function to trigger the API search
            debouncedSearch(value);
        } else {
            setIsSearching(false);
            setFilteredGames([]);
        }
    };

    // Cleanup on unmount for debounced function
    useEffect(() => {
        return () => {
            debouncedSearch.cancel(); // Clean up the debounce
        };
    }, [debouncedSearch]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-start text-tertiary hover:text-tertiary"
                >
                    <Search className="text-pink-400" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Buscar videojuego..."
                        value={searchTerm}
                        onValueChange={handleSearchChange}
                    />

                    <CommandList>
                        <CommandGroup>
                            <CommandEmpty>
                                {isSearching
                                    ? "Buscando..."
                                    : filteredGames.length === 0
                                    ? "No se encontraron resultados."
                                    : null}
                            </CommandEmpty>
                            {filteredGames.map((game) => {
                                return (
                                    <CommandItem
                                        key={game.value}
                                        value={game.value}
                                    >
                                        {game.name}
                                    </CommandItem>
                                );
                            })}
                            
                        </CommandGroup>
                        {/* <CommandEmpty>
                            {isSearching
                                ? "Buscando..."
                                : filteredGames.length === 0
                                ? "No se encontraron resultados."
                                : null}
                        </CommandEmpty>
                        
                        {!isSearching && filteredGames.length > 0 && (
                            <CommandGroup>
                                {filteredGames.map((game) => (
                                    <CommandItem
                                        key={game.id}
                                        value={game.value}
                                        onSelect={(currentValue) => {
                                            setSelectedGame(
                                                currentValue === selectedGame
                                                    ? null
                                                    : currentValue
                                            );
                                            setOpen(false);
                                            // Resetear búsqueda
                                            setSearchTerm("");
                                            setFilteredGames([]);
                                        }}
                                        className="flex items-center space-x-2"
                                    >
                                        <img
                                            src={game.image}
                                            alt={game.label}
                                            className="w-10 h-10 mr-2 object-cover"
                                        />
                                        <span>{game.label}</span>
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                selectedGame === game.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )} */}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
