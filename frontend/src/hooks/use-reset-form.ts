import { useEffect } from 'react';
import { setupStore } from '../store';

type ResetFunction = () => void;
export const useResetForm = (reset: ResetFunction): void => {
    const store = setupStore();
    useEffect(() => {
        let currentWasLogout = store.getState().app.wasLogout;
        return  store.subscribe(() => {
            const previosWasLogout = currentWasLogout;
            currentWasLogout = store.getState().app.wasLogout;
    
            if (currentWasLogout !== previosWasLogout) {
                reset();
            }
        });
    }, [reset, store]);
};
