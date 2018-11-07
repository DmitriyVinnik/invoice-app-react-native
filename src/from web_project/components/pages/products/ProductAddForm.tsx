import React from 'react';
import {reduxForm, Field, InjectedFormProps, FormErrors} from 'redux-form';
import FormField from '../../shared/FormField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {ProductDataForServer} from '../../../../redux/products/states/index';

type FormData = ProductDataForServer

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,

    handleClose(): void,
}

type Props = OwnProps & InjectedFormProps<FormData, OwnProps>

const ProductAddForm: React.SFC<Props> = (props: Props) => {
    const {isVisible, handleSubmit, isLoading, errors, handleClose, pristine} = props;

    return (
        <Dialog
            open={isVisible}
            onClose={handleClose}
            aria-labelledby="product-add-dialog-title"
        >
            <DialogTitle
                id="customer-add-dialog-title"
                className='form__title'
            >
                <span className='form__title'>Addition new product.</span>
            </DialogTitle>
            <DialogContent>
                <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    {errors && (<span className='errors'>Error: {errors}</span>)}
                    <Field
                        name='name'
                        component={FormField}
                        type='text'
                        id='add-product-name'
                        labelText="Product's name: "
                    />
                    <Field
                        name='price'
                        component={FormField}
                        type='number'
                        step='0.01'
                        id='add-product-price'
                        labelText="Product's price: "
                        placeholder='decimal'
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
};

const validate = (values: FormData) => {
    const error: FormErrors<FormData> = {};

    if (!values.name) {
        error.name = 'Required';
    }

    if (!values.price) {
        error.price = 'Required';
    } else if (((values.price * 100) % 100) % 1 !== 0) {
        error.price = 'Price must be in decimal format'
    }

    return error;
};

export default reduxForm<FormData, OwnProps>({
    form: 'productAdd',
    validate,
})(ProductAddForm);
