import { ActionsUnion } from '../../../../../../../shared/types/ActionsUnion';
import { createAction } from '../../../../../../../shared/helpers/createAction';
import { ProductDataForServer, Product } from '../../../../../../products/states';
import { Error } from '../../../../../../../shared/types/Request';

export enum ActionTypes {
  PRODUCTS_PUT = 'PRODUCTS_PUT',
  PRODUCTS_PUT_SUCCESS = 'PRODUCTS_PUT_SUCCESS',
  PRODUCTS_PUT_FAIL = 'PRODUCTS_PUT_FAIL',
}

export const Actions = {
  productsPut: (data: ProductDataForServer, _id: number) => {
    return createAction(ActionTypes.PRODUCTS_PUT, {data, _id});
  },
  productsPutSuccess: (data: Product) => {
    return createAction(ActionTypes.PRODUCTS_PUT_SUCCESS, {data});
  },
  productsPutFail: (errors: Error) => {
    return createAction(ActionTypes.PRODUCTS_PUT_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
