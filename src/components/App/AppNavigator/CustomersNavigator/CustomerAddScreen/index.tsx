import React from 'react';

import { View, Text, Modal } from 'react-native';
import { reduxForm, Field, InjectedFormProps, FormErrors } from 'redux-form';
import FormField from '../../../../../shared/components/FormField/index';
import ErrorRequestView from '../../../../../shared/components/ErrorRequestView';
import RegularText from '../../../../../shared/components/RegularText';
import RegularButton from '../../../../../shared/components/RegularButton';
import style from './style';

import { CustomerDataForServer } from '../../../../../redux/customers/states';
import { Error } from '../../../../../shared/types/Request';
import { ToastState } from '../../../../../redux/toast/states';

type FormData = CustomerDataForServer;

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  errors: Error | null;
  toast: ToastState;
  handleClose(): void;
  submitForm(values: FormData): void;
}

type Props = OwnProps & InjectedFormProps<FormData, OwnProps>;

const CustomerAddScreen: React.SFC<Props> = (props: Props) => {
  const {isVisible, handleSubmit, isLoading, toast, handleClose, pristine, submitForm} = props;

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={style.container}>
        <View style={style.headerWraper}>
          <RegularText>
            <Text style={style.textTitle}>Addition new customer.</Text>
          </RegularText>
        </View>
        <View style={style.fieldWraper}>
          {
            (toast.error || toast.message) &&
            <ErrorRequestView
                errors={toast.error}
                messageSuccess={toast.message}
            />
          }
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
            keyboard='numeric'
            placeholder='+380999999999'
            labelText='Customer`s phone: '
          />
        </View>
        <View style={style.buttonWraper}>
          <RegularButton
            onPress={handleClose}
            title='Cancel'
          />
          <RegularButton
            onPress={handleSubmit(submitForm)}
            title='Submit'
            disabled={pristine || isLoading}
          />
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
