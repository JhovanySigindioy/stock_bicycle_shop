import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

export const SpinnerLoading: React.FC = () => {
    return (
        <Stack
            display="flex"
            width="100%"
            flexDirection="column"
            alignItems="center"
            gap={1}
        >
            <CircularProgress color="secondary" />
            <Typography variant="h5" color="secondary">Cargando...</Typography>
        </Stack>
    );
};
