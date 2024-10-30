import { InFormLoginValues } from "./InFormLoginValues";

export interface InFormLoginProps {
    onSubmit: (values: InFormLoginValues) => void;
};