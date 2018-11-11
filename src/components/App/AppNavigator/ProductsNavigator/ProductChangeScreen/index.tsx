import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { reduxForm, Field, InjectedFormProps, FormErrors, FormAction, initialize } from 'redux-form';
import FormField from '../../../../../shared/components/FormField';
import ErrorRequestView from '../../../../../shared/components/ErrorRequestView';

import { Product, ProductDataForServer } from '../../../../../redux/products/states';
import { Error } from '../../../../../shared/types/Request';

type FormData = ProductDataForServer;

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  errors: Error | null;
  activeProduct?: Product;
  handleClose(): void;
  submitForm(values: FormData): void;
}

interface DispatchProps {
  initializeForm: (values: FormData) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<FormAction>): DispatchProps => (
  {
    initializeForm: (values) => {
      dispatch(initialize('productChange', values));
    },
  }
);

type Props = OwnProps & DispatchProps & InjectedFormProps<FormData, OwnProps>;

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
    const {isVisible, handleSubmit, isLoading, errors, pristine, handleClose, submitForm} = this.props;

    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={isVisible}
        onRequestClose={handleClose}
      >
        <View>
          <Text>Change product.</Text>
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
                onPress={handleSubmit(submitForm)}
                disabled={pristine || isLoading}
              >
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  private setFormValues() {
    const {activeProduct} = this.props;

    if (activeProduct) {
      const initialFormValue: FormData = {
        name: activeProduct.name,
        price: activeProduct.price,
      };

      this.props.initializeForm(initialFormValue);
    }
  }
}

const validate = (values: FormData): FormErrors => {
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

export default compose(
  reduxForm<FormData, OwnProps>({
    form: 'productChange',
    validate,
  }),
  connect<DispatchProps>(null, mapDispatchToProps),
)(ProductChangeForm);
