import {combineReducers} from 'redux';
import {reducer as productsDeleteReducer} from '../nested-states/products-delete/reducers';
import {reducer as productsGetReducer} from '../nested-states/products-get/reducers';
import {reducer as productsPostReducer} from '../nested-states/products-post/reducers';
import {reducer as productsPutReducer} from '../nested-states/products-put/reducers';

export const productsReducer = combineReducers({
    productsGet: productsGetReducer,
    productsDelete: productsDeleteReducer,
    productsPost: productsPostReducer,
    productsPut: productsPutReducer,
});