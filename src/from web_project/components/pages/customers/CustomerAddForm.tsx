import React from 'react';
import {reduxForm, Field, InjectedFormProps, FormErrors} from 'redux-form';
import FormField from '../../shared/FormField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {CustomerDataForServer} from '../../../../redux/customers/states/index';

type FormData = CustomerDataForServer

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,

    handleClose(): void,
}

type Props = OwnProps & InjectedFormProps<FormData, OwnProps>

const CustomerAddForm: React.SFC<Props> = (props: Props) => {
    const {isVisible, handleSubmit, isLoading, errors, handleClose, pristine} = props;

    return (
        <Dialog
            open={isVisible}
            onClose={handleClose}
            aria-labelledby="customer-add-dialog-title"
        >
            <DialogTitle
                id="customer-add-dialog-title"
                className='form__title'
            >
                <span className='form__title'>Addition new customer.</span>
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
                        id='add-customer-name'
                        labelText="Customer's name: "
                    />
                    <Field
                        name='address'
                        component={FormField}
                        type='text'
                        id='add-customer-address'
                        labelText="Customer's address: "
                    />
                    <Field
                        name='phone'
                        component={FormField}
                        type='tel'
                        id='add-customer-phone'
                        labelText="Customer's phone: "
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

    if (!values.address) {
        error.address = 'Required';
    }

    if (!values.phone) {
        error.phone = 'Required';
    }

    return error;
};

export default reduxForm<FormData, OwnProps>({
    form: 'customerAdd',
    validate,
})(CustomerAddForm);
