import React, { useState } from "react";
import { InActions, InColumns, InRows } from "../../interface";
import { CustomTable, FormProduct, ModalLayout } from "../../components/";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { SelectAction } from "../../components/SelectAction";

const columns: InColumns[] = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Age', field: 'age' },
];

const rows: InRows[] = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Alice Johnson', age: 28 },
    { id: 4, name: 'John Doe', age: 25 },
    { id: 5, name: 'Jane Smith', age: 30 },
];

const actions: InActions[] = [
    {
        label: 'Edit',
        onClick: (id: number | string) => {
            console.log('Edit row:', id);
        },
    },
    {
        label: 'Delete',
        onClick: (id: number | string) => {
            console.log('Delete row:', id);
        },
    },
];


export const CreateProductsPage: React.FC = () => {

    const [cartOpen, setCartOpen] = useState(false);
    const handleCartOpen = (): void => setCartOpen(true);
    const handleCartClose = (): void => setCartOpen(false);

    const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

    return (
        <>
            <Box
                className="fadeIn"
                display="flex"
                flexDirection={isSmallScreen ? 'column' : 'row'}
                gap={2}
                height={`calc(100vh-60px)`}
                width="100%"
                paddingTop={{ xs: 2, md: 4 }}
            >
                <Box width={isSmallScreen ? '100%' : '75%'} order={isSmallScreen ? 2 : 1}>
                    <CustomTable columns={columns} rows={rows} actions={actions} />
                </Box>
                <Box width={isSmallScreen ? '100%' : '25%'} order={isSmallScreen ? 1 : 2}>
                    {isSmallScreen ? (
                        <SelectAction handleOpenForm={handleCartOpen}/>
                    ) : (
                        <Box sx={{ textAlign: "center", padding: 2 }}>
                            <Typography variant="h5" mb={2}>Acciones</Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 3,
                            }}>
                                <Button
                                    sx={{ padding: 2 }}
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={() => handleCartOpen()}
                                >
                                    Crear Producto
                                </Button>
                                <Button
                                    sx={{ padding: 2 }}
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={() => console.log('Crear Categoría')}
                                >
                                    Crear Categoría
                                </Button>
                                <Button
                                    sx={{ padding: 2 }}
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={() => console.log('Crear Marca')}
                                >
                                    Crear Marca
                                </Button>
                                <Button
                                    sx={{ padding: 2 }}
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={() => console.log('Crear Ubicación')}
                                >
                                    Crear Ubicación
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
            <ModalLayout cartOpen={cartOpen} title="Crear Producto" handleCartClose={handleCartClose}>
                <FormProduct />
            </ModalLayout>
        </>
    );
};
