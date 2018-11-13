export interface ToastState {
  message: string | null;
  error: string | null;
}

export const initialState: ToastState = {
  message: null,
  error: null,
};