import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { InActions, InColumns, InPatchProduct, InProduct } from "../../interface";
import {
    CustomTable,
    FormProduct,
    ModalLayout,
    FormCreateSelector,
    InputBrowser,
    Pagination,
    FormEditProduct
} from "../../components";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { SelectAction } from "../../components/SelectAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { patchProduct } from "../../api/products";
import { deleteProductState } from "../../store/slice";
import { findNonSerializableValue } from "@reduxjs/toolkit";

// Configuración inicial de la tabla y paginación
const itemsPerPage = 9;
const columns: InColumns[] = [
    { headerName: 'Codigo', field: 'barcode' },
    { headerName: 'Nombre', field: 'name' },
    { headerName: 'Stock', field: 'quantity' },
    { headerName: 'Costo', field: 'cost' },
    { headerName: 'Precio de venta', field: 'sale_price' },
];

export type formOpenType = "products" | "editProduct" | "brands" | "categories" | "locations";

export const CreateProductsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);

    const [currentPage, setCurrentPage] = useState(1);
    const [formOpen, setFormOpen] = useState(false);
    const [typeFormOpen, setTypeFormOpen] = useState<formOpenType>("products");
    const [inputBrowser, setInputBrowser] = useState("");
    const [productSelectToEdit, setProductSelectToEdit] = useState<number | string>("");

    const reversedProducts = products.slice().reverse();

    // Funciones de búsqueda y filtrado
    const normalizedInput = inputBrowser.toLowerCase();
    const filteredProducts = useMemo(() => {
        if (!normalizedInput) return reversedProducts;
        return reversedProducts.filter((product) =>
            product.name.toLowerCase().includes(normalizedInput)
        );
    }, [reversedProducts, normalizedInput]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage]);

    // Funciones para manejar el formulario
    const handleFormOpen = (type: formOpenType) => {
        setTypeFormOpen(type);
        setFormOpen(true);
    };

    const handleFormClose = () => setFormOpen(false);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputBrowser(e.target.value);
    };

    const actions: InActions[] = [
        {
            label: 'Edit',
            onClick: (id: number | string) => {
                handleFormOpen("editProduct");
                setProductSelectToEdit(id);
            },
        },
        {
            label: 'Delete',
            onClick: async (id: number | string) => {
                const result = await Swal.fire({
                    title: "Confirmación",
                    text: `¿Está seguro de que desea eliminar el producto?`,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar",
                    reverseButtons: true,
                });
                if (result.isConfirmed) {
                    Swal.fire({ title: "Procesando...", allowOutsideClick: false, didOpen: () => Swal.showLoading(null) });
                    try {
                        const productToDelete = products.find((product) => product.id === id)!;
                        const removedProduct: Partial<InPatchProduct> = {
                            id: productToDelete.id,
                            active: false,
                        };
                        const { error } = await patchProduct(removedProduct);

                        if (error) throw new Error(error);
                        
                        dispatch(deleteProductState(id));
                        Swal.close();
                        Swal.fire("¡Producto eliminado!", `ha sido eliminado con éxito.`, "success");
                    } catch (error) {
                        Swal.close();
                        Swal.fire("Error", "Ocurrió un problema al eliminar el producto. Por favor, intente de nuevo.", "error");
                    }
                }
            },
        },
    ];

    const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [paginatedProducts, currentPage, totalPages]);

    return (
        <>
            <InputBrowser handleOnChange={handleOnChange} textValue={inputBrowser} />
            <Box className="fadeIn" display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} gap={2} height="calc(100vh - 60px)" width="100%">
                <Box width={isSmallScreen ? '100%' : '75%'} order={isSmallScreen ? 2 : 1}>
                    <CustomTable columns={columns} rows={paginatedProducts} actions={actions} />
                    <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages} />
                </Box>
                <Box width={isSmallScreen ? '100%' : '25%'} order={isSmallScreen ? 1 : 2}>
                    {isSmallScreen ? (
                        <SelectAction handleOpenForm={handleFormOpen} />
                    ) : (
                        <Box sx={{ textAlign: "center", padding: 2 }}>
                            <Typography variant="h5" mb={2}>Acciones</Typography>
                            <Box display="flex" flexDirection="column" gap={3}>
                                {["products", "categories", "brands", "locations"].map((type) => (
                                    <Button
                                        key={type}
                                        sx={{ padding: 2 }}
                                        variant="contained"
                                        fullWidth
                                        color="primary"
                                        onClick={() => handleFormOpen(type as formOpenType)}
                                    >
                                        Crear {type === "products" ? "Producto" : type === "categories" ? "Categoría" : type === "brands" ? "Marca" : "Ubicación"}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>

            <ModalLayout modalOpen={formOpen} title={""} handleModalClose={handleFormClose}>
                {typeFormOpen === "products" && <FormProduct modaFormClose={handleFormClose} />}
                {typeFormOpen === "editProduct" && productSelectToEdit && (
                    <FormEditProduct modaFormClose={handleFormClose} idProductSelect={productSelectToEdit} />
                )}
                {typeFormOpen === "categories" && (
                    <FormCreateSelector label="Categoría" selectorType="categories" successMessage="Categoría creada con éxito" modaFormClose={handleFormClose} />
                )}
                {typeFormOpen === "brands" && (
                    <FormCreateSelector label="Marca" selectorType="brands" successMessage="Marca creada con éxito" modaFormClose={handleFormClose} />
                )}
                {typeFormOpen === "locations" && (
                    <FormCreateSelector label="Ubicación" selectorType="locations" successMessage="Ubicación creada con éxito" modaFormClose={handleFormClose} />
                )}
            </ModalLayout>
        </>
    );
};
