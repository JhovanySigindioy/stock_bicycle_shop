import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InAuthState } from "../../interface";
import { InUser } from "../../interface";

const initialState: InAuthState = {
    isAuthenticated: !!localStorage.getItem("dataUser"),
    dataUser: JSON.parse(localStorage.getItem("dataUser") || "null") || {
        token: "",
        nameUser: "",
        rolUser: "",
    }
}

export const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<InUser>) => {
            state.isAuthenticated = true;
            state.dataUser.token = action.payload.token;
            state.dataUser.nameUser = action.payload.nameUser;
            state.dataUser.rolUser = action.payload.rolUser;
        },
        logout: (state) => {
            localStorage.removeItem("dataUser");
            state.isAuthenticated = false;
            state.dataUser.token = "";
            state.dataUser.nameUser = "";
            state.dataUser.rolUser = "";
        }
    }
});

export const { login, logout } = authSlice.actions;