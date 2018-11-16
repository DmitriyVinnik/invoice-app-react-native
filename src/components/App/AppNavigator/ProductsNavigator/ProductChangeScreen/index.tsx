import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { View, Text, Modal } from 'react-native';
import { reduxForm, Field, InjectedFormProps, FormAction, initialize } from 'redux-form';
import FormField from '../../../../../shared/components/FormField/index';
import ToastRequest from '../../../../../shared/components/ToastRequest/index';
import RegularText from '../../../../../shared/components/RegularText';
import OkButton from '../../../../../shared/components/OkButton';
import CancelButton from '../../../../../shared/components/CancelButton';
import {validate} from '../../../../../shared/validation/productsForm';
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

export default compose(
  reduxForm<ProductsFormData, OwnProps>({
    form: 'productChange',
    validate,
  }),
  connect<DispatchProps>(null, mapDispatchToProps),
)(ProductChangeForm);
