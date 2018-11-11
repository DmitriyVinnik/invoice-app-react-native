import React from 'react';
import {isEqual} from "lodash-es";
import {compose, Dispatch} from 'redux'
import {connect} from 'react-redux';
import {
    reduxForm, Field, FieldArray, initialize,
    InjectedFormProps, FormErrors, FormAction, getFormValues,
} from 'redux-form';
import FormField from '../../shared/FormField';
import InvoiceItemFieldsArray from '../../../../../shared/components/InvoiceItemFieldsArray';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {Invoice, InvoiceDataForServer} from '../../../../../redux/invoices/states/index';
import {InvoiceItem, InvoiceItemDataForServer, InvoiceItemsState} from '../../../../../redux/invoiceItems/states/index';
import {Product, ProductsState} from "../../../../../redux/products/states/index";
import {RootState} from "../../../../../redux/store";

import {Actions} from "../../../../../redux/invoices/AC/index";
import {Actions as invoiceItemsActions} from "../../../../../redux/invoiceItems/AC/index";

interface FormData extends InvoiceDataForServer {
    invoiceItems: InvoiceItem[]
}

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
    activeInvoice: Invoice,
    activeCustomerId: number,

    handleClose(): void,
}

interface StateProps {
    products: ProductsState,
    invoiceItems: InvoiceItemsState,
    formValues: FormData,
}

interface DispatchProps {
    initializeForm(values: FormData): void,

    submitForm(data: FormData, total: number, _id: number): void,

    submitAddInvoiceItem(data: InvoiceItemDataForServer[], invoice_id: number): void,

    submitPutInvoiceItem(data: InvoiceItem[], invoice_id: number): void,

    submitDeleteInvoiceItem(_id: number[], invoice_id: number): void,
}

type Props = OwnProps & StateProps & DispatchProps & InjectedFormProps<FormData, OwnProps>

class InvoiceChangeForm extends React.Component<Props> {

    public componentDidMount() {
        this.setFormValues();
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.activeInvoice !== this.props.activeInvoice) {
            this.setFormValues()
        }

        if (this.props.isVisible && !prevProps.isVisible) {
            this.setFormValues();
        }
    }

    public handleSubmitForm = (values: FormData): void => {
        const {
            submitAddInvoiceItem, submitPutInvoiceItem, submitDeleteInvoiceItem,
            activeInvoice, submitForm, invoiceItems: {data}
        } = this.props;
        const forPostInvoiceItems = values.invoiceItems.filter((formElem) => !formElem._id);
        const forDeleteInvoiceItems = data
            .filter((stateElem) => stateElem.invoice_id === activeInvoice._id)
            .filter(
                (activeInvoiceItem) => {
                    const isInFormData = values.invoiceItems.find(
                        (formElem) => formElem._id === activeInvoiceItem._id
                    );
                    return !isInFormData
                }
            )
            .map<number>((elem) => elem._id)
        ;
        const forPutInvoiceItems = values.invoiceItems
            .filter((formElem) => !!formElem._id)
            .filter((formElem) => {
                const formElemInState = data.find(
                    (stateElem) => formElem._id === stateElem._id
                );

                return !(formElemInState && isEqual(formElemInState, formElem));
            });

        submitForm(values, this.getTotalPrice(), activeInvoice._id);

        if (forPostInvoiceItems) {
            submitAddInvoiceItem(forPostInvoiceItems, activeInvoice._id)
        }

        if (forPutInvoiceItems) {
            submitPutInvoiceItem(forPutInvoiceItems, activeInvoice._id)
        }

        if (forDeleteInvoiceItems) {
            submitDeleteInvoiceItem(forDeleteInvoiceItems, activeInvoice._id)
        }

        this.props.handleClose();
    };

    public render() {
        const {
            isVisible, handleSubmit, isLoading, errors, products, activeCustomerId, pristine,
            handleClose,
        } = this.props;

        return (
            <Dialog
                open={isVisible}
                onClose={handleClose}
                aria-labelledby="customer-change-dialog-title"
            >
                <DialogTitle
                    _id="customer-change-dialog-title"
                    className='form__title'
                >
                    <span className='form__title'>Change invoice.</span>
                    <span>{`Invoice's customer ID: ${activeCustomerId}`}</span>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                        {errors && (<span className='error error--field'>Error: {errors}</span>)}
                        <section>
                            <strong>{`Invoice's total: ${this.getTotalPrice()}`}</strong>
                            <Field
                                name='discount'
                                component={FormField}
                                type='number'
                                step='0.01'
                                min='0'
                                _id='add-invoice-discount'
                                labelText="Invoice's discount: "
                                placeholder='From 0 to 1'
                            />
                        </section>
                        <FieldArray
                            name='invoiceItems'
                            component={InvoiceItemFieldsArray}
                            products={products}
                        />
                        <DialogActions>
                            <div className='form__btn-wraper'>
                                <Button
                                    onClick={handleClose}
                                    variant="contained"
                                    color="primary"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type='submit'
                                    disabled={pristine || isLoading}
                                    variant="contained"
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            </div>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }

    private setFormValues() {
        const {activeInvoice, invoiceItems} = this.props;

        const initialInvoiceItems = invoiceItems.data.filter(
            (invoiceItem) => invoiceItem.invoice_id === activeInvoice._id
        );

        const initialFormValue: FormData = {
            discount: activeInvoice.discount,
            customer_id: activeInvoice.customer_id,
            total: activeInvoice.total,
            invoiceItems: initialInvoiceItems,
        };

        this.props.initializeForm(initialFormValue)
    }

    private getTotalPrice() {
        const {formValues, products, activeInvoice, dirty} = this.props;

        let priceWithoutDiscount = 0;
        let priceTotal = 0;

        if (formValues) {
            priceWithoutDiscount = formValues.invoiceItems.reduce((accum, invoiceItem) => {
                if (invoiceItem) {
                    const product = products.data.find((prod) => {

                        return prod._id === invoiceItem.product_id
                    }) as Product;

                    return accum +
                        (invoiceItem.quantity ? invoiceItem.quantity : 0) *
                        (product ? product.price : 0)
                }

                return 0
            }, 0);

            priceTotal = Math.round(priceWithoutDiscount * (1 - formValues.discount) * 100) / 100;
        }

        return dirty ? priceTotal : activeInvoice.total
    }
}

const validate = (values: FormData) => {
    const errors: FormErrors<FormData, any> = {};

    if (!values.discount) {
        errors.discount = 'Required';
    } else if (values.discount > 1 || values.discount < 0) {
        errors.discount = 'Discount must be in range from 0 to 1'
    }

    if (!values.invoiceItems || !values.invoiceItems.length) {
        errors.invoiceItems = {_error: 'At least one member must be entered'}
    } else {
        const invoiceItemsArrayErrors: Array<FormErrors<InvoiceItemDataForServer>> = [];

        values.invoiceItems.forEach((invoiceItem, invoiceItemIndex) => {
            const invoiceItemErrors: FormErrors<InvoiceItemDataForServer> = {};

            if (!invoiceItem || !invoiceItem.quantity) {
                invoiceItemErrors.quantity = 'Required';
                invoiceItemsArrayErrors[invoiceItemIndex] = invoiceItemErrors;
            } else if (invoiceItem.quantity % 1 !== 0) {
                invoiceItemErrors.quantity = 'Value must be an integer';
                invoiceItemsArrayErrors[invoiceItemIndex] = invoiceItemErrors;
            }

            if (!invoiceItem || !invoiceItem.product_id) {
                invoiceItemErrors.product_id = 'Required';
                invoiceItemsArrayErrors[invoiceItemIndex] = invoiceItemErrors;
            }
        });

        if (invoiceItemsArrayErrors.length) {
            errors.invoiceItems = invoiceItemsArrayErrors
        }
    }
    return errors
};

const mapStateToProps = (state: RootState): StateProps => ({
    products: state.products,
    invoiceItems: state.invoiceItems,
    formValues: getFormValues('invoiceChange')(state) as FormData
});

const mapDispatchToProps = (dispatch: Dispatch<FormAction>): DispatchProps => (
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
    }
);

export default compose(
    reduxForm<FormData, OwnProps>({
        form: 'invoiceChange',
        validate,
    }),
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(InvoiceChangeForm);
