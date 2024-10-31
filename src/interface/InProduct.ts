export interface InProduct {
    id: string;
    name: string;
    description: string;
    stock_current: number;
    category_id: {
        name: string;
        _id: string;
    };
    image: string;
    warehouse_id: {
        name: string;
    };
    brand_id: string;
    createdAt: string; // Consider using Date if you want to manipulate date objects
    quantity: number;
    stock_min: string; // Consider changing this to a number if appropriate
}