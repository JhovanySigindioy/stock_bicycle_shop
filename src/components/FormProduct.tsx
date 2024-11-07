import React, { useState } from 'react';
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
import { InProduct, InSendProductDB } from '../interface';
import { createProduct } from '../api/products';
import { setProductState } from '../store/slice';

export const FormProduct: React.FC = () => {
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
        brand: '',
        category: '',
        location: '',
    });

    const categories = useSelector((state: RootState) => state.dataSelectors.categories);
    const brands = useSelector((state: RootState) => state.dataSelectors.brands);
    const locations = useSelector((state: RootState) => state.dataSelectors.locations);


    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
    ) => {
        const { name, value } = event.target;

        // Si el input es un campo tipo file
        if (name === 'img_product' && (event.target as HTMLInputElement).files) {
            const file = (event.target as HTMLInputElement).files![0]; // Accedemos al primer archivo
            setProduct({ ...product, [name]: file });
        }
        // Para SelectChangeEvent, que no tiene la propiedad files
        else if ('value' in event.target) {
            setProduct({ ...product, [name as string]: value });
        }

    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        uploadImageFirebase(product.img_product!).then((urlImgNewProduct) => {
            const newProduct: InSendProductDB = {
                barcode: product.barcode,
                name: product.name,
                description: product.description,
                img_product: urlImgNewProduct,
                cost: Number(product.cost),
                sale_price: Number(product.sale_price),
                quantity: Number(product.quantity),
                brand_id: Number(product.brand),
                category_id: Number(product.category),
                location_id: Number(product.location)
            }

            createProduct(newProduct).then((newProductCreated) => {

                if (newProductCreated.data) {
                    const brand = brands.find((brand) => brand.id === newProductCreated.data![0].brand_id);
                    const categorie = categories.find((categorie) => categorie.id === newProductCreated.data![0].category_id);
                    const location = locations.find((location) => location.id === newProductCreated.data![0].location_id);

                    const producToRedux: InProduct = {
                        id: newProductCreated.data![0].id || 100000,
                        barcode: newProductCreated.data![0].barcode,
                        name: newProductCreated.data![0].name,
                        description: newProductCreated.data![0].description,
                        img_product: newProductCreated.data![0].img_product,
                        cost: newProductCreated.data![0].cost,
                        sale_price: newProductCreated.data![0].sale_price,
                        quantity: newProductCreated.data![0].quantity,
                        brand: brand!.name,
                        category: categorie!.name,
                        location: location!.name,
                    }

                    dispatch(setProductState(producToRedux));
                }


            }).catch((e) => console.error("Error :", e));
        })

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

                {/* Dividimos en dos columnas */}
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

            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Guardar Producto
            </Button>
        </form>
    );
};
