import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InProduct } from "../../interface";
import { fetchProducts } from "../thunks/fetchProducts";

export interface InProductsState {
    products: InProduct[];
    error: string | null;
}

const initialState: InProductsState = {
    products: [],
    error: null,
};

export const sliceProductsState = createSlice({
    name: "productsState",
    initialState,
    reducers: {
        setProductState: (state, action: PayloadAction<InProduct>) => {
            state.products.push(action.payload);
        },
        decrementStock(state, action: PayloadAction<{ id: number | string; quantity: number }>) {
            const product = state.products.find(prod => prod.id === action.payload.id);
            if (product) {
                if (product.quantity < 1) return;
                product.quantity -= action.payload.quantity;
            }
        },
        incrementStock(state, action: PayloadAction<{ id: number | string; quantity?: number }>) {
            const { id, quantity = 1 } = action.payload;
            const product = state.products.find(prod => prod.id === id);
            if (product) {
                product.quantity += quantity;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { setProductState, decrementStock, incrementStock } = sliceProductsState.actions;