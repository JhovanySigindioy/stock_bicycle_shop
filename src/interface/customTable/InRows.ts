// Definimos el tipo para las filas, que tendrá una propiedad `id` de tipo string o number, y otros valores dinámicos
export interface InRows {
    id: string | number;
    [key: string]: any;
}