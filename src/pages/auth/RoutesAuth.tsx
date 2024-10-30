import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

export const RoutesAuth: React.FC = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};
