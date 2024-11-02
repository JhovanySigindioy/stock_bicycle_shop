import { useState } from "react";
import { useDispatch } from "react-redux";
import { decrementStock } from "../store/slice"; // Asegúrate de que la ruta sea correcta
import { InProduct } from "../interface";

export const useCart = () => {
    const [cartItems, setCartItems] = useState<{ id: string; name: string; quantity: number; price: number }[]>([]);
    const dispatch = useDispatch(); 

    const addToCart = (product: InProduct) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                // Producto ya en el carrito, aumentamos cantidad
                dispatch(decrementStock({ id: product.id, quantity: 1 }));
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Producto no está en el carrito, lo añadimos
                dispatch(decrementStock({ id: product.id, quantity: 1 }));
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = (index: number) => {
        const itemToUpdate = cartItems[index];
        if (itemToUpdate) {
            dispatch(decrementStock({ id: itemToUpdate.id, quantity: 1 }));
            setCartItems(prevItems =>
                prevItems.map((item, idx) =>
                    idx === index ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        }
    };

    const decreaseQuantity = (index: number) => {
        const itemToUpdate = cartItems[index];
        if (itemToUpdate && itemToUpdate.quantity > 1) {
            dispatch(decrementStock({ id: itemToUpdate.id, quantity: -1 }));
            setCartItems(prevItems =>
                prevItems.map((item, idx) =>
                    idx === index ? { ...item, quantity: item.quantity - 1 } : item
                )
            );
        } else {
            removeItem(index); // Remueve el producto si la cantidad llega a 0
        }
    };

    const removeItem = (index: number) => {
        const itemToRemove = cartItems[index];
        if (itemToRemove) {
            // Devolvemos el stock al producto eliminado
            dispatch(decrementStock({ id: itemToRemove.id, quantity: -itemToRemove.quantity }));
            setCartItems(prevItems => prevItems.filter((_, idx) => idx !== index));
        }
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
