import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DashboardLayout, SpinnerLoading } from "../../components";
import { InListItemsSidebar } from "../../interface";
import { StorePage, CreateProductsPage, ReportsPage, SalesHistoryPage } from "./";
import { AppDispatch, RootState } from "../../store";
import { RoutesAdmin } from "../../router";
import { hideLoading, showLoading } from "../../store/slice";
import { fetchDataSelectors, fetchProducts } from "../../store/thunks";

const listItemsSidebar: InListItemsSidebar[] = [
    {
        path: "/app/store",
        title: "Tienda",
    },
    {
        path: "/app/sales_history",
        title: "Historial de ventas",
    }
];

const listItemsSidebarAdmin: InListItemsSidebar[] = [
    {
        path: "/app/store",
        title: "Tienda",
    },
    {
        path: "/app/sales_history",
        title: "Historial de ventas",
    },
    {
        path: "/app/create_products",
        title: "Crear productos",
    },
    {
        path: "/app/reports",
        title: "Reportes",
    },
];

export const DashboardPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token, rolUser } = useSelector((state: RootState) => state.auth.dataUser);
    const { isLoading } = useSelector((state: RootState) => state.loading); // Estado de carga global
    const {  error } = useSelector((state: RootState) => state.products); // Estado de productos


    // UseEffect para obtener los productos al cargar el componente
    useEffect(() => {
        if (token) { 
            dispatch(showLoading());  // Muestra el loading
            dispatch(fetchProducts())  // Despacha el thunk
                .unwrap()  // Maneja el valor de la respuesta o el error
                .catch(() => {
                    dispatch(hideLoading());  // Oculta el loading si hay un error
                })
                .finally(() => {
                    
                    dispatch(hideLoading());  // Oculta el loading siempre
                });

                dispatch(fetchDataSelectors("categories"));
                dispatch(fetchDataSelectors("brands"));
                dispatch(fetchDataSelectors("locations"));
        }
    }, [dispatch, token]);

    return (
        <DashboardLayout listItemsSidebar={rolUser === "admin" ? listItemsSidebarAdmin : listItemsSidebar}>
            {isLoading ? (
                <SpinnerLoading />
            ) : error ? (
                <div>Error al cargar los productos: {error}</div>
            ) : (
                <Routes>
                    <Route path="store" element={<StorePage />} />
                    <Route path="sales_history" element={<SalesHistoryPage />} />
                    <Route path="create_products" element={
                        <RoutesAdmin>
                            <CreateProductsPage />
                        </RoutesAdmin>
                    } />
                    <Route path="reports" element={
                        <RoutesAdmin>
                            <ReportsPage />
                        </RoutesAdmin>
                    } />
                    <Route path="*" element={<Navigate to="/app/store" />} />
                </Routes>
            )}
        </DashboardLayout>
    );
};
