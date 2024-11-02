import { useState } from "react";
import { useDispatch } from "react-redux";
import { decrementStock } from "../store/slice"; // Asegúrate de que la ruta sea correcta

export const useCart = () => {
    const [cartItems, setCartItems] = useState<{ id: string; name: string; quantity: number; price: number }[]>([]);
    const dispatch = useDispatch(); // Inicializa el dispatch

    const addToCart = (product: { id: string; name: string; price: number }) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                // Si el producto ya existe en el carrito, aumenta la cantidad
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Si el producto no existe, se añade al carrito
                // Aquí despachas decrementStock al agregar un nuevo producto
                dispatch(decrementStock({ id: product.id, quantity: 1 }));
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = (index: number) => {
        setCartItems(prevItems =>
            prevItems.map((item, idx) =>
                idx === index ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
        // También puedes despachar decrementStock aquí si necesitas
    };

    const decreaseQuantity = (index: number) => {
        setCartItems(prevItems =>
            prevItems.map((item, idx) =>
                idx === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            ).filter(item => item.quantity > 0)
        );
        // Aquí también puedes despachar incrementStock si es necesario
    };

    const removeItem = (index: number) => {
        const itemToRemove = cartItems[index];
        if (itemToRemove) {
            // Aquí podrías despachar incrementStock para devolver el stock al producto eliminado
            dispatch(decrementStock({ id: itemToRemove.id, quantity: -itemToRemove.quantity }));
        }
        setCartItems(prevItems => prevItems.filter((_, idx) => idx !== index));
    };

    const purchase = () => {
        alert("Compra realizada con éxito");
        setCartItems([]);
    };

    return {
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        purchase,
    };
};
