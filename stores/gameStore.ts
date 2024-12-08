import Game from '@/interfaces/Game';
import { create } from 'zustand'


interface GameStore {
    collectedGames: Game[];
    addGame: (game: Game) => void;
    removeGame: (gameId: number) => void;
    initializeStore: () => void;
    cleanStore: () => void;
}

const useGameStore = create<GameStore>((set) => ({
    collectedGames: [],
    addGame: (game) => {
        set((state) => {
            const newGames = [...state.collectedGames, {...game, added: Date.now()}];
            if (typeof window !== 'undefined') {
                localStorage.setItem('collectedGames', JSON.stringify(newGames));
            }
            return { collectedGames: newGames };
        });
    },
    removeGame: (gameId) => {
        set((state) => {
            const newGames = state.collectedGames.filter(g => g.id !== gameId);
            if (typeof window !== 'undefined') {
                localStorage.setItem('collectedGames', JSON.stringify(newGames));
            }
            return { collectedGames: newGames };
        });
    },
    initializeStore: () => {
        if (typeof window !== 'undefined') {
            const storedGames = localStorage.getItem('collectedGames');
            if (storedGames) {
                set({ collectedGames: JSON.parse(storedGames) });
            }
        }
    },
    cleanStore: () => {
        set((state) => {
            const games: Game[] = [];
            return {collectedGames: games}
        })
    }
}));

export default useGameStore;

