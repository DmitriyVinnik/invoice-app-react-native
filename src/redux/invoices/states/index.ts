export interface InvoiceDataForServer {
    discount: number,
    total: number,
    customer_id: number,
}

export interface Invoice extends InvoiceDataForServer{
    id: number,
}

export interface InvoicesState {
    data: Invoice[];
    activeInvoiceId: number | null,
}

export const initialState: InvoicesState = {
    data: [],
    activeInvoiceId: null,
};
