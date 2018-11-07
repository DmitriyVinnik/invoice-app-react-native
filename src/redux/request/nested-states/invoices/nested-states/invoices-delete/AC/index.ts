import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {Invoice} from '../../../../../../invoices/states';

export enum ActionTypes {
    INVOICES_DELETE = 'INVOICES_DELETE',
    INVOICES_DELETE_SUCCESS = 'INVOICES_DELETE_SUCCESS',
    INVOICES_DELETE_FAIL = 'INVOICES_DELETE_FAIL',
}

export const Actions = {
    invoicesDelete: (id: number) => {
        return createAction(ActionTypes.INVOICES_DELETE, {id})
    },
    invoicesDeleteSuccess: (data: Invoice) => {
        return createAction(ActionTypes.INVOICES_DELETE_SUCCESS, {data})
    },
    invoicesDeleteFail: (errors: string ) => {
        return createAction(ActionTypes.INVOICES_DELETE_FAIL, {errors})
    },
};

const deleteSuccess = {deleteSuccess: Actions.invoicesDeleteSuccess};

export type Actions = ActionsUnion<typeof Actions>
export type DeleteSuccess = ActionsUnion<typeof deleteSuccess>
