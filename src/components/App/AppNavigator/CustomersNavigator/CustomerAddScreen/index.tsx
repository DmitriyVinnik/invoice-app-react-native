import React from 'react';

import { View, Text, Modal } from 'react-native';
import { reduxForm, Field, InjectedFormProps, FormErrors } from 'redux-form';
import FormField from '../../../../../shared/components/FormField';
import ToastRequest from '../../../../../shared/components/ToastRequest/index';
import RegularText from '../../../../../shared/components/RegularText';
import OkButton from '../../../../../shared/components/OkButton';
import CancelButton from '../../../../../shared/components/CancelButton';
import style from './style';

import { CustomerDataForServer } from '../../../../../redux/customers/states';

type FormData = CustomerDataForServer;

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  handleClose(): void;
  submitForm(values: FormData): void;
}

type Props = OwnProps & InjectedFormProps<FormData, OwnProps>;

const CustomerAddScreen: React.SFC<Props> = (props: Props) => {
  const {isVisible, handleSubmit, isLoading, handleClose, pristine, submitForm} = props;

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
          <View style={style.field}>
            <Field
              name='name'
              component={FormField}
              labelText='Customer`s name: '
            />
          </View>
          <View style={style.field}>
            <Field
              name='address'
              component={FormField}
              labelText='Customer`s address: '
            />
          </View>
          <View style={style.field}>
            <Field
              name='phone'
              component={FormField}
              keyboard='numeric'
              placeholder='+380999999999'
              labelText='Customer`s phone: '
            />
          </View>
        </View>
        <View style={style.buttonWraper}>
          <View style={style.button}>
            <CancelButton
              onPress={handleClose}
            />
          </View>
          <View style={style.button}>
            <OkButton
              onPress={handleSubmit(submitForm)}
              disabled={pristine || isLoading}
            />
          </View>
        </View>
        <View style={style.toastWraper}>
          <ToastRequest/>
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
