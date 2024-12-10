import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export function useGameSearch(searchTerm: string) {
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500ms de retraso
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (debouncedSearchTerm.length > 2) {
            // Lógica de búsqueda
            setIsLoading(true);
            // Llamada a la API
            setIsLoading(false);
        }
    }, [debouncedSearchTerm]);

    return { data, isLoading };
}
