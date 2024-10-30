import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { RoutesPrivate, RoutesPublic } from "./";
import { RoutesAuth } from "../pages/auth";
import { DashboardPage } from "../pages/app";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const RouterMain: React.FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    return (
        <Routes>
            <Route path="/app/*" element={
                <RoutesPrivate>
                    <DashboardPage />
                </RoutesPrivate>} />

            <Route path="/auth/*" element={
                <RoutesPublic>
                    <RoutesAuth />
                </RoutesPublic>} />

            <Route path="*" element={isAuthenticated ? <Navigate to="/app/store" /> : <Navigate to="/auth/login" />} />
        </Routes>
    );
};
