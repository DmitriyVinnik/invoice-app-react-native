import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {InvoiceItem} from '../../../../../../invoiceItems/states';

export enum ActionTypes {
    INVOICE_ITEMS_DELETE = 'INVOICE_ITEMS_DELETE',
    INVOICE_ITEMS_DELETE_SUCCESS = 'INVOICE_ITEMS_DELETE_SUCCESS',
    INVOICE_ITEMS_DELETE_FAIL = 'INVOICE_ITEMS_DELETE_FAIL',
}

export const Actions = {
    invoiceItemsDelete: (_id: number[], invoice_id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_DELETE, {_id, invoice_id})
    },
    invoiceItemsDeleteSuccess: (data: InvoiceItem[]) => {
        return createAction(ActionTypes.INVOICE_ITEMS_DELETE_SUCCESS, {data})
    },
    invoiceItemsDeleteFail: (errors: string ) => {
        return createAction(ActionTypes.INVOICE_ITEMS_DELETE_FAIL, {errors})
    },
};

const deleteAction = {
    delete: Actions.invoiceItemsDelete,
};

export type Actions = ActionsUnion<typeof Actions>

export type DeleteAction = ActionsUnion<typeof deleteAction>
