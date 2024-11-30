import axios, { isAxiosError } from "axios";
import { InApiResponse } from "../../interface";

const urlEndpoint: string = import.meta.env.VITE_API_BASE_URL;

export const deleteProduct = async (id: number | string): Promise<InApiResponse> => {
    try {
        const res = await axios.delete(`${urlEndpoint}${id}`);
        return res.data;
    } catch (error) {
        let errorMessage = "";
        if (isAxiosError(error)) {
            // Error específico de axios (por ejemplo, red, o código de status no esperado)
            errorMessage = error.response?.data || error.message;
            console.error('Error en la solicitud de Axios:', error.response?.data || error.message);
        } else {
            errorMessage = String(error);
            console.error('Error desconocido', error);
        }
        return {
            data: null,
            error: errorMessage,
        };
    }
}