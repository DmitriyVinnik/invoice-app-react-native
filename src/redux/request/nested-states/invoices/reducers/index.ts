import {combineReducers} from 'redux';
import {reducer as invoicesDeleteReducer} from '../nested-states/invoices-delete/reducers';
import {reducer as invoicesGetReducer} from '../nested-states/invoices-get/reducers';
import {reducer as invoicesPostReducer} from '../nested-states/invoices-post/reducers';
import {reducer as invoicesPutReducer} from '../nested-states/invoices-put/reducers';

export const invoicesReducer = combineReducers({
    invoicesGet: invoicesGetReducer,
    invoicesDelete: invoicesDeleteReducer,
    invoicesPost: invoicesPostReducer,
    invoicesPut: invoicesPutReducer,
});