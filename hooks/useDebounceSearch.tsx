import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";

interface SearchProps {
    onSearch: (term: string) => void;
    delay?: number;
}

export function useDebouncedSearch({
    onSearch,
    delay = 500, // Valor por defecto de 500ms
}: SearchProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Función de búsqueda debounced que se llamará a la API
    const debouncedSearch = useCallback(
        debounce((term: string) => {
            onSearch(term);
            setIsTyping(false);
        }, delay),
        [onSearch, delay]
    );

    // Efecto para manejar la búsqueda debounced
    useEffect(() => {
        if (searchTerm) {
            setIsTyping(true);
            debouncedSearch(searchTerm);
        }

        // Limpiar el debounce cuando el componente se desmonte
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm, debouncedSearch]);

    // Manejador para actualizar el término de búsqueda
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    return {
        searchTerm,
        handleSearchChange,
        isTyping,
    };
}

// Ejemplo de uso en un componente
export function SearchComponent() {
    const handleApiSearch = async (term: string) => {
        try {
            // Aquí iría tu llamada a la API
            const response = await fetch(`/api/search?term=${term}`);
            const results = await response.json();
            // Procesar los resultados
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        }
    };

    const { searchTerm, handleSearchChange, isTyping } = useDebouncedSearch({
        onSearch: handleApiSearch,
        delay: 500, // Retraso de 500 milisegundos
    });

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar..."
            />
            {isTyping && <span>Buscando...</span>}
        </div>
    );
}
