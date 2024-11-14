import { InProduct } from "../InProduct";

// Definimos el tipo para cada acción
export interface InActions {
    label: string;
    onClick: (product: InProduct) => void;
}
