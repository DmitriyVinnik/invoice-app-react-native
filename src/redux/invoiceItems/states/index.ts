export interface InvoiceItemDataForServer {
  invoice_id: number;
  product_id: number;
  quantity: number;
}

export interface InvoiceItem extends InvoiceItemDataForServer {
  _id: number;
}

export interface InvoiceItemsState {
  data: InvoiceItem[];
}

export const initialState: InvoiceItemsState = {
  data: [],
};
