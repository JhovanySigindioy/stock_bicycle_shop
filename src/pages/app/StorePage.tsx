import React, { ChangeEvent, useState } from "react";
import { Grid2, Fab, Badge, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CardProduct, InputBrowser, SpinnerLoading, Pagination, ModalLayout, ShoppingCard } from "../../components";
import { useCart, useProducts } from "../../customHooks";

const itemsPerPage = 9;

export const StorePage: React.FC = () => {
    const [inputBrowser, setInputBrowser] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    const { products, isLoading, totalPages } = useProducts(inputBrowser, currentPage, itemsPerPage);

    const [cartOpen, setCartOpen] = useState(false);

    const {
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        purchase,
    } = useCart();

    const handleCartOpen = () => setCartOpen(true);
    const handleCartClose = () => setCartOpen(false);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputBrowser(e.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <InputBrowser textValue={inputBrowser} handleOnChange={handleOnChange} />
            <Grid2 container display={"flex"} gap={1.5} marginBottom={3}>
                {isLoading ? (
                    <SpinnerLoading />
                ) : (
                    products.map((product) => (
                        <CardProduct
                            key={product.id}
                            product={product}
                            handleAddToCart={() => addToCart({ id: product.id, name: product.name, price: product.price })}
                        />
                    ))
                )}
            </Grid2>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {/* Botón flotante del carrito con burbuja */}
            <Box sx={{ position: "fixed", bottom: { xs: 76, md: 20 }, right: 20 }}>
                <Fab color="primary" aria-label="cart" onClick={handleCartOpen}
                    sx={{
                        width: 80, // Aumenta el tamaño del botón
                        height: 80, // Aumenta el tamaño del botón
                    }}
                >
                    <ShoppingCartIcon />
                    <Badge
                        badgeContent={cartItems.reduce((total, item) => total + item.quantity, 0)}
                        color="error"
                        overlap="circular"
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        sx={{
                            bottom: 22,
                            left: 14,
                        }}
                    ></Badge>
                </Fab>
            </Box>

            {/* Modal para el carrito de compras */}
            <ModalLayout title="Carrito de compras" cartOpen={cartOpen} handleCartClose={handleCartClose}>
                <ShoppingCard
                    cardItems={cartItems}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onRemove={removeItem}
                    onPurchase={purchase}
                />
            </ModalLayout>
        </>
    );
};
