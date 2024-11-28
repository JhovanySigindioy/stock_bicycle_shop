import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { InApiResDataSelectors, InDataSelectors } from "../../interface";
import { InSelectorsState } from "../slice";



const urlEndPoint: string = 'http://localhost:3000/api/v1/';

// Cambiamos el tipo de `formSelector` a `keyof SelectorsState`
export const fetchDataSelectors = createAsyncThunk<InDataSelectors[], keyof InSelectorsState, { rejectValue: string }>(
    "selectorsForm/fetchDataSelectors",
    async (formSelector, { rejectWithValue }) => {
        try {
            const res = await axios.get<InApiResDataSelectors>(`${urlEndPoint}${formSelector}`);
            if (res.data.error) {
                return rejectWithValue(res.data.error);
            }
            return res.data.data ?? [];
        } catch (error) {
            return rejectWithValue("Error obteniendo datos para el selector " + formSelector);
        }
    }
);
