export interface InResProductDB {
    id: number | string;
    barcode: string;
    name: string;
    description: string;
    img_product: string;
    cost: number;
    sale_price: number;
    quantity: number;
    brand_id: number;
    category_id: number;
    location_id: number;
}