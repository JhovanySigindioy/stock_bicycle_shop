import React from 'react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { calculateTotal } from '../helpers';
import { InProduct } from '../interface';

interface ShoppingCardProps {
    cardItems: InProduct[];
    onIncrease: (id: string) => void;
    onDecrease: (id: string) => void;
    onRemove: (id: string) => void;
    onPurchase: () => void;
}

export const ShoppingCard: React.FC<ShoppingCardProps> = ({
    cardItems,
    onIncrease,
    onDecrease,
    onRemove,
    onPurchase,
}) => {
    const totalPrice = calculateTotal(cardItems);

    return (
        <Box sx={{ backgroundColor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
            {cardItems.length === 0 ? (
                <Typography variant="h6" color="textPrimary">El carrito está vacío</Typography>
            ) : (
                <>
                    {cardItems.map((item) => (
                        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'action.hover', borderRadius: 1 }}>
                            <Box>
                                <Typography variant="h6" color="textPrimary">{item.name}</Typography>
                                <Typography variant="body2" color="textSecondary">Cantidad: {item.quantity}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <IconButton color="error" onClick={() => onDecrease(item.id)} aria-label="Disminuir cantidad">
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography variant="body1" sx={{ mx: 2 }}>{item.quantity}</Typography>
                                    <IconButton color="primary" onClick={() => onIncrease(item.id)} aria-label="Aumentar cantidad">
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography variant="h6" color="textPrimary">${item.price.toFixed(2)}</Typography>
                            <IconButton color="error" onClick={() => onRemove(item.id)} aria-label="Eliminar producto">
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
                </>
            )}
        </Box>
    );
};
