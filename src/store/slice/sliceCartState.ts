import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InProduct } from "../../interface";

 export interface InCartState {
     cartProducts: InProduct[];
}

const initialState: InCartState  = {
    cartProducts: [],
};

export const sliceCartState = createSlice({
    name: "cartState",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<InProduct>) => {
            const existingItem = state.cartProducts.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.cartProducts.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.cartProducts = state.cartProducts.filter(item => item.id !== action.payload);
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cartProducts.find(item => item.id === action.payload);
            if (item) {
                item.quantity++;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cartProducts.find(item => item.id === action.payload);
            if (item) {
                item.quantity--;
            }
        },
        clearCart: (state) => {
            state.cartProducts = [];
        },
    },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } = sliceCartState.actions;
export default sliceCartState.reducer;
