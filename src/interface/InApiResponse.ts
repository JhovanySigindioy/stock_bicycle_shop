import { InDataSelectors, InProduct } from "./";
import { InResProductDB } from "./InResProductDB";

export interface InApiResponse {
    error: null | string;
    data: null | InProduct[];
}

export interface InApiResProduct {
    error: null | string;
    data: null | InProduct[];
}


export interface InApiResProductCreated {
    error: null | string;
    data: null | InResProductDB[];
}

export interface InApiResDataSelectors {
    error: null | string;
    data: null | InDataSelectors[];
}




