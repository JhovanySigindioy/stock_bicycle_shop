import React, { useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
export interface InSelectActionProps {
    handleOpenForm: () => void;
}

export const SelectAction: React.FC<InSelectActionProps> = ({handleOpenForm}) => {
    const [selectedAction, setSelectedAction] = useState<string>("");

    const handleActionSelect = (event: SelectChangeEvent<string>) => {
        const action = event.target.value;
        setSelectedAction(action); // Establecer el valor seleccionado

        switch (action) {
            case 'createProduct':
                handleOpenForm();
                // Aquí debe resetearse
                setSelectedAction(''); // Reiniciar el Select
                break;
            case 'createCategory':
                console.log('Crear Categoría');
                setSelectedAction(''); // Reiniciar el Select
                break;
            case 'createBrand':
                console.log('Crear Marca');
                setSelectedAction(''); // Reiniciar el Select
                break;
            case 'createLocation':
                console.log('Crear Ubicación');
                setSelectedAction(''); // Reiniciar el Select
                break;
            default:
                break;
        }
    };

    return (
        <Select
            fullWidth
            value={selectedAction} // Asigna el estado como valor
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