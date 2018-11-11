import { ActionsUnion } from '../../../../../../../shared/types/ActionsUnion';
import { createAction } from '../../../../../../../shared/helpers/createAction';
import { Invoice } from '../../../../../../invoices/states';
import { Error } from '../../../../../../../shared/types/Request';

export enum ActionTypes {
  INVOICES_GET = 'INVOICES_GET',
  INVOICES_GET_SUCCESS = 'INVOICES_GET_SUCCESS',
  INVOICES_GET_FAIL = 'INVOICES_GET_FAIL',
}

export const Actions = {
  invoicesGet: () => createAction(ActionTypes.INVOICES_GET),
  invoicesGetSuccess: (data: Invoice[]) => {
    return createAction(ActionTypes.INVOICES_GET_SUCCESS, {data});
  },
  invoicesGetFail: (errors: Error) => {
    return createAction(ActionTypes.INVOICES_GET_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
