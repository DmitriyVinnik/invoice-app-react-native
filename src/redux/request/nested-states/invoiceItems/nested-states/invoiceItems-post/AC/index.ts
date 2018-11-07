import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {InvoiceItemDataForServer, InvoiceItem} from '../../../../../../invoiceItems/states';

export enum ActionTypes {
    INVOICE_ITEMS_POST = 'INVOICE_ITEMS_POST',
    INVOICE_ITEMS_POST_SUCCESS = 'INVOICE_ITEMS_POST_SUCCESS',
    INVOICE_ITEMS_POST_FAIL = 'INVOICE_ITEMS_POST_FAIL',
}

export const Actions = {
    invoiceItemsPost: (data: InvoiceItemDataForServer[], invoice_id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_POST, {data, invoice_id})
    },
    invoiceItemsPostSuccess: (data: InvoiceItem[]) => {
        return createAction(ActionTypes.INVOICE_ITEMS_POST_SUCCESS, {data})
    },
    invoiceItemsPostFail: (errors: string) => {
        return createAction(ActionTypes.INVOICE_ITEMS_POST_FAIL, {errors})
    },
};

const postAction = {post: Actions.invoiceItemsPost};


export type Actions = ActionsUnion<typeof Actions>
export type PostAction = ActionsUnion<typeof postAction>

