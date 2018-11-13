import { FormState } from 'redux-form';

export interface FormsState {
  customerAdd: FormState;
  customerChange: FormState;
  productAdd: FormState;
  productChange: FormState;
  invoiceAdd: FormState;
  invoiceChange: FormState;
  invoiceItemAdd: FormState;
  invoiceItemChange: FormState;
}

export interface ProductsFormData {
  name: string;
  price: string;
}

export interface InvoiceItemsFormData {
  invoice_id: number;
  product_id: number;
  quantity: string;
  _id: number;
}

export interface InvoicesFormData {
  discount: string;
  total: number;
  customer_id: number;
  invoiceItems: InvoiceItemsFormData[];
}
