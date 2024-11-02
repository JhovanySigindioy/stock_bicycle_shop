import React from 'react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface ShoppingCardProps {
    cardItems: { id: number; name: string; quantity: number; price: number }[];
    onIncrease: (index: number) => void;
    onDecrease: (index: number) => void;
    onRemove: (index: number) => void;
    onPurchase: () => void;
}

export const ShoppingCard: React.FC<ShoppingCardProps> = ({
    cardItems,
    onIncrease,
    onDecrease,
    onRemove,
    onPurchase,
}) => {
    const totalPrice = cardItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Box sx={{ backgroundColor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
            {cardItems.map((item, index) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'action.hover', borderRadius: 1 }}>
                    <Box>
                        <Typography variant="h6" color="textPrimary">{item.name}</Typography>
                        <Typography variant="body2" color="textSecondary">Cantidad: {item.quantity}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <IconButton color="error" onClick={() => onDecrease(index)} aria-label="Disminuir cantidad">
                                <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ mx: 2 }}>{item.quantity}</Typography>
                            <IconButton color="primary" onClick={() => onIncrease(index)} aria-label="Aumentar cantidad">
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Typography variant="h6" color="textPrimary">${item.price.toFixed(2)}</Typography>
                    <IconButton color="error" onClick={() => onRemove(index)} aria-label="Eliminar producto">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
        </Box>
    );
};
