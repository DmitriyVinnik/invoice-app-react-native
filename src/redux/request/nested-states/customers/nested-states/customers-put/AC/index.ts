import { ActionsUnion } from '../../../../../../../shared/types/ActionsUnion';
import { createAction } from '../../../../../../../shared/helpers/createAction';
import { CustomerDataForServer, Customer } from '../../../../../../customers/states';
import { Error } from '../../../../../../../shared/types/Request';

export enum ActionTypes {
  CUSTOMERS_PUT = 'CUSTOMERS_PUT',
  CUSTOMERS_PUT_SUCCESS = 'CUSTOMERS_PUT_SUCCESS',
  CUSTOMERS_PUT_FAIL = 'CUSTOMERS_PUT_FAIL',
}

export const Actions = {
  customersPut: (data: CustomerDataForServer, _id: number) => {
    return createAction(ActionTypes.CUSTOMERS_PUT, {data, _id});
  },
  customersPutSuccess: (data: Customer) => {
    return createAction(ActionTypes.CUSTOMERS_PUT_SUCCESS, {data});
  },
  customersPutFail: (errors: Error) => {
    return createAction(ActionTypes.CUSTOMERS_PUT_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
