import {ActionsUnion} from '../../../shared/types/ActionsUnion';
import {createAction} from '../../../shared/helpers/createAction';
import {Invoice, InvoiceDataForServer} from '../states';

export enum ActionTypes {
    INVOICES_LOAD_ALL = 'INVOICES_LOAD_ALL',
    INVOICES_SET_DATA = 'INVOICES_SET_DATA',
    INVOICES_UPDATE_DATA_AFTER_DELETE_REQUEST = 'INVOICES_UPDATE_DATA_AFTER_DELETE_REQUEST',
    INVOICES_SUBMIT_ADD_FORM = 'INVOICES_SUBMIT_ADD_FORM',
    INVOICES_SUBMIT_CHANGE_FORM = 'INVOICES_SUBMIT_CHANGE_FORM',
    INVOICES_SUBMIT_DELETE_FORM = 'INVOICES_SUBMIT_DELETE_FORM',
    INVOICES_SELECT_ACTIVE = 'INVOICES_SELECT_ACTIVE',
    INVOICES_RESET_SELECTION_ACTIVE = 'INVOICES_RESET_SELECTION_ACTIVE',
}

export const Actions = {
    setInvoicesData: (data: Invoice[] | Invoice) => {
        return createAction(ActionTypes.INVOICES_SET_DATA, {data})
    },
    updateInvoicesDataAfterDeleteRequest: (data: Invoice) => {
        return createAction(ActionTypes.INVOICES_UPDATE_DATA_AFTER_DELETE_REQUEST, {data})
    },
    loadAllInvoices: () => {
        return createAction(ActionTypes.INVOICES_LOAD_ALL)
    },
    selectInvoice: (data: Invoice[], id: number) => {
        return createAction(ActionTypes.INVOICES_SELECT_ACTIVE, {data, id})
    },
    resetSelectionInvoice: () => {
        return createAction(ActionTypes.INVOICES_RESET_SELECTION_ACTIVE)
    },
    submitInvoiceAddForm: (data: InvoiceDataForServer, total: number) => {
        return createAction(ActionTypes.INVOICES_SUBMIT_ADD_FORM, {data, total})
    },
    submitInvoiceChangeForm: (data: InvoiceDataForServer, total: number, id: number) => {
        return createAction(ActionTypes.INVOICES_SUBMIT_CHANGE_FORM, {data, total, id})
    },
    submitInvoiceDeleteForm: (id: number) => {
        return createAction(ActionTypes.INVOICES_SUBMIT_DELETE_FORM, {id})
    },
};

export type Actions = ActionsUnion<typeof Actions>
