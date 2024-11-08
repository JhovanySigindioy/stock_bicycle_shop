import { ReactNode } from "react";

export interface ModalLayoutProps {
    title: string;
    modalOpen: boolean;
    handleModalClose: () => void;
    children: ReactNode;
}