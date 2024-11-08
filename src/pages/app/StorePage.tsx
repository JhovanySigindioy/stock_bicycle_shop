// Importaciones necesarias
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Badge, Box, Fab, Grid2 } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { CardProduct, InputBrowser, ModalLayout, Pagination, ShoppingCard } from "../../components";
import { RootState } from "../../store";
import { addItem, clearCart, decreaseQuantity, decrementStock, increaseQuantity, incrementStock, removeItem } from "../../store/slice";
import { InProduct } from "../../interface";
import { insertSale } from "../../api/products";

const itemsPerPage: number = 9;

export const StorePage: React.FC = () => {
    const [inputBrowser, setInputBrowser] = useState<string>("");
    const [cartOpen, setCartOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { products } = useSelector((state: RootState) => state.products);
    const { cartProducts } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputBrowser(e.target.value);
    };

    //apertura y cierre de modales

    const handleCartOpen = async () => {
        if (cartProducts.length < 1) {
            Swal.fire({
                title: "Carrito de compras",
                text: "El carrito esta vacío",
                showCloseButton: true, // Muestra el botón de cerrar
                showConfirmButton: false, // Oculta el botón de confirmación
            })
            return;
        }
        setCartOpen(true);
    }
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

    const handleRemoveFromCart = (id: number | string, quantity: number) => {
        dispatch(removeItem(id));
        dispatch(incrementStock({ id, quantity }));

        if (cartProducts.length <= 1) {
            dispatch(clearCart());
            handleCartClose();
        }
    };

    const handleIncreaseQuantity = (id: number | string) => {
        const productCart = products.find(item => item.id === id)!;
        if (productCart.quantity < 1) return;
        dispatch(increaseQuantity(id));
        dispatch(decrementStock({ id, quantity: 1 }));
    };

    const handleDecreaseQuantity = (id: number | string) => {
        const productCart = cartProducts.find(item => item.id === id)!;
        if (productCart.quantity < 2) return;
        dispatch(decreaseQuantity(id));
        dispatch(incrementStock({ id, quantity: 1 }));
    };


    const handlePurchase = async (): Promise<void> => {

        handleCartClose();
        // Mostrar la alerta de confirmación de compra
        const result = await Swal.fire({
            title: "Confirmación de Compra",
            text: "¿Está seguro de que desea realizar la compra?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            // Mostrar una alerta de "Procesando..."
            Swal.fire({
                title: "Procesando compra...",
                text: "Por favor, espere.",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading(null); // Muestra el ícono de carga
                }
            });

            try {
                // Aquí llamas a tu endpoint para procesar la compra
                // Esperamos que se complete antes de continuar
                await fakeEndpointCompra();  // Reemplaza con tu función de llamada al endpoint
                dispatch(clearCart());
                // Cerrar la alerta de carga y mostrar el éxito
                Swal.close(); // Cierra la alerta de "Procesando..."
                await Swal.fire(
                    "¡Compra realizada!",
                    "Su compra ha sido procesada con éxito.",
                    "success"
                );
            } catch (error) {
                // Cerrar la alerta de carga y mostrar un error si algo falla
                Swal.close();
                await Swal.fire(
                    "Error",
                    "Ocurrió un problema al procesar la compra. Por favor, intente de nuevo.",
                    "error"
                );
            }
        } else if (result.isDismissed) {
            cartProducts.map((product) => {
                const id = product.id;
                const quantity = product.quantity;
                dispatch(incrementStock({ id, quantity }));
            })
            dispatch(clearCart());
            
            await Swal.fire(
                "Operación cancelada",
                "La compra fue cancelada.",
                "info"
            );

        }
    };

    // Ejemplo de una función de simulación para el endpoint
    const fakeEndpointCompra = async (): Promise<void> => {
        const saleData = {
            user_id: 1, // Aquí deberías obtener el ID del usuario autenticado
            products: cartProducts.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }))
        };
        try {
            const data = await insertSale(saleData);

            if (!data) {
                throw new Error('Error al confirmar la compra');
            }

        } catch (error) {

        } finally {

        }
    };

    /////////////////////////////
    useEffect(() => {
        // Restablecer a la página 1 si cambia el contenido de paginatedProducts
        if (paginatedProducts.length < 9) {
            setCurrentPage(1);
        }
    }, [paginatedProducts]);

    return (
        <>
            <InputBrowser textValue={inputBrowser} handleOnChange={handleOnChange} />
            <Grid2 container display={"flex"} gap={1.5} marginBottom={3}>


                {
                    paginatedProducts.map((product) => (
                        <CardProduct
                            key={product.id}
                            product={product}
                            handleAddToCart={() => handleAddToCart(product)}
                        />
                    ))
                }

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
            <ModalLayout title="Carrito de compras" modalOpen={cartOpen} handleModalClose={handleCartClose}>
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