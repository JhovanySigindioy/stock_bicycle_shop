import React from "react";
import { InActions, InColumns, InRows } from "../../interface";
import { CustomTable } from "../../components/";
import { Box, Button, Typography, Paper, Select, MenuItem } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export const CreateProductsPage: React.FC = () => {
    // Definimos las columnas de la tabla
    const columns: InColumns[] = [
        { headerName: 'ID', field: 'id' },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Age', field: 'age' },
    ];

    // Definimos las filas de la tabla
    const rows: InRows[] = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Smith', age: 30 },
        { id: 3, name: 'Alice Johnson', age: 28 },
    ];

    // Definimos las acciones para cada fila
    const actions: InActions[] = [
        {
            label: 'Edit',
            onClick: (id: number | string) => {
                console.log('Edit row:', id);
                // Aquí puedes ejecutar una función específica, como abrir un modal de edición
            },
        },
        {
            label: 'Delete',
            onClick: (id: number | string) => {
                console.log('Delete row:', id);
                // Aquí puedes ejecutar una función específica, como eliminar el elemento
            },
        },
    ];

    // Verificamos si el tamaño de la pantalla es menor que 'md'
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const handleActionSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        const action = event.target.value as string;
        switch (action) {
            case 'createProduct':
                // Abrir modal para crear producto
                console.log('Crear Producto');
                break;
            case 'createCategory':
                // Abrir modal para crear categoría
                console.log('Crear Categoría');
                break;
            case 'createBrand':
                // Abrir modal para crear marca
                console.log('Crear Marca');
                break;
            case 'createLocation':
                // Abrir modal para crear ubicación
                console.log('Crear Ubicación');
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <Paper elevation={0} sx={{ paddingTop: 6, marginBottom: 2, }}>
                {isMobile ? (
                    <Select
                        fullWidth
                        onChange={handleActionSelect}
                        displayEmpty
                        defaultValue=""
                    >
                        <MenuItem value="" disabled>
                            Seleccione una acción
                        </MenuItem>
                        <MenuItem value="createProduct">Crear Producto</MenuItem>
                        <MenuItem value="createCategory">Crear Categoría</MenuItem>
                        <MenuItem value="createBrand">Crear Marca</MenuItem>
                        <MenuItem value="createLocation">Crear Ubicación</MenuItem>
                    </Select>
                ) : (

                    <Box
                        sx={{
                            display: 'flex', // Flex en pantallas más grandes
                            justifyContent: "space-evenly",
                            marginBottom: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {/* Abrir modal para crear producto */ }}
                            sx={{ marginRight: 1 }} // Espacio entre botones
                        >
                            Crear Producto
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {/* Abrir modal para crear categoría */ }}
                            sx={{ marginRight: 1 }} // Espacio entre botones
                        >
                            Crear Categoría
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {/* Abrir modal para crear marca */ }}
                            sx={{ marginRight: 1 }} // Espacio entre botones
                        >
                            Crear Marca
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {/* Abrir modal para crear ubicación */ }}
                        >
                            Crear Ubicación
                        </Button>
                    </Box>
                )}
            </Paper>

            <CustomTable columns={columns} rows={rows} actions={actions} />
        </div>
    );
};
