// slice.ts (tu slice de productos)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InProduct } from "../../interface";

const initialState: InProduct[] = [];

export const sliceProductsState = createSlice({
    name: "productsState",
    initialState,
    reducers: {
        setProductsState: (state, action: PayloadAction<InProduct[]>) => {
            return action.payload;
        },
        decrementStock: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const product = state.find(product => product.id === action.payload.id);
            if (product) {
                product.stock_current -= action.payload.quantity;
                if (product.stock_current < 0) product.stock_current = 0;
            }
        },
    }
});

export const { setProductsState, decrementStock } = sliceProductsState.actions;

