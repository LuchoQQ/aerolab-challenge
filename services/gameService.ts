import axios from 'axios';
import Game from '@/interfaces/Game';

export const gameService = {
    async fetchGameDetails(slug: number): Promise<Game> {
        try {
            const res = await axios.post(`/api/details/${slug}`);
            return res.data[0];
        } catch (error) {
            console.error("Error fetching game details:", error);
            throw error;
        }
    },

    async fetchSimilarGames(slug: number): Promise<Game[]> {
        try {
            // First, fetch the game details to get similar game IDs
            const gameData = await this.fetchGameDetails(slug);
            const similarGameIds = gameData.similar_games?.slice(0, 6) || [];

            // If no similar games, return empty array
            if (similarGameIds?.length === 0) return [];

            // Fetch details for similar games
            const similarGamesDetails = await Promise.all(
                similarGameIds.map(async (gameId) => {
                    try {
                        const gameRes = await axios.post(`/api/details/similar/${gameId}`);
                        return gameRes.data[0];
                    } catch (error) {
                        console.error(`Error fetching similar game ${gameId}:`, error);
                        return null;
                    }
                })
            );

            // Filter out any null results
            return similarGamesDetails.filter((game) => game !== null);
        } catch (error) {
            console.error("Error fetching similar games:", error);
            return [];
        }
    },


    async searchGames(searchTerm: string): Promise<Game[]> {
        try {
            const res = await axios.post<Game[]>("/api/games", { name: searchTerm });
            return res.data;
        } catch (error) {
            console.error("Error searching games:", error);
            return [];
        }
    }
};