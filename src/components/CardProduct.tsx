import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from "react";
import { InProduct } from "../interface";

export const CardProduct: React.FC<{ product: InProduct; handleAddToCart: (id: string) => void; }> = ({ product, handleAddToCart }) => {

    const handleClick = () => {
        if (product.quantity > 0) {
            handleAddToCart(product.id);
        }
    };

    const isOutOfStock = product.quantity < 1;

    return (
        <Card
            className="fadeIn"
            sx={{
                display: "flex",
                boxShadow: 3,
                width: "100%",
                maxWidth: { xs: "100%", md: "48%", lg: "32%" },
                maxHeight: "155px",
                transition: "0.2s",
                position: "relative",
                opacity: isOutOfStock ? 0.7 : 1, // Opacidad reducida cuando no hay stock
                backgroundColor: isOutOfStock ? "grey.200" : "white", // Fondo gris cuando no hay stock
                "&:hover": {
                    boxShadow: 12,
                },
            }}
        >
            <Box sx={{ width: "100%" }}>
                <CardContent
                    sx={{
                        fontSize: "15px",
                        padding: "10px",
                        "& .MuiTypography-root": { fontSize: "inherit" },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                        {product.name}
                    </Typography>
                    <Typography component="p" variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                        {product.description}
                    </Typography>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <Box>
                            <Typography component="p" variant="body1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                                <span style={{ fontWeight: "normal" }}>Stock:</span> {isOutOfStock ? "SIN STOCK" : product.quantity}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.main" }}>
                                ${product.price.toFixed(2)}
                            </Typography>
                        </Box>
                        <CardActions sx={{ padding: 0, display: "flex", alignItems: "center" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleClick}
                                disabled={isOutOfStock} // Botón deshabilitado si no hay stock
                                sx={{
                                    backgroundColor: isOutOfStock ? "grey.500" : "primary.main",
                                    "&:hover": { backgroundColor: isOutOfStock ? "grey.500" : "primary.dark" },
                                }}
                            >
                                <ShoppingCartIcon /> +
                            </Button>
                        </CardActions>
                    </Box>
                </CardContent>
            </Box>
            <CardMedia
                component={"img"}
                image="https://www.w3schools.com/howto/img_avatar.png"
                sx={{
                    width: { xs: 130, md: 140, lg: 145 },
                    objectFit: "fill",
                }}
                alt={"Imagen Producto"}
            />
            {isOutOfStock && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255, 0, 0, 0.1)", // Fondo semitransparente rojo para destacar
                    }}
                >
                    <Box sx={{
                        backgroundColor: "red",
                        padding: 1,
                        borderRadius: 1,
                        border: "2px solid white"
                    }}>
                        <Typography color="white" fontWeight={"bold"}>NO DISPONIBLE</Typography>
                    </Box>


                </Box>
            )}
        </Card>
    );
};
