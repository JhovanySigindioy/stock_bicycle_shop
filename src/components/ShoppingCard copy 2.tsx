import React from 'react';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { AddCircleRounded, DeleteOutline, RemoveCircleRounded } from '@mui/icons-material';

interface ShoppingCardProps {
    data: string;
}

const cardItems = [
    { id: 1, name: "Product1"},
    { id: 2, name: "Product2"},
 ]

export const ShoppingCard: React.FC<ShoppingCardProps> = ({ data }) => {
    return (
        <Box sx={{ backgroundColor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
            {cardItems.map((item, index) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'action.hover', borderRadius: 1, transition: "0.2s",
                    "&:hover": {
                        transform: "scale(1.05)",
                    } }}>
                    <Box>
                        <Typography variant="h6" color="textPrimary">{item.name}</Typography>
                        <Typography variant="body2" color="textSecondary">Cantidad: {2}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <IconButton 
                            color="error" 
                            //onClick={() => onDecrease(index)} 
                            aria-label="Disminuir cantidad">
                                <RemoveCircleRounded />
                            </IconButton>
                            <Typography variant="body1" sx={{ mx: 2 }}>{2}</Typography>
                            <IconButton 
                            color="primary" 
                            //onClick={() => onIncrease(index)} 
                            aria-label="Aumentar cantidad">
                                <AddCircleRounded />
                            </IconButton>
                        </Box>
                    </Box>
                    <Typography variant="h6" color="textPrimary">${2}</Typography>
                    <IconButton
                        color="error"
                        //onClick={() => onRemove(index)}
                        aria-label="Eliminar producto"
                    >
                        <DeleteOutline />
                    </IconButton>
                </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="textPrimary">Total</Typography>
                <Typography variant="h6" color="textPrimary">asd</Typography>
            </Box>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                //onClick={onPurchase}
                sx={{ mt: 2 }}
            >
                Comprar Ahora
            </Button>
        </Box>
    );
};
