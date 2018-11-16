import { InvoiceItemsFormData, InvoicesFormData } from '../../redux/form/states';
import { FormErrors } from 'redux-form';

export const validate = (values: InvoicesFormData) => {
  const errors: FormErrors<InvoicesFormData, any> = {};

  if (+values.discount > 100 || +values.discount < 0) {
    errors.discount = 'Must be in range from 0 to 99';
  }

  if (!values.invoiceItems || !values.invoiceItems.length) {
    errors.invoiceItems = {_error: 'At least one invoice item must be entered'};
  } else {
    const invoiceItemsArrayErrors: Array<FormErrors<InvoiceItemsFormData>> = [];

    values.invoiceItems.forEach((invoiceItem, invoiceItemIndex) => {
      const invoiceItemErrors: FormErrors<InvoiceItemsFormData> = {};

      if (!invoiceItem || !invoiceItem.quantity) {
        invoiceItemErrors.quantity = 'Required';
        invoiceItemsArrayErrors[invoiceItemIndex] = invoiceItemErrors;
      } else if (+invoiceItem.quantity % 1 !== 0) {
        invoiceItemErrors.quantity = 'Value must be an integer';
        invoiceItemsArrayErrors[invoiceItemIndex] = invoiceItemErrors;
      }

      if (!invoiceItem || !invoiceItem.product_id) {
        invoiceItemErrors.product_id = 'Required';
        invoiceItemsArrayErrors[invoiceItemIndex] = invoiceItemErrors;
      }
    });

    if (invoiceItemsArrayErrors.length) {
      errors.invoiceItems = invoiceItemsArrayErrors;
    }
  }
  return errors;
};
