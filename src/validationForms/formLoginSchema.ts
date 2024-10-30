
import * as Yup from "yup";
import { useFormik } from "formik";
import { InFormLoginProps, InFormLoginValues } from "../interface";

//Validations YUP
export const formLoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Debe ser un correo válido")
        .required("El correo es obligatorio"),
    password: Yup.string()
        .required("La contraseña es obligatoria")
});

//State Formik schema Login Form
export const useLoginForm = ({ onSubmit }: InFormLoginProps) => {
    return useFormik<InFormLoginValues>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: formLoginSchema,
        onSubmit,
    });
};