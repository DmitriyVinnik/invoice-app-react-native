import React from 'react';
import { reduxForm, Field, InjectedFormProps, FormErrors } from 'redux-form';

import { View, Text, TouchableOpacity, Modal } from 'react-native';
import FormField from '../../../../../shared/components/FormField';
import ErrorRequestView from '../../../../../shared/components/ErrorRequestView';

import { ProductDataForServer } from '../../../../../redux/products/states';
import { Error } from '../../../../../shared/types/Request';

type FormData = ProductDataForServer;

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  errors: Error | null;
  handleClose(): void;
  submitForm(values: FormData): void;
}

type Props = OwnProps & InjectedFormProps<FormData, OwnProps>;

const ProductAddForm: React.SFC<Props> = (props: Props) => {
  const {isVisible, handleSubmit, isLoading, errors, handleClose, pristine, submitForm} = props;

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View>
        <Text>Addition new product.</Text>
      </View>
      <View>
        <View>
          {errors && <ErrorRequestView errors={errors}/>}
          <Field
            name='name'
            component={FormField}
            labelText='Product`s name: '
          />
          <Field
            name='price'
            component={FormField}
            keyboard='number'
            labelText='Product`s price: '
            placeholder='decimal'
          />
          <View>
            <TouchableOpacity
              onPress={handleClose}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={pristine || isLoading}
              onPress={handleSubmit(submitForm)}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const validate = (values: FormData) => {
  const error: FormErrors<FormData> = {};

  if (!values.name) {
    error.name = 'Required';
  }

  if (!values.price) {
    error.price = 'Required';
  } else if (((values.price * 100) % 100) % 1 !== 0) {
    error.price = 'Price must be in decimal format';
  }

  return error;
};

export default reduxForm<FormData, OwnProps>({
  form: 'productAdd',
  validate,
})(ProductAddForm);
