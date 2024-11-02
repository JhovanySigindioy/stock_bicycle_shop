import { Button, Typography, Grid2 } from "@mui/material";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
    <Grid2 container justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: 2 }}>
        <Button
            variant="outlined"
            color="primary"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
        >
            Anterior
        </Button>
        <Typography color="gray">{currentPage} de {totalPages}</Typography>
        <Button
            variant="outlined"
            color="primary"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
        >
            Siguiente
        </Button>
    </Grid2>
);