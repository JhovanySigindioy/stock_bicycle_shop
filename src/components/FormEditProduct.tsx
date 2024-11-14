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
    CardMedia,
} from '@mui/material';
import { AppDispatch, RootState } from '../store';
import { uploadImageFirebase } from '../api/firebase';
import { InProduct, InSendProductDB } from '../interface';
import { patchProduct } from '../api/products';
import { updateProduct } from '../store/slice';

export interface InFormEditProductProps {
    productSel: InProduct;
    modaFormClose: () => void;
}

export const FormEditProduct: React.FC<InFormEditProductProps> = ({ modaFormClose, productSel }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, brands, locations } = useSelector((state: RootState) => state.dataSelectors);

    const [product, setProduct] = useState({
        id: productSel.id,
        barcode: productSel.barcode,
        name: productSel.name,
        description: productSel.description,
        cost: productSel.cost,
        sale_price: productSel.sale_price,
        quantity: productSel.quantity,
        active: productSel.active,
        brand: String(brands.find((brand) => productSel.brand === brand.name)?.id),
        category: String(categories.find((categorie) => productSel.category === categorie.name)?.id),
        location: String(locations.find((location) => productSel.location === location.name)?.id),
        img_product: productSel.img_product,
        new_img_product: null as File | null,
    });
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = event.target;

        if (name === 'new_img_product' && (event.target as HTMLInputElement).files) {
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
            text: "¿Está seguro de que desea actualizar el producto?",
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
                let urlImgNewProduct: string = "";

                if (product.new_img_product !== null) {
                    urlImgNewProduct = await uploadImageFirebase(product.new_img_product);
                }

                const newProduct: InSendProductDB = {
                    barcode: product.barcode || '',
                    name: product.name,
                    description: product.description || '',
                    img_product: urlImgNewProduct !== "" ? urlImgNewProduct : product.img_product!,
                    cost: Number(product.cost),
                    sale_price: Number(product.sale_price),
                    quantity: Number(product.quantity),
                    brand_id: Number(product.brand),
                    category_id: Number(product.category),
                    location_id: Number(product.location),
                };
                
                const poductUpdated = await patchProduct(newProduct, product.id);
                // Aqui debemos acambiar a logica de edicion de producto NO creacion
                if (poductUpdated.data) {
                    const createdData = poductUpdated.data[0];
                    const producToRedux: InProduct = {
                        ...createdData,
                        brand: brands.find(brand => brand.id === createdData.brand_id)?.name || '',
                        category: categories.find(categorie => categorie.id === createdData.category_id)?.name || '',
                        location: locations.find(location => location.id === createdData.location_id)?.name || '',
                    };

                    dispatch(updateProduct(producToRedux));
                }
                Swal.close();
                await Swal.fire(
                    "¡Producto actualizado!",
                    "Nuevo producto ha sido actualizado con éxito.",
                    "success"
                );
            } catch (error) {
                Swal.close();
                await Swal.fire(
                    "Error",
                    "Ocurrió un problema al actualizar el producto. Por favor, intente de nuevo.",
                    "error"
                );
            }
        } else if (result.isDismissed) {
            await Swal.fire(
                "Operación cancelada",
                "La actualización del nuevo producto fue cancelada.",
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
            <Grid item xs={12} marginY={3}>
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
                    <CardMedia
                        component={"img"}
                        image={productSel.img_product!}
                        sx={{
                            padding: 1,
                            height: 250,
                            objectFit: "contain",
                            border: "2px solid #dddcdc",
                            borderRadius: 1
                        }}>
                    </CardMedia>
                </FormControl>
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
                        Nueva imagen producto
                    </InputLabel>
                    <TextField
                        type="file"
                        name="new_img_product"
                        onChange={handleChange}
                        inputProps={{
                            style: { paddingTop: '15px' },
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid container justifyContent={"center"}>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Crear Producto
                </Button>
            </Grid>
        </form>
    );
};
