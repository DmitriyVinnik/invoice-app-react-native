import React from 'react';
import {compose, Dispatch} from 'redux'
import {connect} from 'react-redux';
import {reduxForm, Field, InjectedFormProps, FormErrors, FormAction, initialize} from 'redux-form';
import FormField from '../../shared/FormField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {CustomerDataForServer, Customer} from '../../../../redux/customers/states/index';

type FormData = CustomerDataForServer

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
    activeCustomer?: Customer,

    handleClose(): void,
}

interface DispatchProps {
    initializeForm: (values: FormData) => void
}

type Props = OwnProps & DispatchProps & InjectedFormProps<FormData, OwnProps>

class CustomerChangeForm extends React.Component<Props> {

    public componentDidMount() {
        this.setFormValues()
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.activeCustomer !== this.props.activeCustomer) {
            this.setFormValues()
        }
    }

    public render() {
        const {isVisible, handleSubmit, isLoading, errors, pristine, handleClose} = this.props;

        return (
            <Dialog
                open={isVisible}
                onClose={handleClose}
                aria-labelledby="customer-change-dialog-title"
            >
                <DialogTitle
                    id="customer-change-dialog-title"
                    className='form__title'
                >
                    <span className='form__title'>Change customer.</span>
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
                            id='change-customer-name'
                            labelText="Customer's name: "
                        />
                        <Field
                            name='address'
                            component={FormField}
                            type='text'
                            id='change-customer-address'
                            labelText="Customer's address: "
                        />
                        <Field
                            name='phone'
                            component={FormField}
                            type='tel'
                            id='change-customer-phone'
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
    }

    private setFormValues() {
        const {activeCustomer} = this.props;

        if (activeCustomer) {
            const initialFormValue: FormData = {
                name: activeCustomer.name,
                phone: activeCustomer.phone,
                address: activeCustomer.address,
            };

            this.props.initializeForm(initialFormValue)
        }
    }
}

const validate = (values: FormData): FormErrors => {
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

const mapDispatchToProps = (dispatch: Dispatch<FormAction>): DispatchProps => (
    {
        initializeForm: (values) => {
            dispatch(initialize('customerChange', values));
        }
    }
);

export default compose(
    reduxForm<FormData, OwnProps>({
        form: 'customerChange',
        validate,
    }),
    connect<DispatchProps>(null, mapDispatchToProps)
)(CustomerChangeForm);
