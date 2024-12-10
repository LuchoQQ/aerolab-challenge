import { useQuery } from '@tanstack/react-query'
import { gameService } from '@/services/gameService'
import default_games from "../lib/default_games.js";
import Game from '@/interfaces/Game.js';

const typedDefaultGames: Game[] = default_games as unknown as Game[];

export function useGameDetails(slug: number) {
    return useQuery({
        queryKey: ['gameDetails', slug],
        queryFn: () => gameService.fetchGameDetails(slug),
        enabled: !!slug,
    })
}

export function useSimilarGames(slug: number) {
    return useQuery({
        queryKey: ['similarGames', slug],
        queryFn: () => gameService.fetchSimilarGames(slug),
        enabled: !!slug,
    })
}

export function useGameSearch(searchTerm: string) {
    return useQuery<Game[], Error>({
        queryKey: ['gameSearch', searchTerm],
        queryFn: () => gameService.searchGames(searchTerm),
        enabled: searchTerm?.length > 2,
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: searchTerm.length <= 2 ? typedDefaultGames : undefined
    });
}