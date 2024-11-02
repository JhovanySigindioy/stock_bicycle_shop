import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from "react";
import { InProduct } from "../interface";

export const CardProduct: React.FC<{ product: InProduct, handleAddToCart: () => void }> = ({ product, handleAddToCart }) => {

    return (
        <Card className="fadeIn" sx={{
            display: "flex",
            boxShadow: 3,
            width: "100%",
            maxWidth: { xs: "100%", md: "48%", lg: "32%" },
            maxHeight: "155px",
            transition: "0.2s",
            "&:hover": {
                boxShadow: 12,
            }
        }}>

            <Box sx={{width: "100%"}}>
                <CardContent sx={{ fontSize: "15px", padding: "10px", "& .MuiTypography-root": { fontSize: "inherit" }, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                        {product.name}
                    </Typography>
                    <Typography component="p" variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                        {product.description}
                    </Typography>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <Box>
                            <Typography component="p" variant="body1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                                <span style={{ fontWeight: "normal" }}>Stock:</span> {product.quantity}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.main" }}>
                                ${product.price.toFixed(2)}
                            </Typography>
                        </Box>
                        <CardActions sx={{ padding: 0, display: "flex", alignItems: "center" }}> {/* Reducir padding */}
                            <Button variant="contained" color="primary" onClick={handleAddToCart}>
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

        </Card>
    );
};
