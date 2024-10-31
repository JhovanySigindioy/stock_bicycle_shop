import React, { useEffect, useState } from "react";
import { Grid2 } from "@mui/material";
import { CardProduct, InputBrowser } from "../../components";
import { InProduct } from "../../interface";
import { getProducts } from "../../api/products";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Dispatch } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "../../store/slice/sliceLoading";

export const StorePage: React.FC = () => {

    const [products, setProducts] = useState<InProduct[]>([]);
    const { isLoading } = useSelector((state: RootState) => state.loading);
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        dispatch(showLoading());
        getProducts()
            .then((products) => {
                setProducts(products.data);
                dispatch(hideLoading());
            }).catch(() => dispatch(hideLoading()))
    }, []);

    return (
        <>
            <InputBrowser />
            <Grid2 container display={"flex"} gap={2.5}> {/* Utiliza el contenedor de Grid */}
                {
                    isLoading ? <SpinnerLoading /> :
                        products.map((product) => (
                            <CardProduct key={product.id} title={product.name} />
                        ))
                }
            </Grid2>
        </>
    );
};
