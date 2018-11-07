import {invoicesDeleteEpic} from '../nested-states/invoices-delete/epics';
import {invoicesGetEpic} from '../nested-states/invoices-get/epics';
import {invoicesPostEpic} from '../nested-states/invoices-post/epics';
import {invoicesPutEpic} from '../nested-states/invoices-put/epics';

export const invoicesEpic = [
    invoicesDeleteEpic,
    invoicesGetEpic,
    invoicesPostEpic,
    invoicesPutEpic,
];