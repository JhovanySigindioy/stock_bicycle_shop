import axios, { isAxiosError } from "axios";
import { InApiResDataSelectors } from "../../interface";

const urlEndPoint: string = import.meta.env.VITE_API_BASE_URL;

// Función para obtener datos de tablas para selectores
export const getDataToSelectors = async (tableDB: string): Promise<InApiResDataSelectors> => {
    try {
        const res = await axios.get(`${urlEndPoint}${tableDB}`);
        return res.data; // Axios automáticamente convierte a JSON
    } catch (error: unknown) {
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
        }; // Devolver null en caso de error, o puedes optar por lanzar el error si prefieres que falle
    }
}
