import React from 'react';
import {compose, Dispatch} from 'redux'
import {connect} from 'react-redux';
import {
    reduxForm, Field, FieldArray, initialize, getFormValues,
    InjectedFormProps, FormErrors, FormAction,
} from 'redux-form';
import FormField from '../../shared/FormField';
import InvoiceItemFieldsArray from './invoiceItems/InvoiceItemFieldsArray';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {InvoiceDataForServer} from '../../../../redux/invoices/states/index';
import {InvoiceItemDataForServer} from '../../../../redux/invoiceItems/states/index';
import {Product, ProductsState} from "../../../../redux/products/states/index";
import {RootState} from "../../../../redux/store";

import {Actions} from "../../../../redux/invoices/AC/index";

interface FormData extends InvoiceDataForServer {
    invoiceItems: InvoiceItemDataForServer[]
}

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
    activeCustomerId?: number,

    handleClose(): void,
}

interface StateProps {
    products: ProductsState,
    formValues: FormData,
}

interface DispatchProps {
    initializeForm(values: FormData): void

    submitForm(data: FormData, total: number): void
}

type Props = OwnProps & StateProps & DispatchProps & InjectedFormProps<FormData, OwnProps>

class InvoiceAddForm extends React.Component<Props> {

    public componentDidMount() {
        this.setFormValues()
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.activeCustomerId !== this.props.activeCustomerId) {
            this.setFormValues()
        }
    }

    public handleSubmitForm = (values: FormData): void => {
        this.props.submitForm(values, this.getTotalPrice());
    };

    public render() {
        const {
            isVisible, handleSubmit, isLoading, errors, products, activeCustomerId, pristine,
            handleClose
        } = this.props;

        return (
            <Dialog
                open={isVisible}
                onClose={handleClose}
                aria-labelledby="invoice-add-dialog-title"
            >
                <DialogTitle
                    _id="invoice-add-dialog-title"
                    className='form__title'
                >
                    <span className='form__title'>Addition new invoice.</span>
                    <span>{`Invoice's customer ID: ${activeCustomerId}`}</span>
                </DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={handleSubmit(this.handleSubmitForm)}
                        autoComplete='off'
                    >
                        {errors && (<span>Error: {errors}</span>)}
                        <section className='form__invoice'>
                            <strong
                                className='form__invoice-total'
                            >
                                {`Invoice's total: ${this.getTotalPrice()}`}
                            </strong>
                            <Field
                                name='discount'
                                component={FormField}
                                type='number'
                                step='0.01'
                                min='0'
                                _id='add-invoice-discount'
                                labelText="Discount: "
                                placeholder='0 to 1'
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
        const {activeCustomerId} = this.props;

        if (activeCustomerId) {
            const initialFormValue: FormData = {
                customer_id: activeCustomerId,
                discount: 0,
                total: 0,
                invoiceItems: [],
            };

            this.props.initializeForm(initialFormValue)
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

        return priceTotal
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
    formValues: getFormValues('invoiceAdd')(state) as FormData,
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

export default compose(
    reduxForm<FormData, OwnProps>({
        form: 'invoiceAdd',
        validate,
    }),
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(InvoiceAddForm);
