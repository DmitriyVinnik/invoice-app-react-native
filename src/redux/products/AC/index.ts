import {ActionsUnion} from '../../../shared/types/ActionsUnion';
import {createAction} from '../../../shared/helpers/createAction';
import {Product, ProductDataForServer} from '../states'

export enum ActionTypes {
    PRODUCTS_LOAD_ALL = 'PRODUCTS_LOAD_ALL',
    PRODUCTS_SET_DATA = 'PRODUCTS_SET_DATA',
    PRODUCTS_UPDATE_DATA_AFTER_DELETE_REQUEST = 'PRODUCTS_UPDATE_DATA_AFTER_DELETE_REQUEST',
    PRODUCTS_SUBMIT_ADD_FORM = 'PRODUCTS_SUBMIT_ADD_FORM',
    PRODUCTS_SUBMIT_CHANGE_FORM = 'PRODUCTS_SUBMIT_CHANGE_FORM',
    PRODUCTS_SUBMIT_DELETE_FORM = 'PRODUCTS_SUBMIT_DELETE_FORM',
    PRODUCTS_SELECT_ACTIVE = 'PRODUCTS_SELECT_ACTIVE',
    PRODUCTS_RESET_SELECTION_ACTIVE = 'PRODUCTS_RESET_SELECTION_ACTIVE',
}

export const Actions = {
    setProductsData: (data: Product[] | Product) => {
        return createAction(ActionTypes.PRODUCTS_SET_DATA, {data})
    },
    updateProductsDataAfterDeleteRequest: (data: Product) => {
        return createAction(ActionTypes.PRODUCTS_UPDATE_DATA_AFTER_DELETE_REQUEST, {data})
    },
    loadAllProducts: () => {
        return createAction(ActionTypes.PRODUCTS_LOAD_ALL)
    },
    selectProduct: (data: Product[], id: number) => {
        return createAction(ActionTypes.PRODUCTS_SELECT_ACTIVE, {data, id})
    },
    resetSelectionProduct: () => {
        return createAction(ActionTypes.PRODUCTS_RESET_SELECTION_ACTIVE)
    },
    submitProductAddForm: (data: ProductDataForServer) => {
        return createAction(ActionTypes.PRODUCTS_SUBMIT_ADD_FORM, {data})
    },
    submitProductChangeForm: (data: ProductDataForServer, id: number) => {
        return createAction(ActionTypes.PRODUCTS_SUBMIT_CHANGE_FORM, {data, id})
    },
    submitProductDeleteForm: (id: number) => {
        return createAction(ActionTypes.PRODUCTS_SUBMIT_DELETE_FORM, {id})
    },
};

export type Actions = ActionsUnion<typeof Actions>
