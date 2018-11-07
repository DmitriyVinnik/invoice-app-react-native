import {unionBy} from 'lodash-es';
import * as fromActions from '../AC';
import {initialState, CustomersState} from '../states';

export function reducer(state = initialState, action: fromActions.Actions): CustomersState {

    switch (action.type) {
        case fromActions.ActionTypes.CUSTOMERS_SET_DATA: {
            const newData = Array.isArray(action.payload.data) ? action.payload.data : [action.payload.data];

            return {
                ...state,
                data: unionBy(newData, state.data, 'id')
            };
        }

        case fromActions.ActionTypes.CUSTOMERS_UPDATE_DATA_AFTER_DELETE_REQUEST: {
            return {
                ...state,
                data: state.data.filter(
                    (elem) => elem.id !== action.payload.data.id
                ),
                activeCustomerId: null,
            };
        }

        case fromActions.ActionTypes.CUSTOMERS_SELECT_ACTIVE: {
            return {
                ...state,
                activeCustomerId: action.payload.id,
            };
        }

        case fromActions.ActionTypes.CUSTOMERS_RESET_SELECTION_ACTIVE: {
            return {
                ...state,
                activeCustomerId: null,
            };
        }

        default:
            return state;
    }
}