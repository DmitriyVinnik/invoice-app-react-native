import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {InvoiceItem} from '../../../../../../invoiceItems/states';

export enum ActionTypes {
    INVOICE_ITEMS_GET = 'INVOICE_ITEMS_GET',
    INVOICE_ITEMS_GET_SUCCESS = 'INVOICE_ITEMS_GET_SUCCESS',
    INVOICE_ITEMS_GET_FAIL = 'INVOICE_ITEMS_GET_FAIL',
}

export const Actions = {
    invoiceItemsGet: (invoice_id: number) => createAction(ActionTypes.INVOICE_ITEMS_GET, {invoice_id}),
    invoiceItemsGetSuccess: (data: InvoiceItem[]) => {
        return createAction(ActionTypes.INVOICE_ITEMS_GET_SUCCESS, {data})
    },
    invoiceItemsGetFail: (errors: string) => {
        return createAction(ActionTypes.INVOICE_ITEMS_GET_FAIL, {errors})
    },
};

const getAction = {
    get: Actions.invoiceItemsGet,
};

export type Actions = ActionsUnion<typeof Actions>
export type GetAction = ActionsUnion<typeof getAction>

