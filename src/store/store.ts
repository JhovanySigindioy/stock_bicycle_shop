import { configureStore } from "@reduxjs/toolkit";
import { authSlice, sliceSideBarState } from "./slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        sidebar: sliceSideBarState.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;