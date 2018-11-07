import * as invoicesDelete from '../nested-states/invoices-delete/AC';
import * as invoicesGet from '../nested-states/invoices-get/AC';
import * as invoicesPost from '../nested-states/invoices-post/AC';
import * as invoicesPut from '../nested-states/invoices-put/AC';
import {ActionsUnion} from '../../../../../shared/types/ActionsUnion';

const requestActionsFail = {
    get: invoicesGet.Actions.invoicesGetFail,
    post: invoicesPost.Actions.invoicesPostFail,
    put: invoicesPut.Actions.invoicesPutFail,
    delete: invoicesDelete.Actions.invoicesDeleteFail,
};

const requestActionsSuccess = {
    get: invoicesGet.Actions.invoicesGetSuccess,
    post: invoicesPost.Actions.invoicesPostSuccess,
    put: invoicesPut.Actions.invoicesPutSuccess,
    delete: invoicesDelete.Actions.invoicesDeleteSuccess,
};

export const invoicesRequestAC = {
    invoicesDelete,
    invoicesGet,
    invoicesPost,
    invoicesPut,
};

export type RequestActionsFail = ActionsUnion<typeof requestActionsFail>
export type RequestActionsSuccess = ActionsUnion<typeof requestActionsSuccess>
export {PostSuccess} from '../nested-states/invoices-post/AC';
export {DeleteSuccess} from '../nested-states/invoices-delete/AC';
export {PutSuccess} from '../nested-states/invoices-put/AC';