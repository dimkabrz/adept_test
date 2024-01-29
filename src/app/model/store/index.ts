import { configureStore } from '@reduxjs/toolkit';
import appSlice from "./appSlice.ts";
import {
    TypedUseSelectorHook,
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
    useStore as useAppStore,
} from 'react-redux';


export const makeStore = () => {
    return configureStore({
        reducer: {
            app:appSlice
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useDispatch: () => AppDispatch = useAppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export const useStore: () => AppStore = useAppStore;