import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DashboardLayout } from "../../components";
import { InListItemsSidebar } from "../../interface";
import { StorePage, CreateProductsPage, ReportsPage, SalesHistoryPage } from "./";
import { RootState } from "../../store";
import { RoutesAdmin } from "../../router";
import { clearCart, hideLoading, setProductsState, showLoading } from "../../store/slice";
import { getProducts } from "../../api/products";


const listItemsSidebar: InListItemsSidebar[] = [
    {
        path: "/app/store",
        title: "Tienda",
    },
    {
        path: "/app/sales_history",
        title: "Historial de ventas",
    }
]

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
]

export const DashboardPage: React.FC = () => {
    
    const { token, rolUser } = useSelector((state: RootState) => state.auth.dataUser);
    const dispatch = useDispatch();
    //Se trae los productos desde la bd y se asignan a redux(estado global)
    useEffect(() => {
        dispatch(clearCart());
        dispatch(showLoading());
        getProducts()
            .then((response) => {
                dispatch(setProductsState(response.data));
                dispatch(hideLoading());
            })
            .catch(() => dispatch(hideLoading()));
    }, [dispatch]);

    return (
        <DashboardLayout listItemsSidebar={rolUser === "admin" ? listItemsSidebarAdmin : listItemsSidebar}>
            <Routes>
                <Route path="store" element={<StorePage />} />
                <Route path="sales_history" element={< SalesHistoryPage />} />
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
        </DashboardLayout>
    );
};
