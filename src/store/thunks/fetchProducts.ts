import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { InApiResProduct, InProduct } from "../../interface";

const urlEndPoint: string = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = createAsyncThunk<InProduct[], void, { rejectValue: string }>(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get<InApiResProduct>(`${urlEndPoint}products`);


            if (res.data.error) {
                return rejectWithValue(res.data.error); // Rechazamos con el mensaje de error
            }


            return res.data.data ?? [];
        } catch (error) {

            return rejectWithValue("Error obteniendo productos");
        }
    }
);
