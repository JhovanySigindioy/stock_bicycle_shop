export const calculateTotal = (items: { quantity: number; sale_price: number }[]): number => {
    return items.reduce((total, item) => total + item.quantity * item.sale_price, 0);
};