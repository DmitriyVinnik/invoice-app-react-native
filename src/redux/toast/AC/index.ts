import {ActionsUnion} from '../../../shared/types/ActionsUnion';
import {createAction} from '../../../shared/helpers/createAction';

export enum ActionTypes {
    TOAST_SHOW = 'TOAST_SHOW',
    TOAST_HIDE = 'TOAST_HIDE',
}

export const Actions = {
    showToast: (message: string | null = null, error: string | null = null) => {
        return createAction(ActionTypes.TOAST_SHOW, {message, error})
    },
    hideToast: () => createAction(ActionTypes.TOAST_HIDE),
};

export type Actions = ActionsUnion<typeof Actions>
