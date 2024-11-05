import { InActions, InColumns, InRows } from "./";

// Definimos el tipo para las props del componente `CustomTable`
export interface CustomTableProps {
    columns: InColumns[];
    rows: InRows[];
    actions?: InActions[];
}