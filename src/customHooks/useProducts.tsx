import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InProduct } from "../interface";
import { getProducts } from "../api/products";
import { RootState } from "../store";
import { hideLoading, setProductsState, showLoading } from "../store/slice";

export const useProducts = (searchTerm: string, currentPage: number, itemsPerPage: number) => {

    const products: InProduct[] = useSelector((state: RootState) => state.products);
    const { isLoading } = useSelector((state: RootState) => state.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showLoading());
        getProducts()
            .then((response) => {
                dispatch(setProductsState(response.data));
                dispatch(hideLoading());
            })
            .catch(() => dispatch(hideLoading()));
    }, [dispatch]);

    const normalizedInput = searchTerm.toLowerCase();

    const filteredProducts = useMemo(() => {
        if (!normalizedInput) return products;
        return products.filter((product) =>
            product.name.toLowerCase().includes(normalizedInput)
        );
    }, [products, normalizedInput]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredProducts.slice(start, end);
    }, [filteredProducts, currentPage, itemsPerPage]);

    return { products: paginatedProducts, isLoading, totalPages };
};
