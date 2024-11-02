// Importaciones necesarias
import React, { ChangeEvent, useEffect, useState } from "react";
import { Badge, Box, Fab, Grid2 } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CardProduct, InputBrowser, ModalLayout, ShoppingCard, SpinnerLoading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { decrementStock, hideLoading, setProductsState, showLoading } from "../../store/slice";
import { getProducts } from "../../api/products";


export const StorePage: React.FC = () => {
    const [inputBrowser, setInputBrowser] = useState<string>("");
    const [cartOpen, setCartOpen] = useState(false);
    const { products } = useSelector((state: RootState) => state.products);
    const { isLoading } = useSelector((state: RootState) => state.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showLoading());
        getProducts()
            .then((response) => {
                dispatch(setProductsState(response.data));
                dispatch(hideLoading());
            })
            .catch(() => dispatch(hideLoading()));
    }, [dispatch]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputBrowser(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(inputBrowser.toLowerCase())
    );

    const handleAddToCart = (productId: string) => {
        dispatch(decrementStock({ id: productId, quantity: 1 }));
    };

    const handleCartOpen = () => setCartOpen(true);
    const handleCartClose = () => setCartOpen(false);

    // Funciones para manejar el carrito
    const handleIncreaseQuantity = (id: string) => {
        dispatch(decrementStock({ id, quantity: -1 })); // Cambia según tu lógica para aumentar
    };

    const handleDecreaseQuantity = (id: string) => {
        dispatch(decrementStock({ id, quantity: 1 })); // Cambia según tu lógica para disminuir
    };

    const handleRemoveFromCart = (id: string) => {
        // Implementa la lógica para eliminar del carrito
    };

    const handlePurchase = () => {
        // Implementa la lógica para manejar la compra
    };

    return (
        <>
            <InputBrowser textValue={inputBrowser} handleOnChange={handleOnChange} />
            <Grid2 container display={"flex"} gap={1.5} marginBottom={3}>
                {isLoading ? (
                    <SpinnerLoading />
                ) : (
                    filteredProducts.map((product) => (
                        <CardProduct
                            key={product.id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        />
                    ))
                )}
            </Grid2>
            <Box sx={{ position: "fixed", bottom: { xs: 76, md: 20 }, right: 20 }}>
                <Fab color="primary" aria-label="cart" onClick={handleCartOpen}
                    sx={{
                        width: 80, 
                        height: 80, 
                    }}
                >
                    <ShoppingCartIcon />
                    <Badge
                        badgeContent={products.reduce((total, item) => total + item.quantity, 0)}
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
                    cardItems={products}
                    onIncrease={handleIncreaseQuantity}
                    onDecrease={handleDecreaseQuantity}
                    onRemove={handleRemoveFromCart}
                    onPurchase={handlePurchase}
                />
            </ModalLayout>
        </>
    );
};
