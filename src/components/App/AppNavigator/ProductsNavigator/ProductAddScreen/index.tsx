import React from 'react';
import { reduxForm, Field, InjectedFormProps, FormErrors } from 'redux-form';

import { View, Text, Modal } from 'react-native';
import FormField from '../../../../../shared/components/FormField/index';
import ToastRequest from '../../../../../shared/components/ToastRequest/index';
import RegularText from '../../../../../shared/components/RegularText';
import RegularButton from '../../../../../shared/components/RegularButton';
import OkButton from '../../../../../shared/components/OkButton';
import CancelButton from '../../../../../shared/components/CancelButton';
import style from './style';

import { ProductsFormData } from '../../../../../redux/form/states';

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  handleClose(): void;
  submitForm(values: ProductsFormData): void;
}

type Props = OwnProps & InjectedFormProps<ProductsFormData, OwnProps>;

const ProductAddForm: React.SFC<Props> = (props: Props) => {
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
            <Text style={style.textTitle}>Addition new product.</Text>
          </RegularText>
        </View>
        <View style={style.fieldWraper}>
          <View style={style.field}>
            <Field
              name='name'
              component={FormField}
              labelText='Product`s name: '
            />
          </View>
          <View style={style.field}>
            <Field
              name='price'
              component={FormField}
              keyboard='numeric'
              labelText='Product`s price: '
              placeholder='decimal'
            />
          </View>
        </View>
        <View style={style.buttonWraper}>
          <View style={style.button}>
            <CancelButton
              onPress={handleClose}
            />
            {/*<RegularButton*/}
              {/*onPress={handleClose}*/}
              {/*title='Cancel'*/}
            {/*/>*/}
          </View>
          <View style={style.button}>
            <OkButton
              onPress={handleSubmit(submitForm)}
              disabled={pristine || isLoading}
            />
            {/*<RegularButton*/}
              {/*onPress={handleSubmit(submitForm)}*/}
              {/*title='Submit'*/}
              {/*disabled={pristine || isLoading}*/}
            {/*/>*/}
          </View>
        </View>
        <View style={style.toastWraper}>
          <ToastRequest/>
        </View>
      </View>
    </Modal>
  );
};

const validate = (values: ProductsFormData) => {
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

export default reduxForm<ProductsFormData, OwnProps>({
  form: 'productAdd',
  validate,
})(ProductAddForm);
