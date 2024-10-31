import { createSlice,  } from "@reduxjs/toolkit";
import { InLoadingState } from "../../interface";


const initialState: InLoadingState = {
    isLoading: false,
}

export const sliceLoading = createSlice({
    name: "loading",
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true;
        },
        hideLoading: (state) => {
            state.isLoading = false;
        }
    }
});

export const { showLoading, hideLoading } = sliceLoading.actions;