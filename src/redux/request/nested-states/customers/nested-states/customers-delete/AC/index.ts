import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {Customer} from '../../../../../../customers/states';

export enum ActionTypes {
    CUSTOMERS_DELETE = 'CUSTOMERS_DELETE',
    CUSTOMERS_DELETE_SUCCESS = 'CUSTOMERS_DELETE_SUCCESS',
    CUSTOMERS_DELETE_FAIL = 'CUSTOMERS_DELETE_FAIL',
}

export const Actions = {
    customersDelete: (id: number) => {
        return createAction(ActionTypes.CUSTOMERS_DELETE, {id})
    },
    customersDeleteSuccess: (data: Customer) => {
        return createAction(ActionTypes.CUSTOMERS_DELETE_SUCCESS, {data})
    },
    customersDeleteFail: (errors: string ) => {
        return createAction(ActionTypes.CUSTOMERS_DELETE_FAIL, {errors})
    },
};

export type Actions = ActionsUnion<typeof Actions>
