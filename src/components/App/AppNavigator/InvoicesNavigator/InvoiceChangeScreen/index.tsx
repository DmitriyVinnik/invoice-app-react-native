import React from 'react';
import { isEqual } from 'lodash-es';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { View, Text, Modal } from 'react-native';
import {
  reduxForm, Field, FieldArray, initialize,
  InjectedFormProps, FormErrors, FormAction, getFormValues,
} from 'redux-form';
import FormField from '../../../../../shared/components/FormField';
import InvoiceItemFieldsArray from '../../../../../shared/components/InvoiceItemFieldsArray';
import ToastRequest from '../../../../../shared/components/ToastRequest/index';
import RegularText from '../../../../../shared/components/RegularText';
import RegularButton from '../../../../../shared/components/RegularButton';
import style from './style';

import { Actions } from '../../../../../redux/invoices/AC';
import { Actions as invoiceItemsActions } from '../../../../../redux/invoiceItems/AC';
import { Actions as toastActions } from '../../../../../redux/toast/AC';

import { Invoice, InvoiceDataForServer } from '../../../../../redux/invoices/states';
import {
  InvoiceItem, InvoiceItemDataForServer, InvoiceItemsState,
} from '../../../../../redux/invoiceItems/states';
import { Product, ProductsState } from '../../../../../redux/products/states';
import { RootState } from '../../../../../redux/store';
import { InvoicesFormData, InvoiceItemsFormData } from '../../../../../redux/form/states';

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  activeInvoice: Invoice;
  activeCustomerId: number;
  handleClose(): void;
}

interface StateProps {
  products: ProductsState;
  invoiceItems: InvoiceItemsState;
  formValues: InvoicesFormData;
}

interface DispatchProps {
  initializeForm(values: InvoicesFormData): void;
  submitForm(data: InvoiceDataForServer, total: number, _id: number): void;
  submitAddInvoiceItem(data: InvoiceItemDataForServer[], invoice_id: number): void;
  submitPutInvoiceItem(data: InvoiceItem[], invoice_id: number): void;
  submitDeleteInvoiceItem(_id: number[], invoice_id: number): void;
  resetToast(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  products: state.products,
  invoiceItems: state.invoiceItems,
  formValues: getFormValues('invoiceChange')(state) as InvoicesFormData,
});

const mapDispatchToProps = (
  dispatch: Dispatch<FormAction | invoiceItemsActions | toastActions | Actions>,
): DispatchProps => (
  {
    initializeForm: (values) => {
      dispatch(initialize('invoiceChange', values));
    },
    submitForm: (data, total, _id) => {
      dispatch(Actions.submitInvoiceChangeForm(data, total, _id));
    },
    submitAddInvoiceItem: (data, invoice_id) => {
      dispatch(invoiceItemsActions.submitAddInvoiceItem(data, invoice_id));
    },
    submitPutInvoiceItem: (data, invoice_id) => {
      dispatch(invoiceItemsActions.submitPutInvoiceItem(data, invoice_id));
    },
    submitDeleteInvoiceItem: (_id, invoice_id) => {
      dispatch(invoiceItemsActions.submitDeleteInvoiceItem(_id, invoice_id));
    },
    resetToast: () => {
      dispatch(toastActions.hideToast());
    },
  }
);

type Props = OwnProps & StateProps & DispatchProps & InjectedFormProps<InvoicesFormData, OwnProps>;

class InvoiceChangeForm extends React.Component<Props> {

  public componentDidMount() {
    this.setFormValues();
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.activeInvoice !== this.props.activeInvoice) {
      this.setFormValues();
    }

    if (this.props.isVisible && !prevProps.isVisible) {
      this.setFormValues();
    }
  }

  public handleSubmitForm = (values: InvoicesFormData): void => {
    const {
      submitAddInvoiceItem, submitPutInvoiceItem, submitDeleteInvoiceItem,
      activeInvoice, submitForm, invoiceItems: {data},
    } = this.props;
    const forPostInvoiceItems = values.invoiceItems
      .filter((formElem) => !formElem._id)
      .map<InvoiceItemDataForServer>((invoiceItem) => {
        return {
          ...invoiceItem,
          quantity: +invoiceItem.quantity,
        };
      });
    const forDeleteInvoiceItems = data
      .filter((stateElem) => stateElem.invoice_id === activeInvoice._id)
      .filter(
        (activeInvoiceItem) => {
          const isInFormData = values.invoiceItems.find(
            (formElem) => formElem._id === activeInvoiceItem._id,
          );
          return !isInFormData;
        },
      )
      .map<number>((elem) => elem._id)
    ;
    const forPutInvoiceItems = values.invoiceItems
      .filter((formElem) => !!formElem._id)
      .filter((formElem) => {
        const formElemInState = data.find(
          (stateElem) => formElem._id === stateElem._id,
        );

        return !(formElemInState && isEqual(formElemInState, formElem));
      })
      .map<InvoiceItem>((invoiceItem) => {
        return {
          ...invoiceItem,
          quantity: +invoiceItem.quantity,
        };
      });

    const invoiceValuesForServer: InvoiceDataForServer = {
      ...values,
      discount: +values.discount,
    };

    this.props.resetToast();
    submitForm(invoiceValuesForServer, this.getTotalPrice(), activeInvoice._id);

    if (forPostInvoiceItems) {
      submitAddInvoiceItem(forPostInvoiceItems, activeInvoice._id);
    }

    if (forPutInvoiceItems) {
      submitPutInvoiceItem(forPutInvoiceItems, activeInvoice._id);
    }

    if (forDeleteInvoiceItems) {
      submitDeleteInvoiceItem(forDeleteInvoiceItems, activeInvoice._id);
    }

    this.props.handleClose();
  }

  public render() {
    const {
      isVisible, handleSubmit, isLoading, products, activeCustomerId, pristine,
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
              <Text style={style.textTitle}>Change invoice.</Text>
            </RegularText>
            <RegularText>{`Invoice's customer ID: ${activeCustomerId}`}</RegularText>
          </View>
          <View style={style.fieldWraper}>
            <ToastRequest/>
            <View>
              <RegularText>
                <Text style={style.textTitle}>{`Invoice's total: ${this.getTotalPrice()}`}</Text>
              </RegularText>
              <View style={style.discountWraper}>
                <Field
                  name='discount'
                  component={FormField}
                  keyboard='numeric'
                  labelText='Discount:  '
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
    const {activeInvoice, invoiceItems} = this.props;

    const initialInvoiceItems = invoiceItems.data
      .filter((invoiceItem) => invoiceItem.invoice_id === activeInvoice._id)
      .map<InvoiceItemsFormData>((invoiceItem) => {
        return {
          ...invoiceItem,
          quantity: `${invoiceItem.quantity}`,
        };
      });

    const initialFormValue: InvoicesFormData = {
      discount: `${activeInvoice.discount}`,
      customer_id: activeInvoice.customer_id,
      total: activeInvoice.total,
      invoiceItems: initialInvoiceItems,
    };

    this.props.initializeForm(initialFormValue);
  }

  private getTotalPrice() {
    const {formValues, products, activeInvoice, dirty} = this.props;

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

    return dirty ? priceTotal : activeInvoice.total;
  }
}

const validate = (values: InvoicesFormData) => {
  const errors: FormErrors<InvoicesFormData, any> = {};

  if (!values.discount) {
    errors.discount = 'Required';
  } else if (+values.discount > 100 || +values.discount < 0) {
    errors.discount = 'Discount must be in range from 0 to 1';
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
    form: 'invoiceChange',
    validate,
  }),
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(InvoiceChangeForm);
