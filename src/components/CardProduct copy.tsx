import { Box, Button, Card, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from "react";
import { useDispatch } from "react-redux";
import { decrementStock } from "../store/slice"; // Asegúrate de que la ruta sea correcta
import { InProduct } from "../interface";

export const CardProduct: React.FC<{ product: InProduct }> = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        // Despachar decrementStock al agregar el producto al carrito
        dispatch(decrementStock({ id: product.id, quantity: 1 }));
        // Aquí puedes agregar lógica adicional si es necesario
    };

    return (
        <Card
            className="fadeIn"
            sx={{
                display: "flex",
                flexDirection: "row",
                maxWidth: { xs: "100%", md: "48%", lg: "32%" },
                boxShadow: 3,
                borderRadius: 2,
                transition: "0.3s",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                },
            }}
        >
            <CardMedia
                component={"img"}
                image="https://www.w3schools.com/howto/img_avatar.png"
                sx={{
                    width: 100,  // Ancho reducido para la imagen
                    height: 100, // Altura reducida para compactar aún más
                    objectFit: "cover",
                    borderTopLeftRadius: 2,
                    borderBottomLeftRadius: 2,
                }}
                alt={"Imagen Producto"}
            />
            <Box>
                <CardContent sx={{ flex: 1, padding: 0.5 }}> {/* Reducir padding */}
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                        {product.name}
                    </Typography>
                    <Typography component="p" variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                        {product.description} {/* Asegúrate de que `description` sea parte del producto */}
                    </Typography>
                    <Typography component="p" variant="body1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                        <span style={{ fontWeight: "normal" }}>Stock:</span> {product.quantity}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.main" }}>
                        ${product.price.toFixed(2)}
                    </Typography>
                </CardContent>
                <CardActions sx={{ padding: 0, display: "flex", alignItems: "center" }}> {/* Reducir padding */}
                    <Button variant="contained" color="primary" onClick={handleAddToCart} fullWidth startIcon={<ShoppingCartIcon />}>
                        Comprar
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
};
