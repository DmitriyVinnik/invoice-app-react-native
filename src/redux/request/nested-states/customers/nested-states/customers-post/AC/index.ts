import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {CustomerDataForServer, Customer} from '../../../../../../customers/states';

export enum ActionTypes {
    CUSTOMERS_POST = 'CUSTOMERS_POST',
    CUSTOMERS_POST_SUCCESS = 'CUSTOMERS_POST_SUCCESS',
    CUSTOMERS_POST_FAIL = 'CUSTOMERS_POST_FAIL',
}

export const Actions = {
    customersPost: (data: CustomerDataForServer) => {
        return createAction(ActionTypes.CUSTOMERS_POST, {data})
    },
    customersPostSuccess: (data: Customer) => {
        return createAction(ActionTypes.CUSTOMERS_POST_SUCCESS, {data})
    },
    customersPostFail: (errors: string) => {
        return createAction(ActionTypes.CUSTOMERS_POST_FAIL, {errors})
    },
};

export type Actions = ActionsUnion<typeof Actions>
