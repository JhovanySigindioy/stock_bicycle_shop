import axios, { isAxiosError } from "axios";
import { InApiResProductCreated, InSendProductDB } from "../../interface";

const urlEndPoint: string = import.meta.env.VITE_API_BASE_URL;

export const createProduct = async (product: InSendProductDB): Promise<InApiResProductCreated> => {
    try {
        const res = await axios.post(`${urlEndPoint}products`, product, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data
    }catch (error: unknown) {
        let errorMessage = "";
        if (isAxiosError(error)) {
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
};
