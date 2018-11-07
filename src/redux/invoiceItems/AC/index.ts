import {ActionsUnion} from '../../../shared/types/ActionsUnion';
import {createAction} from '../../../shared/helpers/createAction';
import {InvoiceItem, InvoiceItemDataForServer} from '../states';

export enum ActionTypes {
    INVOICE_ITEMS_LOAD_ALL = 'INVOICE_ITEMS_LOAD_ALL',
    INVOICE_ITEMS_SET_DATA = 'INVOICE_ITEMS_SET_DATA',
    INVOICE_ITEMS_UPDATE_DATA_AFTER_DELETE_REQUEST = 'INVOICE_ITEMS_UPDATE_DATA_AFTER_DELETE_REQUEST',
    INVOICE_ITEMS_SUBMIT_ADD = 'INVOICE_ITEMS_SUBMIT_ADD',
    INVOICE_ITEMS_SUBMIT_PUT = 'INVOICE_ITEMS_SUBMIT_PUT',
    INVOICE_ITEMS_SUBMIT_DELETE = 'INVOICE_ITEMS_SUBMIT_DELETE',
}

export const Actions = {
    setInvoiceItemsData: (data: InvoiceItem[] | InvoiceItem) => {
        return createAction(ActionTypes.INVOICE_ITEMS_SET_DATA, {data})
    },
    updateInvoiceItemsDataAfterDeleteRequest: (data: InvoiceItem[]) => {
        return createAction(ActionTypes.INVOICE_ITEMS_UPDATE_DATA_AFTER_DELETE_REQUEST, {data})
    },
    loadAllInvoiceItems: (invoice_id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_LOAD_ALL, {invoice_id})
    },
    submitAddInvoiceItem: (data: InvoiceItemDataForServer[], invoice_id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_SUBMIT_ADD, {data, invoice_id})
    },
    submitPutInvoiceItem: (data: InvoiceItem[], invoice_id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_SUBMIT_PUT, {data, invoice_id})
    },
    submitDeleteInvoiceItem: (id: number[], invoice_id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_SUBMIT_DELETE, {id, invoice_id})
    },
};

export const onlyLoadAction = {
    load: Actions.loadAllInvoiceItems,
};

export type Actions = ActionsUnion<typeof Actions>
export type LoadAction = ActionsUnion<typeof onlyLoadAction>
