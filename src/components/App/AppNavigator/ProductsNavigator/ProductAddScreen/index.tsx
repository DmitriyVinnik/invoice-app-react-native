import React from 'react';
import { reduxForm, Field, InjectedFormProps, FormErrors } from 'redux-form';

import { View, Text, Modal } from 'react-native';
import FormField from '../../../../../shared/components/FormField/index';
import ErrorRequestView from '../../../../../shared/components/ErrorRequestView';
import RegularText from '../../../../../shared/components/RegularText';
import RegularButton from '../../../../../shared/components/RegularButton';
import style from './style';

import { ProductsFormData } from '../../../../../redux/form/states';
import { Error } from '../../../../../shared/types/Request';

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  errors: Error | null;
  handleClose(): void;
  submitForm(values: ProductsFormData): void;
}

type Props = OwnProps & InjectedFormProps<ProductsFormData, OwnProps>;

const ProductAddForm: React.SFC<Props> = (props: Props) => {
  const {isVisible, handleSubmit, isLoading, errors, handleClose, pristine, submitForm} = props;

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
          {errors && <ErrorRequestView errors={errors}/>}
          <Field
            name='name'
            component={FormField}
            labelText='Product`s name: '
          />
          <Field
            name='price'
            component={FormField}
            keyboard='numeric'
            labelText='Product`s price: '
            placeholder='decimal'
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
