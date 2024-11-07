import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageFirebase } from ".";

export const uploadImageFirebase = async (imageProduct: File): Promise<string> => {
    const storageRef = ref(storageFirebase, "images/" + imageProduct.name);
    try {
        await uploadBytes(storageRef, imageProduct);
        const downloadUrl: string = await getDownloadURL(storageRef);
        return downloadUrl;
    } catch (error) {
        return "Error al subir la imagen a Firebase" + error;
    }
}