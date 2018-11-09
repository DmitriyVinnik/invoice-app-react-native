import React from 'react';

import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { reduxForm, Field, InjectedFormProps, FormErrors } from 'redux-form';
import FormField from '../../../../../shared/components/FormField';
import ErrorRequestView from '../../../../../shared/components/ErrorRequestView';

import { CustomerDataForServer } from '../../../../../redux/customers/states';
import { Error } from '../../../../../shared/types/Request';

type FormData = CustomerDataForServer;

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  errors: Error | null;
  handleClose(): void;
  submitForm(values: FormData): void;
}

type Props = OwnProps & InjectedFormProps<FormData, OwnProps>;

const CustomerAddScreen: React.SFC<Props> = (props: Props) => {
  const {isVisible, handleSubmit, isLoading, errors, handleClose, pristine, submitForm} = props;

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View>
        <Text>Addition new customer.</Text>
      </View>
      <View>
        <View>
          {errors && <ErrorRequestView errors={errors}/>}
          <Field
            name='name'
            component={FormField}
            labelText='Customer`s name: '
          />
          <Field
            name='address'
            component={FormField}
            labelText='Customer`s address: '
          />
          <Field
            name='phone'
            component={FormField}
            keyboard='number'
            placeholder='+380999999999'
            labelText='Customer`s phone: '
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

  if (!values.address) {
    error.address = 'Required';
  }

  if (!values.phone) {
    error.phone = 'Required';
  }

  return error;
};

export default reduxForm<FormData, OwnProps>({
  form: 'customerAdd',
  validate,
})(CustomerAddScreen);
