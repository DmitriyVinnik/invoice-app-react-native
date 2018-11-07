import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {Product} from '../../../../../../products/states';

export enum ActionTypes {
    PRODUCTS_DELETE = 'PRODUCTS_DELETE',
    PRODUCTS_DELETE_SUCCESS = 'PRODUCTS_DELETE_SUCCESS',
    PRODUCTS_DELETE_FAIL = 'PRODUCTS_DELETE_FAIL',
}

export const Actions = {
    productsDelete: (id: number) => {
        return createAction(ActionTypes.PRODUCTS_DELETE, {id})
    },
    productsDeleteSuccess: (data: Product) => {
        return createAction(ActionTypes.PRODUCTS_DELETE_SUCCESS, {data})
    },
    productsDeleteFail: (errors: string ) => {
        return createAction(ActionTypes.PRODUCTS_DELETE_FAIL, {errors})
    },
};

export type Actions = ActionsUnion<typeof Actions>
