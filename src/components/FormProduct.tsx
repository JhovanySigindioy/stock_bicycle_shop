import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import {
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Grid,
    SelectChangeEvent,
} from '@mui/material';
import { AppDispatch, RootState } from '../store';
import { uploadImageFirebase } from '../api/firebase';
import { InApiResProductCreated, InProduct, InSendProductDB } from '../interface';
import { createProduct } from '../api/products';
import { setProductState } from '../store/slice';

export interface InFormCreateProductProps {
    modaFormClose: () => void;
}

export const FormProduct: React.FC<InFormCreateProductProps> = ({ modaFormClose }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [product, setProduct] = useState({
        id: '',
        barcode: '',
        name: '',
        description: '',
        img_product: null as File | null,
        cost: '',
        sale_price: '',
        quantity: '',
        active: true,
        brand: '',
        category: '',
        location: '',
    });

    const { categories, brands, locations } = useSelector((state: RootState) => state.dataSelectors);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = event.target;

        if (name === 'img_product' && (event.target as HTMLInputElement).files) {
            const file = (event.target as HTMLInputElement).files![0];
            setProduct(prev => ({ ...prev, [name]: file }));
        } else {
            setProduct(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        modaFormClose();

        const result = await Swal.fire({
            title: "Confirmación",
            text: "¿Está seguro de que desea crear el nuevo producto?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            // Mostrar una alerta de "Procesando..."
            Swal.fire({
                title: "Procesando...",
                text: "Por favor, espere.",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading(null); // Muestra el ícono de carga
                }
            });

            try {
                // Subir la imagen a Firebase
                const urlImgNewProduct = await uploadImageFirebase(product.img_product!);

                // Crear el objeto del nuevo producto
                const newProduct: InSendProductDB = {
                    barcode: product.barcode,
                    name: product.name,
                    description: product.description,
                    img_product: urlImgNewProduct,
                    cost: Number(product.cost),
                    sale_price: Number(product.sale_price),
                    quantity: Number(product.quantity),
                    active: product.active,
                    brand_id: Number(product.brand),
                    category_id: Number(product.category),
                    location_id: Number(product.location),
                };

                // Crear el producto en la base de datos
                const newProductCreated: InApiResProductCreated = await createProduct(newProduct);

                if (newProductCreated.data) {
                    const createdData = newProductCreated.data[0];
                    const producToRedux: InProduct = {
                        ...createdData,
                        brand: brands.find(brand => brand.id === createdData.brand_id)?.name || '',
                        category: categories.find(categorie => categorie.id === createdData.category_id)?.name || '',
                        location: locations.find(location => location.id === createdData.location_id)?.name || '',
                    };

                    // Actualizar el estado global con el nuevo producto
                    dispatch(setProductState(producToRedux));
                }

                // Cerrar la alerta de carga y mostrar el éxito
                Swal.close(); // Cierra la alerta de "Procesando..."
                await Swal.fire(
                    "¡Producto creado!",
                    "Nuevo producto ha sido creado con éxito.",
                    "success"
                );
            } catch (error) {
                // Cerrar la alerta de carga y mostrar un error si algo falla
                Swal.close();
                await Swal.fire(
                    "Error",
                    "Ocurrió un problema al procesar la creacion del nuevo producto. Por favor, intente de nuevo.",
                    "error"
                );
            }
        } else if (result.isDismissed) {
            await Swal.fire(
                "Operación cancelada",
                "La creacion del nuevo producto fue cancelada.",
                "info"
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Código de Barras"
                        name="barcode"
                        value={product.barcode}
                        onChange={handleChange}
                        placeholder="Opcional"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} mb={1}>
                    <TextField
                        fullWidth
                        label="Descripción"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Opcional"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" sx={{ position: 'relative' }}>
                        <InputLabel
                            shrink
                            sx={{
                                position: 'absolute',
                                left: '12px',
                                backgroundColor: 'white',
                                padding: '0 4px',
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontSize: '0.8rem',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none',
                            }}
                        >
                            Imagen del producto
                        </InputLabel>
                        <TextField
                            type="file"
                            name="img_product"
                            onChange={handleChange}
                            inputProps={{
                                style: { paddingTop: '15px' },
                            }}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={6} container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Costo"
                            name="cost"
                            type="number"
                            value={product.cost}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Precio de Venta"
                            name="sale_price"
                            type="number"
                            value={product.sale_price}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Cantidad"
                            name="quantity"
                            type="number"
                            value={product.quantity}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                </Grid>

                <Grid item xs={6} container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel id="brand-label">Marca</InputLabel>
                            <Select
                                labelId="brand-label"
                                name="brand"
                                label="Marca"
                                value={product.brand}
                                onChange={handleChange}
                            >
                                {
                                    brands?.map((brand) => (
                                        <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel id="category-label">Categoría</InputLabel>
                            <Select
                                labelId="category-label"
                                name="category"
                                label="Categoría"
                                value={product.category}
                                onChange={handleChange}
                            >
                                {
                                    categories?.map((categorie) => (
                                        <MenuItem key={categorie.id} value={categorie.id}>{categorie.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel id="location-label">Ubicación</InputLabel>
                            <Select
                                labelId="location-label"
                                name="location"
                                label="Ubicación"
                                value={product.location}
                                onChange={handleChange}
                            >
                                {
                                    locations?.map((location) => (
                                        <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent={"center"}>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Crear Producto
                </Button>
            </Grid>
        </form>
    );
};