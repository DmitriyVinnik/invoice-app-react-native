import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {InvoiceItem} from '../../../../../../invoiceItems/states';

export enum ActionTypes {
    INVOICE_ITEMS_PUT = 'INVOICE_ITEMS_PUT',
    INVOICE_ITEMS_PUT_SUCCESS = 'INVOICE_ITEMS_PUT_SUCCESS',
    INVOICE_ITEMS_PUT_FAIL = 'INVOICE_ITEMS_PUT_FAIL',
}

export const Actions = {
    invoiceItemsPut: (data: InvoiceItem[], invoice_id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_PUT, {data, invoice_id})
    },
    invoiceItemsPutSuccess: (data: InvoiceItem[]) => {
        return createAction(ActionTypes.INVOICE_ITEMS_PUT_SUCCESS, {data})
    },
    invoiceItemsPutFail: (errors: string) => {
        return createAction(ActionTypes.INVOICE_ITEMS_PUT_FAIL, {errors})
    },
};

const putAction = {
    put: Actions.invoiceItemsPut,
};

export type Actions = ActionsUnion<typeof Actions>
export type PutAction = ActionsUnion<typeof putAction>
