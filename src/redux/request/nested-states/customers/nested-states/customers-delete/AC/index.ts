import { ActionsUnion } from '../../../../../../../shared/types/ActionsUnion';
import { createAction } from '../../../../../../../shared/helpers/createAction';
import { Customer } from '../../../../../../customers/states';
import { Error } from '../../../../../../../shared/types/Request';

export enum ActionTypes {
  CUSTOMERS_DELETE = 'CUSTOMERS_DELETE',
  CUSTOMERS_DELETE_SUCCESS = 'CUSTOMERS_DELETE_SUCCESS',
  CUSTOMERS_DELETE_FAIL = 'CUSTOMERS_DELETE_FAIL',
}

export const Actions = {
  customersDelete: (_id: number) => {
    return createAction(ActionTypes.CUSTOMERS_DELETE, {_id});
  },
  customersDeleteSuccess: (data: Customer) => {
    return createAction(ActionTypes.CUSTOMERS_DELETE_SUCCESS, {data});
  },
  customersDeleteFail: (errors: Error) => {
    return createAction(ActionTypes.CUSTOMERS_DELETE_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
