import {ActionsUnion} from '../../../shared/types/ActionsUnion';
import {createAction} from '../../../shared/helpers/createAction';
import {Customer, CustomerDataForServer} from '../states'

export enum ActionTypes {
    CUSTOMERS_LOAD_ALL = 'CUSTOMERS_LOAD_ALL',
    CUSTOMERS_SET_DATA = 'CUSTOMERS_SET_DATA',
    CUSTOMERS_UPDATE_DATA_AFTER_DELETE_REQUEST = 'CUSTOMERS_UPDATE_DATA_AFTER_DELETE_REQUEST',
    CUSTOMERS_SUBMIT_ADD_FORM = 'CUSTOMERS_SUBMIT_ADD_FORM',
    CUSTOMERS_SUBMIT_CHANGE_FORM = 'CUSTOMERS_SUBMIT_CHANGE_FORM',
    CUSTOMERS_SUBMIT_DELETE_FORM = 'CUSTOMERS_SUBMIT_DELETE_FORM',
    CUSTOMERS_SELECT_ACTIVE = 'CUSTOMERS_SELECT_ACTIVE',
    CUSTOMERS_RESET_SELECTION_ACTIVE = 'CUSTOMERS_RESET_SELECTION_ACTIVE',
}

export const Actions = {
    setCustomersData: (data: Customer[] | Customer) => {
        return createAction(ActionTypes.CUSTOMERS_SET_DATA, {data})
    },
    updateCustomersDataAfterDeleteRequest: (data: Customer) => {
        return createAction(ActionTypes.CUSTOMERS_UPDATE_DATA_AFTER_DELETE_REQUEST, {data})
    },
    loadAllCustomers: () => {
        return createAction(ActionTypes.CUSTOMERS_LOAD_ALL)
    },
    selectCustomer: (data: Customer[], id: number) => {
        return createAction(ActionTypes.CUSTOMERS_SELECT_ACTIVE, {data, id})
    },
    resetSelectionCustomer: () => {
        return createAction(ActionTypes.CUSTOMERS_RESET_SELECTION_ACTIVE)
    },
    submitCustomerAddForm: (data: CustomerDataForServer) => {
        return createAction(ActionTypes.CUSTOMERS_SUBMIT_ADD_FORM, {data})
    },
    submitCustomerChangeForm: (data: CustomerDataForServer, id: number) => {
        return createAction(ActionTypes.CUSTOMERS_SUBMIT_CHANGE_FORM, {data, id})
    },
    submitCustomerDeleteForm: (id: number) => {
        return createAction(ActionTypes.CUSTOMERS_SUBMIT_DELETE_FORM, {id})
    },
};

export type Actions = ActionsUnion<typeof Actions>
