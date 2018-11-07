import {combineReducers} from 'redux';
import {reducer as invoiceItemsDeleteReducer} from '../nested-states/invoiceItems-delete/reducers';
import {reducer as invoiceItemsGetReducer} from '../nested-states/invoiceItems-get/reducers';
import {reducer as invoiceItemsPostReducer} from '../nested-states/invoiceItems-post/reducers';
import {reducer as invoiceItemsPutReducer} from '../nested-states/invoiceItems-put/reducers';

export const invoiceItemsReducer = combineReducers({
    invoiceItemsGet: invoiceItemsGetReducer,
    invoiceItemsDelete: invoiceItemsDeleteReducer,
    invoiceItemsPost: invoiceItemsPostReducer,
    invoiceItemsPut: invoiceItemsPutReducer,
});