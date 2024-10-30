import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid2, Link, TextField } from "@mui/material";
import { AuthLayout } from "./";
import { useRegisterForm } from "../../validationForms";
import { InFormRegisterValues } from "../../interface";

export const RegisterPage: React.FC = () => {

    const formik = useRegisterForm({
        onSubmit: (values) => {
            //Pendient backend with validation
            const cleanValues: InFormRegisterValues = {
                ...values,
                name: values.name.trim(),
                email: values.email.trim().toLowerCase(),
                password: values.password.trim(),
            }

            console.log("Formulario REGISTER enviado con los valores:", cleanValues);
        }
    });

    return (
        <AuthLayout title="Registro">
            <form onSubmit={formik.handleSubmit}>
                <Grid2
                    container
                    direction={"column"}
                    gap={3}
                >
                    <Grid2>
                        <TextField
                            label="Nombre"
                            type="text"
                            placeholder="Ingrese su nombre"
                            fullWidth
                            {
                            ...formik.getFieldProps("name")
                            }
                            error={
                                formik.touched.name && Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                        />
                    </Grid2>
                    <Grid2>
                        <TextField
                            label="E-mail"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            fullWidth
                            {
                            ...formik.getFieldProps("email")
                            }
                            error={
                                formik.touched.email && Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                        />
                    </Grid2>
                    <Grid2>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            {
                            ...formik.getFieldProps("password")
                            }
                            error={
                                formik.touched.password && Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password && formik.errors.password
                            }
                        />
                    </Grid2>
                    <Grid2
                        container
                        spacing={2}
                        sx={{ mb: 1 }}
                    >
                        <Grid2 sx={{ width: '100%' }}>
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                            >
                                Crear cuenta
                            </Button>
                        </Grid2>
                    </Grid2>
                    <Grid2 container direction={"row"} justifyContent={"end"}>
                        <Link component={RouterLink} to={"/auth/login"}>
                            Iniciar sesión
                        </Link>
                    </Grid2>
                </Grid2>
            </form>
        </AuthLayout>
    );
};