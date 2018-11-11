import { ActionsUnion } from '../../../../../../../shared/types/ActionsUnion';
import { createAction } from '../../../../../../../shared/helpers/createAction';
import { InvoiceDataForServer, Invoice } from '../../../../../../invoices/states';
import { Error } from '../../../../../../../shared/types/Request';

export enum ActionTypes {
  INVOICES_POST = 'INVOICES_POST',
  INVOICES_POST_SUCCESS = 'INVOICES_POST_SUCCESS',
  INVOICES_POST_FAIL = 'INVOICES_POST_FAIL',
}

export const Actions = {
  invoicesPost: (data: InvoiceDataForServer) => {
    return createAction(ActionTypes.INVOICES_POST, {data});
  },
  invoicesPostSuccess: (data: Invoice) => {
    return createAction(ActionTypes.INVOICES_POST_SUCCESS, {data});
  },
  invoicesPostFail: (errors: Error) => {
    return createAction(ActionTypes.INVOICES_POST_FAIL, {errors});
  },
};

const postSuccess = {postSuccess: Actions.invoicesPostSuccess};

export type Actions = ActionsUnion<typeof Actions>;
export type PostSuccess = ActionsUnion<typeof postSuccess>;