export interface InProduct {
    id: number | string;
    barcode: string;
    name: string;
    description: string;
    img_product: string;
    cost: number;
    sale_price: number;
    quantity: number;
    brand: string;
    category: string;
    location: string;
    active: boolean;
}