import React, { useState } from "react";
import { InActions, InColumns, InRows } from "../../interface";
import { CustomTable, FormProduct, ModalLayout, FormCreateSelector } from "../../components/";
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

export type formOpenType = "products" | "brands" | "categories" | "locations";

export const CreateProductsPage: React.FC = () => {

    const [formOpen, setFormOpen] = useState(false);
    const [typeFormOpen, setTypeFormOpen] = useState<formOpenType>("products");

    const handleFormOpen = (type: formOpenType): void => {
        setTypeFormOpen(type);
        setFormOpen(true);
    };

    const handleFormClose = (): void => setFormOpen(false);

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
                        <SelectAction handleOpenForm={() => handleFormOpen("products")} />
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
                                    onClick={() => handleFormOpen("products")}
                                >
                                    Crear Producto
                                </Button>
                                <Button
                                    sx={{ padding: 2 }}
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={() => handleFormOpen("categories")}
                                >
                                    Crear Categoría
                                </Button>
                                <Button
                                    sx={{ padding: 2 }}
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={() => handleFormOpen("brands")}
                                >
                                    Crear Marca
                                </Button>
                                <Button
                                    sx={{ padding: 2 }}
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={() => handleFormOpen("locations")}
                                >
                                    Crear Ubicación
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
            <ModalLayout modalOpen={formOpen} title={`Crear ${typeFormOpen.charAt(0).toUpperCase() + typeFormOpen.slice(1)}`} handleModalClose={handleFormClose}>
                {typeFormOpen === "products" && <FormProduct modaFormClose={handleFormClose} />}
                {typeFormOpen === "categories" && (
                    <FormCreateSelector
                        label="Categoría"
                        selectorType="categories"
                        successMessage="Categoría creada con éxito"
                        modaFormClose={handleFormClose}
                    />
                )}
                {typeFormOpen === "brands" && (
                    <FormCreateSelector
                        label="Marca"
                        selectorType="brands"
                        successMessage="Marca creada con éxito"
                        modaFormClose={handleFormClose}
                    />
                )}
                {typeFormOpen === "locations" && (
                    <FormCreateSelector
                        label="Ubicación"
                        selectorType="locations"
                        successMessage="Ubicación creada con éxito"
                        modaFormClose={handleFormClose}
                    />
                )}
            </ModalLayout>
        </>
    );
};
