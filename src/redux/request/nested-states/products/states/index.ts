import {initialState as productsGetState} from '../nested-states/products-get/states';
import {initialState as productsPostState} from '../nested-states/products-post/states';
import {initialState as productsPutState} from '../nested-states/products-put/states';
import {initialState as productsDeleteState} from '../nested-states/products-delete/states';
import {Product} from '../../../../products/states';

export interface RequestNestedState {
    loading: boolean;
    loaded: boolean;
    errors: string | null;
    data: Product[] | Product | null;
}

export interface ProductsRequestState {
    productsGet: RequestNestedState,
    productsPost: RequestNestedState,
    productsPut: RequestNestedState,
    productsDelete: RequestNestedState,
}

export const initialState: ProductsRequestState = {
    productsGet: productsGetState,
    productsPost: productsPostState,
    productsPut: productsPutState,
    productsDelete: productsDeleteState,
};