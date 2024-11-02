// slice.ts (tu slice de productos)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InProduct } from "../../interface";

interface ProductsState {
    products: InProduct[];
}

const initialState: ProductsState = {
    products: [],
};

export const sliceProductsState = createSlice({
    name: "productsState",
    initialState,
    reducers: {
        setProductsState: (state, action: PayloadAction<InProduct[]>) => {
            state.products = action.payload;
        },
        decrementStock(state, action: PayloadAction<{ id: string; quantity: number }>) {
            const product = state.products.find(prod => prod.id === action.payload.id);
            if (product) {
                if (product.quantity < 1) return;
                product.quantity -= action.payload.quantity;
            }
        },
        incrementStock(state, action: PayloadAction<{ id: string; quantity?: number }>) {
            const { id, quantity = 1 } = action.payload;
            const product = state.products.find(prod => prod.id === id);
            if (product) {
                product.quantity += quantity;
            }
        }
    }
});

export const { setProductsState, decrementStock, incrementStock } = sliceProductsState.actions;

