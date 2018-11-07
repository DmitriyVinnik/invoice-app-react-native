import {customersEpic} from '../nested-states/customers/epics';
import {productsEpic} from '../nested-states/products/epics';
import {invoicesEpic} from '../nested-states/invoices/epics';
import {invoiceItemsEpic} from '../nested-states/invoiceItems/epics';

export const requestEpics = [
    ...customersEpic,
    ...productsEpic,
    ...invoicesEpic,
    ...invoiceItemsEpic,
];