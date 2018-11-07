import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {ProductDataForServer, Product} from '../../../../../../products/states';

export enum ActionTypes {
    PRODUCTS_PUT = 'PRODUCTS_PUT',
    PRODUCTS_PUT_SUCCESS = 'PRODUCTS_PUT_SUCCESS',
    PRODUCTS_PUT_FAIL = 'PRODUCTS_PUT_FAIL',
}

export const Actions = {
    productsPut: (data: ProductDataForServer, id: number) => {
        return createAction(ActionTypes.PRODUCTS_PUT, {data, id})
    },
    productsPutSuccess: (data: Product) => {
        return createAction(ActionTypes.PRODUCTS_PUT_SUCCESS, {data})
    },
    productsPutFail: (errors: string) => {
        return createAction(ActionTypes.PRODUCTS_PUT_FAIL, {errors})
    },
};

export type Actions = ActionsUnion<typeof Actions>
