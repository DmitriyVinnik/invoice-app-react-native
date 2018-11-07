import {unionBy} from 'lodash-es';
import * as fromActions from '../AC';
import {initialState, InvoiceItemsState} from '../states';

export function reducer(state = initialState, action: fromActions.Actions): InvoiceItemsState {

    switch (action.type) {
        case fromActions.ActionTypes.INVOICE_ITEMS_SET_DATA: {
            const newData = Array.isArray(action.payload.data) ? action.payload.data : [action.payload.data];

            return {
                ...state,
                data: unionBy(newData, state.data, 'id')
            };
        }

        case fromActions.ActionTypes.INVOICE_ITEMS_UPDATE_DATA_AFTER_DELETE_REQUEST: {
            return {
                ...state,
                data: state.data.filter(
                    (stateElem) => {
                        const isNeedDelete = !!action.payload.data.find((actionElem) => actionElem.id === stateElem.id);
                        return !isNeedDelete
                    }
                )
            };
        }

        default:
            return state;
    }
}