import {FormState} from 'redux-form';

export interface FormsState {
    customerAdd: FormState,
    customerChange: FormState,
    productAdd: FormState,
    productChange: FormState,
    invoiceAdd: FormState,
    invoiceChange: FormState,
    invoiceItemAdd: FormState,
    invoiceItemChange: FormState,
}