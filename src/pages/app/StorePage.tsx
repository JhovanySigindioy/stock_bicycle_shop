import React from "react";
import { CardProduct } from "../../components/CardProduct";
import { InputBrowser } from "../../components/InputBrowser";
import { Grid2 } from "@mui/material";

export const StorePage: React.FC = () => {
    return (
        <Grid2>
            <InputBrowser />
            <CardProduct />
        </Grid2>
    );
};
