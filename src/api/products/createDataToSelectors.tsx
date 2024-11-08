import axios, { isAxiosError } from "axios";
import { InApiResDataSelectors } from "../../interface";
import { InSendNewSelectorDB } from "../../interface/InSendNewSelectorDB";

const urlEndPoint: string = 'http://localhost:3000/api/v1/';

export const createDataToSelectors = async (newItemToSelectors: InSendNewSelectorDB, table: string): Promise<InApiResDataSelectors> => {
    try {
        const res = await axios.post(`${urlEndPoint}${table}`, newItemToSelectors, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data
    } catch (error: unknown) {
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
