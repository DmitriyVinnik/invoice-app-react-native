import * as fromActions from '../AC';
import { initialState, ToastState } from '../states';

export function reducer(state = initialState, action: fromActions.Actions): ToastState {

  switch (action.type) {
    case fromActions.ActionTypes.TOAST_SHOW: {
      const {message, error} = action.payload;

      return {
        message,
        error,
      };
    }

    case fromActions.ActionTypes.TOAST_RESET: {
      return {
        message: null,
        error: null,
      };
    }

    default:
      return state;
  }
}