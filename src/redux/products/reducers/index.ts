import {unionBy} from 'lodash-es';
import * as fromActions from '../AC';
import {initialState, ProductsState} from '../states';

export function reducer(state = initialState, action: fromActions.Actions): ProductsState {

    switch (action.type) {
        case fromActions.ActionTypes.PRODUCTS_SET_DATA: {
            const newData = Array.isArray(action.payload.data) ? action.payload.data : [action.payload.data];

            return {
                ...state,
                data: unionBy(newData, state.data, 'id')
            };
        }

        case fromActions.ActionTypes.PRODUCTS_UPDATE_DATA_AFTER_DELETE_REQUEST: {
            return {
                ...state,
                data: state.data.filter(
                    (elem) => elem.id !== action.payload.data.id
                ),
                activeProductId: null,
            };
        }

        case fromActions.ActionTypes.PRODUCTS_SELECT_ACTIVE: {
            return {
                ...state,
                activeProductId: action.payload.id,
            };
        }

        case fromActions.ActionTypes.PRODUCTS_RESET_SELECTION_ACTIVE: {
            return {
                ...state,
                activeProductId: null,
            };
        }

        default:
            return state;
    }
}