// Importaciones necesarias
import React, { ChangeEvent, useMemo, useState } from "react";
import { Badge, Box, Fab, Grid2 } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { CardProduct, InputBrowser, ModalLayout, Pagination, ShoppingCard, SpinnerLoading } from "../../components";
import { RootState } from "../../store";
import { addItem, clearCart, decreaseQuantity, decrementStock, increaseQuantity, incrementStock, removeItem } from "../../store/slice";
import { InProduct } from "../../interface";

const itemsPerPage: number = 9;

export const StorePage: React.FC = () => {
    const [inputBrowser, setInputBrowser] = useState<string>("");
    const [cartOpen, setCartOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { products } = useSelector((state: RootState) => state.products);
    const { cartProducts } = useSelector((state: RootState) => state.cart);
    const { isLoading } = useSelector((state: RootState) => state.loading);
    const dispatch = useDispatch();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputBrowser(e.target.value);
    };
    
    const handleCartOpen = () => setCartOpen(true);
    const handleCartClose = () => setCartOpen(false);

// Funciones para paginacion
    const normalizedInput = inputBrowser.toLowerCase();

    const filteredProducts = useMemo(() => {
        if (!normalizedInput) return products;
        return products.filter((product) =>
            product.name.toLowerCase().includes(normalizedInput)
        );
    }, [products, normalizedInput]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredProducts.slice(start, end);
    }, [filteredProducts, currentPage, itemsPerPage]);
    // Fin Funciones para paginacion


    // Funciones para manejar el carrito
    const handleAddToCart = (product: InProduct) => {
        if (product.quantity > 0) {
            dispatch(addItem(product));
            dispatch(decrementStock({ id: product.id, quantity: 1 }));
        } else {
            console.log("No hay stock disponible");
        }
    };

    const handleRemoveFromCart = (id: string, quantity: number) => {
        dispatch(removeItem(id));
        dispatch(incrementStock({ id, quantity }));
    };

    const handleIncreaseQuantity = (id: string) => {
        const productCart = products.find(item => item.id === id)!;
        if (productCart.quantity < 1) return;
        dispatch(increaseQuantity(id));
        dispatch(decrementStock({ id, quantity: 1 }));
    };

    const handleDecreaseQuantity = (id: string) => {
        const productCart = cartProducts.find(item => item.id === id)!;
        if (productCart.quantity < 2) return;
        dispatch(decreaseQuantity(id));
        dispatch(incrementStock({ id, quantity: 1 }));
    };

    const handlePurchase = () => {
        alert("Compra realizada con éxito");
        dispatch(clearCart());
    };
    // FIN Funciones para manejar el carrito

    return (
        <>
            <InputBrowser textValue={inputBrowser} handleOnChange={handleOnChange} />
            <Grid2 container display={"flex"} gap={1.5} marginBottom={3}>
                {isLoading ? (
                    <SpinnerLoading />
                ) : (
                    paginatedProducts.map((product) => (
                        <CardProduct
                            key={product.id}
                            product={product}
                            handleAddToCart={() => handleAddToCart(product)}
                        />
                    ))
                )}
            </Grid2>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            <Box sx={{ position: "fixed", bottom: { xs: 76, md: 20 }, right: 20 }}>
                <Fab color="primary" aria-label="cart" onClick={handleCartOpen}
                    sx={{
                        width: 80,
                        height: 80,
                    }}
                >
                    <ShoppingCartIcon />
                    <Badge
                        badgeContent={cartProducts.reduce((total, item) => total + item.quantity, 0)}
                        color="error"
                        overlap="circular"
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        sx={{
                            bottom: 22,
                            left: 14,
                        }}
                    />
                </Fab>
            </Box>
            <ModalLayout title="Carrito de compras" cartOpen={cartOpen} handleCartClose={handleCartClose}>
                <ShoppingCard
                    cartProducts={cartProducts}
                    onIncrease={handleIncreaseQuantity}
                    onDecrease={handleDecreaseQuantity}
                    onRemove={handleRemoveFromCart}
                    onPurchase={handlePurchase}
                />
            </ModalLayout>
        </>
    );
};