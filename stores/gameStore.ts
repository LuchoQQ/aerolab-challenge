import { create } from 'zustand'

interface Game {
    id: number;
    name: string;
    cover: { url: string };
}

interface GameStore {
    collectedGames: Game[];
    addGame: (game: Game) => void;
    removeGame: (gameId: number) => void;
    initializeStore: () => void;
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
    }
}));

export default useGameStore;

