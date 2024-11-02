export const calculateTotal = (items: { quantity: number; price: number }[]): number => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
};