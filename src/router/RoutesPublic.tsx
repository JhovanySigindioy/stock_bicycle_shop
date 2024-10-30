import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const RoutesPublic: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    return !isAuthenticated ? <>{children}</> : <Navigate to="/app/home" />;
};
