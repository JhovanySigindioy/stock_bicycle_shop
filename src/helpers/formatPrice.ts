export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP', // Moneda en pesos colombianos
        minimumFractionDigits: 0, // Sin decimales
    }).format(price);
};
