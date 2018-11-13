import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { View, Text, Modal } from 'react-native';
import {
  reduxForm, Field, FieldArray, initialize, getFormValues,
  InjectedFormProps, FormErrors, FormAction,
} from 'redux-form';
import FormField from '../../../../../shared/components/FormField';
import InvoiceItemFieldsArray from '../../../../../shared/components/InvoiceItemFieldsArray/index';
import ErrorRequestView from '../../../../../shared/components/ErrorRequestView';
import RegularText from '../../../../../shared/components/RegularText';
import RegularButton from '../../../../../shared/components/RegularButton';
import style from './style';

import { Actions } from '../../../../../redux/invoices/AC';

import { InvoiceDataForServer } from '../../../../../redux/invoices/states';
import { Product, ProductsState } from '../../../../../redux/products/states';
import { RootState } from '../../../../../redux/store';
import { Error } from '../../../../../shared/types/Request';
import { InvoicesFormData, InvoiceItemsFormData } from '../../../../../redux/form/states';

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  errors: Error | null;
  activeCustomerId?: number;
  handleClose(): void;
}

interface StateProps {
  products: ProductsState;
  formValues: InvoicesFormData;
}

interface DispatchProps {
  initializeForm(values: InvoicesFormData): void;
  submitForm(data: InvoiceDataForServer, total: number): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  products: state.products,
  formValues: getFormValues('invoiceAdd')(state) as InvoicesFormData,
});

const mapDispatchToProps = (dispatch: Dispatch<FormAction>): DispatchProps => (
  {
    initializeForm: (values) => {
      dispatch(initialize('invoiceAdd', values));
    },
    submitForm: (data, total) => {
      dispatch(Actions.submitInvoiceAddForm(data, total));
    },
  }
);

type Props = OwnProps & StateProps & DispatchProps & InjectedFormProps<InvoicesFormData, OwnProps>;

class InvoiceAddForm extends React.Component<Props> {

  public componentDidMount() {
    this.setFormValues();
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.activeCustomerId !== this.props.activeCustomerId) {
      this.setFormValues();
    }
  }

  public handleSubmitForm = (values: InvoicesFormData): void => {
    const valuesForServer: InvoiceDataForServer = {
      ...values,
      discount: +values.discount,
    };

    this.props.submitForm(valuesForServer, this.getTotalPrice());
  }

  public render() {
    const {
      isVisible, handleSubmit, isLoading, errors, products, activeCustomerId, pristine,
      handleClose,
    } = this.props;

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
              <Text style={style.textTitle}>Addition new invoice.</Text>
            </RegularText>
            <RegularText>{`Invoice's customer ID: ${activeCustomerId}`}</RegularText>
          </View>
          <View style={style.fieldWraper}>
            {errors && <ErrorRequestView errors={errors}/>}
            <View>
              <RegularText>
                <Text style={style.textTitle}>{`Invoice's total: ${this.getTotalPrice()}`}</Text>
              </RegularText>
              <View style={style.discountWraper}>
                <Field
                  name='discount'
                  component={FormField}
                  keyboard='numeric'
                  labelText='Discount: '
                  placeholder='0 to 99'
                />
              </View>
            </View>
            <FieldArray
              name='invoiceItems'
              component={InvoiceItemFieldsArray}
              products={products}
            />
          </View>
          <View style={style.buttonWraper}>
            <RegularButton
              onPress={handleClose}
              title='Cancel'
            />
            <RegularButton
              onPress={handleSubmit(this.handleSubmitForm)}
              title='Submit'
              disabled={pristine || isLoading}
            />
          </View>
        </View>
      </Modal>
    );
  }

  private setFormValues() {
    const {activeCustomerId} = this.props;

    if (activeCustomerId) {
      const initialFormValue: InvoicesFormData = {
        customer_id: activeCustomerId,
        discount: '0',
        total: 0,
        invoiceItems: [],
      };

      this.props.initializeForm(initialFormValue);
    }
  }

  private getTotalPrice() {
    const {formValues, products} = this.props;

    let priceWithoutDiscount = 0;
    let priceTotal = 0;

    if (formValues) {
      priceWithoutDiscount = formValues.invoiceItems.reduce((accum, invoiceItem) => {
        if (invoiceItem) {
          const product = products.data.find((prod) => {

            return prod._id === invoiceItem.product_id;
          }) as Product;

          return accum +
            (invoiceItem.quantity ? +invoiceItem.quantity : 0) *
            (product ? product.price : 0);
        }

        return 0;
      }, 0);

      priceTotal = Math.round(priceWithoutDiscount * (100 - +formValues.discount)) / 100;
    }

    return priceTotal;
  }
}

const validate = (values: InvoicesFormData) => {
  const errors: FormErrors<InvoicesFormData, any> = {};

  if (!values.discount) {
    errors.discount = 'Required';
  } else if (+values.discount > 100 || +values.discount < 0) {
    errors.discount = 'Must be in range from 0 to 99';
  }

  if (!values.invoiceItems || !values.invoiceItems.length) {
    errors.invoiceItems = {_error: 'At least one member must be entered'};
  } else {
    const invoiceItemsArrayErrors: Array<FormErrors<InvoiceItemsFormData>> = [];

    values.invoiceItems.forEach((invoiceItem, invoiceItemIndex) => {
      const invoiceItemErrors: FormErrors<InvoiceItemsFormData> = {};

      if (!invoiceItem || !invoiceItem.quantity) {
        invoiceItemErrors.quantity = 'Required';
        invoiceItemsArrayErrors[invoiceItemIndex] = invoiceItemErrors;
      } else if (+invoiceItem.quantity % 1 !== 0) {
        invoiceItemErrors.quantity = 'Value must be an integer';
        invoiceItemsArrayErrors[invoiceItemIndex] = invoiceItemErrors;
      }

      if (!invoiceItem || !invoiceItem.product_id) {
        invoiceItemErrors.product_id = 'Required';
        invoiceItemsArrayErrors[invoiceItemIndex] = invoiceItemErrors;
      }
    });

    if (invoiceItemsArrayErrors.length) {
      errors.invoiceItems = invoiceItemsArrayErrors;
    }
  }
  return errors;
};

export default compose(
  reduxForm<InvoicesFormData, OwnProps>({
    form: 'invoiceAdd',
    validate,
  }),
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(InvoiceAddForm);
