import axios from "axios";
import { InApiResponse } from "../../interface";

const urlEndPoint: string = 'http://localhost:3000/api/v1/';
// Nueva función para insertar una venta
export const insertSale = async (saleData: { user_id: number; products: { product_id: number | string; quantity: number }[] }): Promise<InApiResponse> => {
    try {
        const res = await axios.post(`${urlEndPoint}sales`, saleData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Si la respuesta es exitosa, retorna los datos
        console.log('Datos después de la inserción: ', res.data);
        return res.data;
    } catch (error) {
        // Manejo de errores más detallado
        if (axios.isAxiosError(error)) {
            console.error('Error en la solicitud:', error.response?.data || error.message);
            throw new Error(`Error al comunicarse con el servidor: ${error.response?.data}`);
        } else {
            console.error('Error al insertar la venta', error);
            throw error;
        }
    }
};