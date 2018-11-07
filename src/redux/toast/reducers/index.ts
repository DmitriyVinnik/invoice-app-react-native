import * as fromActions from '../AC';
import {initialState, ToastState} from '../states';

export function reducer(state = initialState, action: fromActions.Actions): ToastState {

    switch (action.type) {
        case fromActions.ActionTypes.TOAST_SHOW: {
            const {message, error} = action.payload;

            return {
                isOpen: true,
                message,
                error,
            };
        }

        case fromActions.ActionTypes.TOAST_HIDE: {
            return {
                isOpen: false,
                message: null,
                error: null,
            };
        }

        default:
            return state;
    }
}