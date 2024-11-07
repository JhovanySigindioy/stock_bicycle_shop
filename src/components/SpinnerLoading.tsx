import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

export const SpinnerLoading: React.FC = () => {
    return (
        <Stack
            display="flex"
            width="100%"
             height="calc(100vh - 60px)"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={1}
        >
            <CircularProgress color="secondary" />
            <Typography variant="h5" color="secondary">Cargando...</Typography>
        </Stack>
    );
};
