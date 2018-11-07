import React from 'react';
import {compose, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, Field, InjectedFormProps, FormErrors, FormAction, initialize} from 'redux-form';
import FormField from '../../shared/FormField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {Product, ProductDataForServer} from '../../../../redux/products/states/index';

type FormData = ProductDataForServer

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
    activeProduct?: Product,

    handleClose(): void,
}

interface DispatchProps {
    initializeForm: (values: FormData) => void
}

type Props = OwnProps & DispatchProps & InjectedFormProps<FormData, OwnProps>

class ProductChangeForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    public componentDidMount() {
        this.setFormValues()
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.activeProduct !== this.props.activeProduct) {
            this.setFormValues()
        }
    }

    public render() {
        const {isVisible, handleSubmit, isLoading, errors, handleClose} = this.props;

        return (
            <Dialog
                open={isVisible}
                onClose={handleClose}
                aria-labelledby="product-change-dialog-title"
            >
                <DialogTitle
                    id="product-change-dialog-title"
                    className='form__title'
                >
                    <span className='form__title'>Change product.</span>
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
                            id='change-product-name'
                            labelText="Product's name: "
                        />
                        <Field
                            name='price'
                            component={FormField}
                            type='number'
                            step={0.01}
                            id='change-product-price'
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
                                    disabled={isLoading}
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
        const {activeProduct} = this.props;

        if (activeProduct) {
            const initialFormValue: FormData = {
                name: activeProduct.name,
                price: activeProduct.price,
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

    if (!values.price) {
        error.price = 'Required';
    } else if (((values.price * 100) % 100) % 1 !== 0) {
        error.price = 'Price must be in decimal format'
    }

    return error;
};

const mapDispatchToProps = (dispatch: Dispatch<FormAction>): DispatchProps => (
    {
        initializeForm: (values) => {
            dispatch(initialize('productChange', values));
        }
    }
);


export default compose(
    reduxForm<FormData, OwnProps>({
        form: 'productChange',
        validate,
    }),
    connect<DispatchProps>(null, mapDispatchToProps)
)(ProductChangeForm);
