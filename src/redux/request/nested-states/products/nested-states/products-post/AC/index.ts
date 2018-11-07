import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {ProductDataForServer, Product} from '../../../../../../products/states';

export enum ActionTypes {
    PRODUCTS_POST = 'PRODUCTS_POST',
    PRODUCTS_POST_SUCCESS = 'PRODUCTS_POST_SUCCESS',
    PRODUCTS_POST_FAIL = 'PRODUCTS_POST_FAIL',
}

export const Actions = {
    productsPost: (data: ProductDataForServer) => {
        return createAction(ActionTypes.PRODUCTS_POST, {data})
    },
    productsPostSuccess: (data: Product) => {
        return createAction(ActionTypes.PRODUCTS_POST_SUCCESS, {data})
    },
    productsPostFail: (errors: string) => {
        return createAction(ActionTypes.PRODUCTS_POST_FAIL, {errors})
    },
};

export type Actions = ActionsUnion<typeof Actions>
