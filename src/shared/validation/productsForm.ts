import { ProductsFormData } from '../../redux/form/states';
import { FormErrors } from 'redux-form';

export const validate = (values: ProductsFormData) => {
  const error: FormErrors<ProductsFormData> = {};

  if (!values.name) {
    error.name = 'Required';
  }

  if (!values.price) {
    error.price = 'Required';
  } else if (((+values.price * 100) % 100) % 1 !== 0) {
    error.price = 'Price must be in decimal format';
  }

  return error;
};
