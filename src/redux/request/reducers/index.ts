import {combineReducers} from 'redux';
import {customersReducer} from '../nested-states/customers/reducers';
import {productsReducer} from '../nested-states/products/reducers';
import {invoicesReducer} from '../nested-states/invoices/reducers';
import {invoiceItemsReducer} from '../nested-states/invoiceItems/reducers';

export const requestReducer = combineReducers({
    customers: customersReducer,
    products: productsReducer,
    invoices: invoicesReducer,
    invoiceItems: invoiceItemsReducer,
});