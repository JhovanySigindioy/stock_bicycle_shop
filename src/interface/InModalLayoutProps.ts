import { ReactNode } from "react";

export interface ModalLayoutProps {
    title: string;
    cartOpen: boolean;
    handleCartClose: () => void;
    children: ReactNode;
}