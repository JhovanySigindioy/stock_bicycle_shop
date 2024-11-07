export interface InProduct {
    id: number | string;
    barcode: string | null;
    name: string;
    description: string | null;
    img_product: string | null;
    cost: number;
    sale_price: number;
    quantity: number;
    brand: string;
    category: string;
    location: string;
}