import { configureStore } from "@reduxjs/toolkit";
import { authSlice, sliceSideBarState } from "./slice";
import { sliceLoading } from "./slice/sliceLoading";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        sidebar: sliceSideBarState.reducer,
        loading: sliceLoading.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;