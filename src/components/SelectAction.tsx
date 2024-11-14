import React, { useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { formOpenType } from '../pages/app';

export interface InSelectActionProps {
    handleOpenForm: (type: formOpenType) => void;
}

export const SelectAction: React.FC<InSelectActionProps> = ({ handleOpenForm }) => {
    const [selectedAction, setSelectedAction] = useState<string>("");

    const handleActionSelect = (event: SelectChangeEvent<string>) => {
        const action = event.target.value;
        setSelectedAction(action); // Establecer el valor seleccionado

        switch (action) {
            case 'createProduct':
                handleOpenForm("products"); // Llamamos a handleOpenForm con el tipo "products"
                break;
            case 'createCategory':
                handleOpenForm("categories"); // Llamamos a handleOpenForm con el tipo "categories"
                break;
            case 'createBrand':
                handleOpenForm("brands"); // Llamamos a handleOpenForm con el tipo "brands"
                break;
            case 'createLocation':
                handleOpenForm("locations"); // Llamamos a handleOpenForm con el tipo "locations"
                break;
            default:
                break;
        }

        // Reiniciamos el valor del select después de seleccionar
        setSelectedAction('');
    };

    return (
        <Select
            fullWidth
            value={selectedAction}
            onChange={handleActionSelect}
            displayEmpty
            sx={{ mb: 1 }}
        >
            <MenuItem value="" disabled>
                Seleccione una acción
            </MenuItem>
            <MenuItem value="createProduct">Crear Producto</MenuItem>
            <MenuItem value="createCategory">Crear Categoría</MenuItem>
            <MenuItem value="createBrand">Crear Marca</MenuItem>
            <MenuItem value="createLocation">Crear Ubicación</MenuItem>
        </Select>
    );
};
