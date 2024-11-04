import { Box, Button, Typography } from "@mui/material";
import React from "react";

export const ModalConfirm: React.FC = () => {
    return (
        <Box>
            <Typography>
                ¿Esta seguro de realizar la compra?
            </Typography>
            <Box>
                <Button>Cancelar</Button>
                <Button>Confirmar</Button>
            </Box>
        </Box>
    );
};
