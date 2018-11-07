export interface ToastState {
    isOpen: boolean,
    message: string | null,
    error: string | null,
}

export const initialState: ToastState = {
    isOpen: false,
    message: null,
    error: null,
};