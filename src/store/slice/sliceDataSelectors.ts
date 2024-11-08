import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InDataSelectors } from "../../interface";
import { fetchDataSelectors } from "../thunks";

export interface InSelectorsState {
    categories: InDataSelectors[];
    brands: InDataSelectors[];
    locations: InDataSelectors[];
    error: string | null;
}

export type typeSelector = "brands" | "categories" | "locations";

export interface InSetSelectorState {
    id: number | string;
    name: string;
    selectorType: typeSelector
}

const initialState: InSelectorsState = {
    categories: [],
    brands: [],
    locations: [],
    error: null,
};

export const sliceDataSelectors = createSlice({
    name: "selectors",
    initialState,
    reducers: {
        setSelectorsState: (
            state,
            action: PayloadAction<InSetSelectorState>
        ) => {
            const newItemSelector = {
                id: action.payload.id,
                name: action.payload.name,
            };

            // Evitar elementos duplicados por ID
            const selectorArray = state[action.payload.selectorType];
            if (!selectorArray.some(item => item.id === newItemSelector.id)) {
                selectorArray.push(newItemSelector);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataSelectors.fulfilled, (state, action) => {
            const selectorName = action.meta.arg as keyof InSelectorsState;
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

export const { setSelectorsState } = sliceDataSelectors.actions;