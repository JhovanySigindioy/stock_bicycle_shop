import React from "react";
import { CustomTable } from "../../components";
import { InColumns } from "../../interface";

const columns: InColumns[] = [
    { headerName: 'Codigo', field: 'barcode' },
    { headerName: 'Nombre', field: 'name' },
    { headerName: 'Stock', field: 'quantity' },
    { headerName: 'Costo', field: 'cost' },
    { headerName: 'Precio de venta', field: 'sale_price' },
];

export const SalesHistoryPage: React.FC = () => {
 
    return (
        <CustomTable columns={columns} rows={[]} />
    );
};