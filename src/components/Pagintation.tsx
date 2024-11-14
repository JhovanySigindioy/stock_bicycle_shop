import React, { useEffect } from "react";
import { Button, Typography, Grid as Grid2 } from "@mui/material";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Usamos useEffect para manejar el cambio de página inicial
    useEffect(() => {
        if (totalPages < 2) {
            onPageChange(1); // Llamamos a esta función solo cuando totalPages cambia
        }
    }, [totalPages, onPageChange]);

    return (
        <Grid2 container justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: 3 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                sx={{
                    textTransform: "none",
                    fontSize: "0.9rem",
                    opacity: currentPage === 1 ? 0.5 : 1,
                    transition: "opacity 0.2s ease",
                }}
            >
                {"<<"}
            </Button>

            <Typography
                color="textSecondary"
                sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    marginX: 2,
                    color: "gray"
                }}
            >
                Página {currentPage} de {totalPages}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                sx={{
                    textTransform: "none",
                    fontSize: "0.9rem",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    transition: "opacity 0.2s ease",
                }}
            >
                {">>"}
            </Button>
        </Grid2>
    );
};
