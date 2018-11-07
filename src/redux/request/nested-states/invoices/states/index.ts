import {initialState as invoicesGetState} from '../nested-states/invoices-get/states';
import {initialState as invoicesPostState} from '../nested-states/invoices-post/states';
import {initialState as invoicesPutState} from '../nested-states/invoices-put/states';
import {initialState as invoicesDeleteState} from '../nested-states/invoices-delete/states';
import {Invoice} from '../../../../invoices/states';

export interface RequestNestedState {
    loading: boolean;
    loaded: boolean;
    errors: string | null;
    data: Invoice[] | Invoice | null;
}

export interface InvoicesRequestState {
    invoicesGet: RequestNestedState,
    invoicesPost: RequestNestedState,
    invoicesPut: RequestNestedState,
    invoicesDelete: RequestNestedState,
}

export const initialState: InvoicesRequestState = {
    invoicesGet: invoicesGetState,
    invoicesPost: invoicesPostState,
    invoicesPut: invoicesPutState,
    invoicesDelete: invoicesDeleteState,
};