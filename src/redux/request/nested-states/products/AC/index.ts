import * as productsDelete from '../nested-states/products-delete/AC';
import * as productsGet from '../nested-states/products-get/AC';
import * as productsPost from '../nested-states/products-post/AC';
import * as productsPut from '../nested-states/products-put/AC';
import {ActionsUnion} from '../../../../../shared/types/ActionsUnion';

const requestActionsFail = {
    get: productsGet.Actions.productsGetFail,
    post: productsPost.Actions.productsPostFail,
    put: productsPut.Actions.productsPutFail,
    delete: productsDelete.Actions.productsDeleteFail,
};

const requestActionsSuccess = {
    get: productsGet.Actions.productsGetSuccess,
    post: productsPost.Actions.productsPostSuccess,
    put: productsPut.Actions.productsPutSuccess,
    delete: productsDelete.Actions.productsDeleteSuccess,
};

export const productsRequestAC = {
    productsDelete,
    productsGet,
    productsPost,
    productsPut,
};

export type RequestActionsFail = ActionsUnion<typeof requestActionsFail>
export type RequestActionsSuccess = ActionsUnion<typeof requestActionsSuccess>
