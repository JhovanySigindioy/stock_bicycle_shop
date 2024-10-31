import { InProduct } from "./";

export interface InApiResponse {
    error: null | string;
    data: InProduct[];
}