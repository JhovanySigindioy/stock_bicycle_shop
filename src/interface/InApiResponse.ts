import { InDataSelectors, InProduct, InSendProductDB } from "./";

export interface InApiResponse {
    error: null | string;
    data: null | InProduct[];
}

export interface InApiResProduct {
    error: null | string;
    data: null | InProduct[];
}

export interface InApiResDataSelectors {
    error: null | string;
    data: null | InDataSelectors[];
}

export interface InApiResProductCreated {
    error: null | string;
    data: null | InSendProductDB[];
}