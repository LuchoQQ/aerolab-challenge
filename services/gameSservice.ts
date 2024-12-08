import axios from 'axios';
import Game from '@/interfaces/Game';

export const gameService = {
    async fetchGameDetails(slug: string): Promise<Game> {
        try {
            const res = await axios.post(`/api/details/${slug}`);
            return res.data[0];
        } catch (error) {
            console.error("Error fetching game details:", error);
            throw error;
        }
    },

    async fetchSimilarGames(similarGameIds: number[]): Promise<Game[]> {
        // Limit to first 6 similar games
        const limitedSimilarGameIds = similarGameIds.slice(0, 6);

        try {
            const similarGamesDetails = await Promise.all(
                limitedSimilarGameIds.map(async (gameId) => {
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
    }
};