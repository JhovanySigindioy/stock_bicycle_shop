import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate } from "react-router";

export const RoutesAdmin: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { rolUser } = useSelector((state: RootState) => state.auth.dataUser);
    return rolUser === "admin" ? <>{children}</> : <Navigate to="/app/store" />
};
