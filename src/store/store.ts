import { configureStore } from "@reduxjs/toolkit";
import { authSlice, sliceSideBarState } from "./slice";
import { sliceLoading } from "./slice/";
import { sliceProductsState } from "./slice/";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        sidebar: sliceSideBarState.reducer,
        loading: sliceLoading.reducer,
        products: sliceProductsState.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;