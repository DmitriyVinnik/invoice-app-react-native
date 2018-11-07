import {invoiceItemsDeleteEpic} from '../nested-states/invoiceItems-delete/epics';
import {invoiceItemsGetEpic} from '../nested-states/invoiceItems-get/epics';
import {invoiceItemsPostEpic} from '../nested-states/invoiceItems-post/epics';
import {invoiceItemsPutEpic} from '../nested-states/invoiceItems-put/epics';

export const invoiceItemsEpic = [
    invoiceItemsDeleteEpic,
    invoiceItemsGetEpic,
    invoiceItemsPostEpic,
    invoiceItemsPutEpic,
];