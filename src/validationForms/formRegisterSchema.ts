import * as Yup from "yup";
import { useFormik } from "formik";
import { InFormRegisterProps, InFormRegisterValues } from "../interface";

//Validations YUP
export const formRegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, "El nombre debe tener minimo caracteres")
        .matches(/^[a-zA-Z\s]+$/, "El nombre solo debe contener letras y espacios")
        .required("El nombre es obligatorio")
    ,
    email: Yup.string()
        .email("Debe ser correo válido")
        .required("El correo es obligatorio")
    ,
    password: Yup.string()
        .min(8, "La contraseña debe tener minimo 8 caracteres")
        .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])/, "La contraseña debe incluir al menos un número y un carácter especial")
        .required("La contraseña es obligatoria")
});

//State Formik wih schema Register Form
export const useRegisterForm = ({ onSubmit }: InFormRegisterProps) => {
    return useFormik<InFormRegisterValues>({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: formRegisterSchema,
        onSubmit,
    })
}