import axios, { isAxiosError } from "axios";
import { InApiResProductCreated, InPatchProduct } from "../../interface";


const urlEndPoint: string = 'http://localhost:3000/api/v1/';

export const patchProduct = async (product: Partial<InPatchProduct>): Promise<InApiResProductCreated> => {
    console.log("Estamos escaneadno el producto desde el Api: ", product);
    const id: number | string = product.id!;
    try {
        const res = await axios.patch(`${urlEndPoint}products/${id}`, product, {
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
