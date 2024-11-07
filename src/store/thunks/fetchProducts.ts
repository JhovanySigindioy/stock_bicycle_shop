import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { InApiResProduct, InProduct } from "../../interface";

const urlEndPoint: string = 'http://localhost:3000/api/v1/';

export const fetchProducts = createAsyncThunk<InProduct[], void, { rejectValue: string }>(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get<InApiResProduct>(`${urlEndPoint}products`);

            // Si hay un error en la respuesta
            if (res.data.error) {
                return rejectWithValue(res.data.error); // Rechazamos con el mensaje de error
            }

            // Si todo está bien, retornamos los productos, o un array vacío si `data` es null
            return res.data.data ?? [];
        } catch (error) {
            // Si ocurre un error durante la llamada a la API
            return rejectWithValue("Error obteniendo productos");
        }
    }
);
