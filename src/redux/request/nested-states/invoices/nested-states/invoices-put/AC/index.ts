import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {InvoiceDataForServer, Invoice} from '../../../../../../invoices/states';

export enum ActionTypes {
    INVOICES_PUT = 'INVOICES_PUT',
    INVOICES_PUT_SUCCESS = 'INVOICES_PUT_SUCCESS',
    INVOICES_PUT_FAIL = 'INVOICES_PUT_FAIL',
}

export const Actions = {
    invoicesPut: (data: InvoiceDataForServer, id: number) => {
        return createAction(ActionTypes.INVOICES_PUT, {data, id})
    },
    invoicesPutSuccess: (data: Invoice) => {
        return createAction(ActionTypes.INVOICES_PUT_SUCCESS, {data})
    },
    invoicesPutFail: (errors: string) => {
        return createAction(ActionTypes.INVOICES_PUT_FAIL, {errors})
    },
};

const putSuccess = {putSuccess: Actions.invoicesPutSuccess};

export type Actions = ActionsUnion<typeof Actions>
export type PutSuccess = ActionsUnion<typeof putSuccess>