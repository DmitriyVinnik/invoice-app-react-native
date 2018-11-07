import {reducer, FormState, actionTypes, FormAction} from 'redux-form';
import {customersRequestAC} from '../../request/nested-states/customers/AC';
import {productsRequestAC} from '../../request/nested-states/products/AC';
import {invoiceItemsRequestAC} from '../../request/nested-states/invoiceItems/AC';
import * as customersAC from '../../customers/AC';
import * as productsAC from '../../products/AC';
import * as invoicesAC from '../../invoices/AC';

const formReducer = reducer.plugin({
    customerAdd: (state, action: FormAction): FormState | undefined => {
        const {type} = action;

        switch (type) {
            case customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_SUCCESS:
                return undefined;

            default:
                return state;
        }
    },

    customerChange: (state, action: FormAction): FormState | undefined => {

        switch (action.type) {
            case customersAC.ActionTypes.CUSTOMERS_RESET_SELECTION_ACTIVE:
                return undefined;

            case actionTypes.INITIALIZE: {
                return {
                    ...state,
                    values: {
                        ...state.values,
                        name: action.payload.name,
                        address: action.payload.address,
                        phone: action.payload.phone,
                    }
                }
            }

            default:
                return state;
        }
    },

    productAdd: (state, action: FormAction): FormState | undefined => {
        const {type} = action;

        switch (type) {
            case productsRequestAC.productsPost.ActionTypes.PRODUCTS_POST_SUCCESS:
                return undefined;

            default:
                return state;
        }
    },

    productChange: (state, action: FormAction): FormState | undefined => {

        switch (action.type) {

            case productsAC.ActionTypes.PRODUCTS_RESET_SELECTION_ACTIVE:
                return undefined;

            case actionTypes.INITIALIZE: {
                return {
                    ...state,
                    values: {
                        ...state.values,
                        name: action.payload.name,
                        price: action.payload.price,
                    }
                }
            }

            default:
                return state;
        }
    },

    invoiceAdd: (state, action: FormAction): FormState | undefined => {

        switch (action.type) {

            case invoiceItemsRequestAC.invoiceItemsPost.ActionTypes.INVOICE_ITEMS_POST_SUCCESS:
                return undefined;

            case actionTypes.INITIALIZE: {
                return {
                        ...state,
                        values: {
                            ...state.values,
                            customer_id: action.payload.customer_id,
                        }
                    }
            }

            default:
                return state;
        }
    },

    invoiceChange: (state, action: FormAction): FormState | undefined => {

        switch (action.type) {
            case invoicesAC.ActionTypes.INVOICES_RESET_SELECTION_ACTIVE:
            case customersAC.ActionTypes.CUSTOMERS_SELECT_ACTIVE:
                return undefined;

            case actionTypes.INITIALIZE: {
                return {
                    ...state,
                    values: {
                        ...state.values,
                        discount: action.payload.discount,
                        customer_id: action.payload.customer_id,
                        total: action.payload.total,
                        invoiceItems: action.payload.invoiceItems,
                    }
                };
            }

            default:
                return state;
        }
    },


});

export default formReducer;