import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {Product} from '../../../../../../products/states';

export enum ActionTypes {
    PRODUCTS_GET = 'PRODUCTS_GET',
    PRODUCTS_GET_SUCCESS = 'PRODUCTS_GET_SUCCESS',
    PRODUCTS_GET_FAIL = 'PRODUCTS_GET_FAIL',
}

export const Actions = {
    productsGet: () => createAction(ActionTypes.PRODUCTS_GET),
    productsGetSuccess: (data: Product[]) => {
        return createAction(ActionTypes.PRODUCTS_GET_SUCCESS, {data})
    },
    productsGetFail: (errors: string) => {
        return createAction(ActionTypes.PRODUCTS_GET_FAIL, {errors})
    },
};

export type Actions = ActionsUnion<typeof Actions>
