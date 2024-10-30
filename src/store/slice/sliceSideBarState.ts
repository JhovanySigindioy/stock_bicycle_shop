import { createSlice } from "@reduxjs/toolkit";
import { InSideBarState } from "../../interface";

const initialState: InSideBarState = {
    isMobilOpen: false,
}

export const sliceSideBarState = createSlice({
    name: "sideBarState",
    initialState,
    reducers: {
        toggleSideBar: (state) => {
            state.isMobilOpen = !state.isMobilOpen;
        },
    }
});

export const { toggleSideBar } = sliceSideBarState.actions;