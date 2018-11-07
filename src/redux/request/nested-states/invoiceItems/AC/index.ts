import * as invoiceItemsDelete from '../nested-states/invoiceItems-delete/AC';
import * as invoiceItemsGet from '../nested-states/invoiceItems-get/AC';
import * as invoiceItemsPost from '../nested-states/invoiceItems-post/AC';
import * as invoiceItemsPut from '../nested-states/invoiceItems-put/AC';
import {ActionsUnion} from '../../../../../shared/types/ActionsUnion';

const requestActionsFail = {
    get: invoiceItemsGet.Actions.invoiceItemsGetFail,
    post: invoiceItemsPost.Actions.invoiceItemsPostFail,
    put: invoiceItemsPut.Actions.invoiceItemsPutFail,
    delete: invoiceItemsDelete.Actions.invoiceItemsDeleteFail,
};

const requestActionsSuccess = {
    get: invoiceItemsGet.Actions.invoiceItemsGetSuccess,
    post: invoiceItemsPost.Actions.invoiceItemsPostSuccess,
    put: invoiceItemsPut.Actions.invoiceItemsPutSuccess,
    delete: invoiceItemsDelete.Actions.invoiceItemsDeleteSuccess,
};

export const invoiceItemsRequestAC = {
    invoiceItemsDelete,
    invoiceItemsGet,
    invoiceItemsPost,
    invoiceItemsPut,
};

export type RequestActionsFail = ActionsUnion<typeof requestActionsFail>
export type RequestActionsSuccess = ActionsUnion<typeof requestActionsSuccess>