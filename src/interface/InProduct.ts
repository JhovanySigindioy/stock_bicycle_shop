export interface InProduct {
    id: number;
    barcode: string | null;
    img_product: string | null;
    name: string;
    cost: number;
    sale_price: number;
    quantity: number;
    description: string | null;
    brand: string;
    category: string;
    location: string;
}