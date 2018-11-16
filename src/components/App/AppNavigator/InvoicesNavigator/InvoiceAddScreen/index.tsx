import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { View, Text, Modal, ScrollView } from 'react-native';
import {
  reduxForm, Field, FieldArray, initialize, getFormValues,
  InjectedFormProps, FormAction,
} from 'redux-form';
import FormField from '../../../../../shared/components/FormField';
import InvoiceItemFieldsArray from '../../../../../shared/components/InvoiceItemFieldsArray/index';
import ToastRequest from '../../../../../shared/components/ToastRequest/index';
import RegularText from '../../../../../shared/components/RegularText';
import OkButton from '../../../../../shared/components/OkButton';
import CancelButton from '../../../../../shared/components/CancelButton';
import {validate} from '../../../../../shared/validation/invoicesForm';
import style from './style';

import { Actions } from '../../../../../redux/invoices/AC';
import { Actions as toastActions } from '../../../../../redux/toast/AC';

import { InvoiceDataForServer } from '../../../../../redux/invoices/states';
import { Product, ProductsState } from '../../../../../redux/products/states';
import { RootState } from '../../../../../redux/store';
import { InvoicesFormData } from '../../../../../redux/form/states';

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
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
  resetToast(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  products: state.products,
  formValues: getFormValues('invoiceAdd')(state) as InvoicesFormData,
});

const mapDispatchToProps = (dispatch: Dispatch<FormAction | Actions | toastActions>): DispatchProps => (
  {
    initializeForm: (values) => {
      dispatch(initialize('invoiceAdd', values));
    },
    submitForm: (data, total) => {
      dispatch(Actions.submitInvoiceAddForm(data, total));
    },
    resetToast: () => {
      dispatch(toastActions.hideToast());
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

    this.props.resetToast();
    this.props.submitForm(valuesForServer, this.getTotalPrice());
  }

  public render() {
    const {
      isVisible, handleSubmit, isLoading, products, pristine,
      handleClose,
    } = this.props;

    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={isVisible}
        onRequestClose={handleClose}
      >
        <ScrollView
          contentContainerStyle={style.container}
        >
          <View style={style.headerWraper}>
            <RegularText>
              <Text style={style.textTitle}>Addition new invoice.</Text>
            </RegularText>
          </View>
          <View style={style.fieldWraper}>
            <View style={style.headerWraper}>
              <RegularText>
                <Text style={style.textTitle}>{`Invoice's total: ${this.getTotalPrice()}`}</Text>
              </RegularText>
            </View>
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
          <View>
            <FieldArray
              name='invoiceItems'
              component={InvoiceItemFieldsArray}
              products={products}
            />
          </View>
          <View style={style.buttonWraper}>
            <View style={style.button}>
              <CancelButton
                onPress={handleClose}
              />
            </View>
            <View style={style.button}>
              <OkButton
                onPress={handleSubmit(this.handleSubmitForm)}
                disabled={pristine || isLoading}
              />
            </View>
          </View>
          <View style={style.toastWraper}>
            <ToastRequest/>
          </View>
        </ScrollView>
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

export default compose(
  reduxForm<InvoicesFormData, OwnProps>({
    form: 'invoiceAdd',
    validate,
  }),
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(InvoiceAddForm);
