import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { InActions, InColumns, InProduct } from "../../interface";
import { CustomTable, FormProduct, ModalLayout, FormCreateSelector, InputBrowser, Pagination } from "../../components";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { SelectAction } from "../../components/SelectAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { FormEditProduct } from "../../components/FormEditProduct";
import { deleteProduct, patchProduct } from "../../api/products";
import { deleteProductState } from "../../store/slice";


const itemsPerPage: number = 9;

const columns: InColumns[] = [
    { headerName: 'Codigo', field: 'barcode' },
    { headerName: 'Nombre', field: 'name' },
    { headerName: 'Stock', field: 'quantity' },
    { headerName: 'Costo', field: 'cost' },
    { headerName: 'Precio de venta', field: 'sale_price' },
];

export type formOpenType = "products" | "editProduct" | "brands" | "categories" | "locations";

export const CreateProductsPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { products } = useSelector((state: RootState) => state.products);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [formOpen, setFormOpen] = useState(false);
    const [typeFormOpen, setTypeFormOpen] = useState<formOpenType>("products");
    const [inputBrowser, setInputBrowser] = useState<string>("");
    const [productSelectToEdit, setProductSelectToEdit] = useState<InProduct>();


    const reversedProducts = products.slice().reverse();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputBrowser(e.target.value);
    };


    // Funciones para paginacion
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
        const end = start + itemsPerPage;
        return filteredProducts.slice(start, end);
    }, [filteredProducts, currentPage, itemsPerPage]);
    // Fin Funciones para paginacion


    // Función para abrir el formulario con el tipo seleccionado
    const handleFormOpen = (type: formOpenType): void => {
        setTypeFormOpen(type);
        setFormOpen(true);
    };

    const handleFormClose = (): void => setFormOpen(false);

    const actions: InActions[] = [
        {
            label: 'Edit',
            onClick: (product) => {
                console.log("ppppppppppppppppppp: ", products);
                handleFormOpen("editProduct");
                setProductSelectToEdit(product);
            },
        },
        {
            label: 'Delete',
            onClick: async (product) => {
                const result = await Swal.fire({
                    title: "Confirmación",
                    text: `¿Está seguro de que desea eliminar a "${product.name}"?`,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar",
                    reverseButtons: true,
                });
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Procesando...",
                        text: "Por favor, espere.",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        didOpen: () => {
                            Swal.showLoading(null);
                        }
                    });
                    try {
                        const { error } = await patchProduct(product.id, product);
                        if (error) {
                            throw new Error(error);
                        }
                        dispatch(deleteProductState(product))

                        Swal.close();
                        await Swal.fire(
                            "¡Producto eliminado!",
                            `"${product.name}" ha sido eliminado con éxito.`,
                            "success"
                        );
                    } catch (error) {
                        Swal.close();
                        await Swal.fire(
                            "Error",
                            "Ocurrió un problema al eliminar el elemento. Por favor, intente de nuevo.",
                            "error"
                        );
                    }
                } else if (result.isDismissed) {
                    await Swal.fire(
                        "Operación cancelada",
                        "El proceso fue cancelado con exito.",
                        "info"
                    );
                }
            },
        },
    ];

    const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

    /////////////////////////////
    useEffect(() => {

        // Si la página actual está fuera del rango, restablece la última página válida.
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [paginatedProducts, currentPage, totalPages]);

    return (
        <>
            <InputBrowser handleOnChange={handleOnChange} textValue={inputBrowser} />

            <Box
                className="fadeIn"
                display="flex"
                flexDirection={isSmallScreen ? 'column' : 'row'}
                gap={2}
                height={`calc(100vh-60px)`}
                width="100%"

            >

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

            {/* Modal con el formulario correspondiente */}
            <ModalLayout modalOpen={formOpen} title={""} handleModalClose={handleFormClose}>
                {typeFormOpen === "products" && <FormProduct modaFormClose={handleFormClose} />}

                {typeFormOpen === "editProduct" && <FormEditProduct modaFormClose={handleFormClose} productSel={productSelectToEdit!} />}

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
