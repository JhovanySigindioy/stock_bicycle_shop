import { createSlice } from "@reduxjs/toolkit";
import { InDataSelectors } from "../../interface";
import { fetchDataSelectors } from "../thunks";

export interface SelectorsState {
    categories: InDataSelectors[];
    brands: InDataSelectors[];
    locations: InDataSelectors[];
    error: string | null;
}

const initialState: SelectorsState = {
    categories: [],
    brands: [],
    locations: [],
    error: null,
};

export const sliceDataSelectors = createSlice({
    name: "selectors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataSelectors.fulfilled, (state, action) => {
            const selectorName = action.meta.arg as keyof SelectorsState;
            if (selectorName in state) {
                (state[selectorName] as InDataSelectors[]) = action.payload;
            }
            state.error = null;
        });
        builder.addCase(fetchDataSelectors.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    },
});

