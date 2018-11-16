import { FormErrors } from 'redux-form';
import { FormData } from '../../components/App/AppNavigator/CustomersNavigator/CustomerAddScreen';

export const validate = (values: FormData) => {
  const error: FormErrors<FormData> = {};

  if (!values.name) {
    error.name = 'Required';
  }

  if (!values.address) {
    error.address = 'Required';
  }

  if (!values.phone) {
    error.phone = 'Required';
  }

  return error;
};
