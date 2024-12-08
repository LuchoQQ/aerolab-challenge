import { useEffect } from 'react';
import useGameStore from '../stores/gameStore';

export const useInitializedGameStore = () => {
    const { initializeStore, ...store } = useGameStore();

    useEffect(() => {
        initializeStore();
    }, [initializeStore]);

    return store;
};

