import React from "react";
import { Button, Link, TextField } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthLayout } from "./";
import { login } from "../../store/slice";
import { useLoginForm } from "../../validationForms";
import { InFormLoginValues, InUser } from "../../interface";

//Creamos Usuario de Prueba, para alimetar REDUX
const data: InUser = {
    token: "abcdefg",
    nameUser: "Wiliam Sigindioy",
    rolUser: "admin"
}
//Fin

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch();

    const formik = useLoginForm({
        onSubmit: (values) => {
            const cleanValues: InFormLoginValues = {
                ...values,
                email: values.email.trim(),
                password: values.password.trim(),
            }

            localStorage.setItem("dataUser", JSON.stringify(data));
            dispatch(login(data));
        }
    });

    return (
        <AuthLayout title="Iniciar sesión">
            <form onSubmit={formik.handleSubmit}>
                <Grid2 container direction="column" gap={3}>
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
                            {...formik.getFieldProps("password")}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid2>
                    <Grid2 container spacing={2} sx={{ mb: 1 }}>
                        <Grid2 sx={{ width: "100%" }}>
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                            >
                                INGRESAR
                            </Button>
                        </Grid2>
                    </Grid2>
                    <Grid2 container direction="row" justifyContent="end">
                        <Link component={RouterLink} to="/auth/register">
                            Crear cuenta
                        </Link>
                    </Grid2>
                </Grid2>
            </form>
        </AuthLayout>
    );
};