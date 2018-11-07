import {initialState as invoiceItemsGetState} from '../nested-states/invoiceItems-get/states';
import {initialState as invoiceItemsPostState} from '../nested-states/invoiceItems-post/states';
import {initialState as invoiceItemsPutState} from '../nested-states/invoiceItems-put/states';
import {initialState as invoiceItemsDeleteState} from '../nested-states/invoiceItems-delete/states';
import {InvoiceItem} from '../../../../invoiceItems/states';

export interface RequestNestedState {
    loading: boolean;
    loaded: boolean;
    errors: string | null;
    data: InvoiceItem[] | InvoiceItem | null;
}

export interface InvoiceItemsRequestState {
    invoiceItemsGet: RequestNestedState,
    invoiceItemsPost: RequestNestedState,
    invoiceItemsPut: RequestNestedState,
    invoiceItemsDelete: RequestNestedState,
}

export const initialState: InvoiceItemsRequestState = {
    invoiceItemsGet: invoiceItemsGetState,
    invoiceItemsPost: invoiceItemsPostState,
    invoiceItemsPut: invoiceItemsPutState,
    invoiceItemsDelete: invoiceItemsDeleteState,
};