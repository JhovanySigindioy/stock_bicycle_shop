import { configureStore } from "@reduxjs/toolkit";
import { authSlice, sliceSideBarState, sliceLoading, sliceProductsState, sliceCartState } from "./slice";
import { sliceDataSelectors } from "./slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        sidebar: sliceSideBarState.reducer,
        loading: sliceLoading.reducer,
        products: sliceProductsState.reducer,
        cart: sliceCartState.reducer,
        dataSelectors: sliceDataSelectors.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;    