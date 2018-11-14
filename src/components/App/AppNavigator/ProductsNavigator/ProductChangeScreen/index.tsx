import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { View, Text, Modal } from 'react-native';
import { reduxForm, Field, InjectedFormProps, FormErrors, FormAction, initialize } from 'redux-form';
import FormField from '../../../../../shared/components/FormField/index';
import ToastRequest from '../../../../../shared/components/ToastRequest/index';
import RegularText from '../../../../../shared/components/RegularText';
import RegularButton from '../../../../../shared/components/RegularButton';
import style from './style';

import { Product } from '../../../../../redux/products/states';
import { ProductsFormData } from '../../../../../redux/form/states';

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  activeProduct?: Product;
  handleClose(): void;
  submitForm(values: ProductsFormData): void;
}

interface DispatchProps {
  initializeForm: (values: ProductsFormData) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<FormAction>): DispatchProps => (
  {
    initializeForm: (values) => {
      dispatch(initialize('productChange', values));
    },
  }
);

type Props = OwnProps & DispatchProps & InjectedFormProps<ProductsFormData, OwnProps>;

class ProductChangeForm extends React.Component<Props> {

  public componentDidMount() {
    this.setFormValues();
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.activeProduct !== this.props.activeProduct) {
      this.setFormValues();
    }
  }

  public render() {
    const {isVisible, handleSubmit, isLoading, pristine, handleClose, submitForm} = this.props;

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
            <ToastRequest/>
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
  }

  private setFormValues() {
    const {activeProduct} = this.props;

    if (activeProduct) {
      const initialFormValue: ProductsFormData = {
        name: activeProduct.name,
        price: `${activeProduct.price}`,
      };

      this.props.initializeForm(initialFormValue);
    }
  }
}

const validate = (values: ProductsFormData): FormErrors => {
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

export default compose(
  reduxForm<ProductsFormData, OwnProps>({
    form: 'productChange',
    validate,
  }),
  connect<DispatchProps>(null, mapDispatchToProps),
)(ProductChangeForm);
