import axios, { isAxiosError } from "axios";
import { InApiResponse } from "../../interface";

const urlEndpoint: string = "http://localhost:3000/api/v1/products/"

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