import React from "react";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { calculateTotal } from "../helpers";
import { InProduct } from "../interface";

interface ShoppingCardProps {
    cartProducts: InProduct[];
    onIncrease: (id: string) => void;
    onDecrease: (id: string) => void;
    onRemove: (id: string, quantity: number) => void;
    onPurchase: () => void;
}

export const ShoppingCard: React.FC<ShoppingCardProps> = ({
    cartProducts,
    onIncrease,
    onDecrease,
    onRemove,
    onPurchase,
}) => {

    const totalPrice = calculateTotal(cartProducts);

    return (
        <Box sx={{ backgroundColor: "background.paper", p: 3, borderRadius: 2, boxShadow: 3 }}>
            {cartProducts.length === 0 ? (
                <Typography variant="h6" color="textPrimary">El carrito está vacío</Typography>
            ) : (
                <>
                    {cartProducts.map((item) => (
                        <Box key={item.id} className={"containerScale"} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, p: 2, backgroundColor: "action.hover", borderRadius: 1, "&:hover": {backgroundColor:"#e0e0e0"} }}>
                            <Box>
                                <Typography variant="h6" color="textPrimary">{item.name}</Typography>
                                <Typography variant="body2" color="textSecondary">Cantidad: {item.quantity}</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                    <IconButton color="error" onClick={() => onDecrease(item.id)} aria-label="Disminuir cantidad">
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography variant="body1" sx={{ mx: 2 }}>{item.quantity}</Typography>
                                    <IconButton color="primary" onClick={() => onIncrease(item.id)} aria-label="Aumentar cantidad">
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                                <IconButton color="error" onClick={() => onRemove(item.id, item.quantity)} aria-label="Eliminar producto">
                                    <DeleteIcon />
                                </IconButton>
                                <Typography variant="h6" color="textPrimary">${item.price.toFixed(2)}</Typography>
                            </Box>

                        </Box>
                    ))}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" color="textPrimary">Total</Typography>
                        <Typography variant="h6" color="textPrimary">${totalPrice.toFixed(2)}</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={onPurchase}
                        sx={{ mt: 2 }}
                    >
                        Comprar Ahora
                    </Button>
                </>
            )}
        </Box>
    );
};
