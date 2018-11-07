import * as customersState from '../nested-states/customers/states';
import * as productsState from '../nested-states/products/states';
import * as invoicesState from '../nested-states/invoices/states';
import * as invoiceItemsState from '../nested-states/invoiceItems/states';

export interface RequestState {
    customers: customersState.CustomersRequestState,
    products: productsState.ProductsRequestState,
    invoices: invoicesState.InvoicesRequestState,
    invoiceItems: invoiceItemsState.InvoiceItemsRequestState,
}

export const initialState: RequestState = {
    customers: customersState.initialState,
    products: productsState.initialState,
    invoices: invoicesState.initialState,
    invoiceItems: invoiceItemsState.initialState,
};
