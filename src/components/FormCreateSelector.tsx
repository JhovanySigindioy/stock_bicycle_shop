import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button, Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { InSendNewSelectorDB } from "../interface/InSendNewSelectorDB";
import { setSelectorsState, typeSelector } from "../store/slice";
import { createDataToSelectors } from "../api/products";

export interface FormCreateSelectorsProps {
    modaFormClose: () => void;
    selectorType: typeSelector; // Añade más tipos si es necesario
    label: string; // Texto para el label del campo de texto
    successMessage: string; // Mensaje de éxito personalizado
}

export const FormCreateSelector: React.FC<FormCreateSelectorsProps> = ({ modaFormClose, selectorType, label, successMessage }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<InSendNewSelectorDB>({ name: "" });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setData({ ...data, name: event.target.value });
    };

    const confirmCreation = async () => {
        return await Swal.fire({
            title: "Confirmación",
            text: `¿Está seguro de que desea crear nueva ${label.toLowerCase()}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        modaFormClose();

        if (!data.name.trim()) {
            await Swal.fire("Error", `Debe ingresar un nombre para la ${label.toLowerCase()}.`, "error");
            return;
        }

        const result = await confirmCreation();
        if (result.isConfirmed) {
            Swal.fire({ title: "Procesando...", text: "Por favor, espere.", showConfirmButton: false, allowOutsideClick: false, didOpen: () => Swal.showLoading(null) });

            try {
                const newItemToSelectorsCreated = await createDataToSelectors(data, selectorType);

                if (newItemToSelectorsCreated.data) {
                    dispatch(setSelectorsState({ ...newItemToSelectorsCreated.data[0], selectorType }));
                }

                Swal.close();
                await Swal.fire(`${label} creada!`, successMessage, "success");
                modaFormClose();
            } catch (error) {
                Swal.close();
                await Swal.fire("Error", `Ocurrió un problema al crear la ${label.toLowerCase()}. Por favor, intente de nuevo.`, "error");
            }
        } else if (result.isDismissed) {
            await Swal.fire("Operación cancelada", `La creación de la ${label.toLowerCase()} fue cancelada.`, "info");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label={label}
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        placeholder={`Ingrese nueva ${label.toLowerCase()}`}
                        required
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent={"center"}>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Guardar {label}
                </Button>
            </Grid>
        </form>
    );
};
