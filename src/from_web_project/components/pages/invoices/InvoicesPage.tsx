import React, {Component} from 'react';
import {connect} from 'react-redux';

import InvoicesList from './InvoicesList';
import InvoiceAddForm from './InvoiceAddForm';
import InvoiceChangeForm from './InvoiceChangeForm';
import InvoiceDeleteForm from './InvoiceDeleteForm';
import EditPanel from '../../shared/EditPanel';
import CustomerSelectElement from './CustomerSelectElement';

import {Actions} from '../../../../redux/invoices/AC/index';
import * as productsActions from '../../../../redux/products/AC/index';
import {destroy} from 'redux-form';

import {Dispatch} from 'redux';
import {RootState} from '../../../../redux/store';
import {InvoicesRequestState} from '../../../../redux/request/nested-states/invoices/states/index';
import {InvoicesState} from '../../../../redux/invoices/states/index';
import {CustomersState} from "../../../../redux/customers/states/index";

interface StateProps {
    invoices: InvoicesState,
    invoicesRequests: InvoicesRequestState,
    customers: CustomersState,
}

interface DispatchProps {
    loadProducts(): void,
    loadInvoices(): void,
    submitDeleteForm(_id: number): void,
    destroyForm(form: string): void,
}

type Props = StateProps & DispatchProps;

interface State {
    isVisibleAddForm: boolean,
    isVisibleChangeForm: boolean,
    isVisibleDeleteForm: boolean,
}

class InvoicesPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isVisibleAddForm: false,
            isVisibleChangeForm: false,
            isVisibleDeleteForm: false,
        };
    }

    public handleSubmitInvoiceDeleteForm = (evt: React.FormEvent<HTMLFormElement>): void => {
        const {invoices: {activeInvoiceId}, submitDeleteForm} = this.props;

        evt.preventDefault();
        if (activeInvoiceId) {
            submitDeleteForm(activeInvoiceId);
            this.setState({isVisibleDeleteForm: false})
        }
    };
    public toggleInvoiceAddForm= (): void => {
        this.setState({
            isVisibleAddForm: !this.state.isVisibleAddForm,
        });

        if (this.state.isVisibleAddForm) {
            this.props.destroyForm('invoiceAdd');
        }
    };
    public toggleInvoiceChangeForm= (): void => {
        this.setState({
            isVisibleChangeForm: !this.state.isVisibleChangeForm,
        });
    };
    public toggleInvoiceDeleteForm = (): void => {
        this.setState({
            isVisibleDeleteForm: !this.state.isVisibleDeleteForm,
        });
    };

    public render() {
        const {
            invoices: {activeInvoiceId}, invoicesRequests, invoices,
            loadInvoices, loadProducts,
            customers: {activeCustomerId},
        } = this.props;
        const {isVisibleAddForm, isVisibleChangeForm, isVisibleDeleteForm} = this.state;
        const activeInvoice = invoices.data.find(
            (elem) => elem._id === activeInvoiceId
        );

        return (
            <div>
                <h1 className='main-heading'>Invoices: </h1>
                <CustomerSelectElement/>
                {activeCustomerId && <section>
                    <EditPanel
                        labelButton='invoice'
                        onAddButtonClick={this.toggleInvoiceAddForm}
                        onChangeButtonClick={this.toggleInvoiceChangeForm}
                        onDeleteButtonClick={this.toggleInvoiceDeleteForm}
                        activeId={activeInvoiceId}
                    />
                    <InvoiceAddForm
                        isVisible={isVisibleAddForm}
                        handleClose={this.toggleInvoiceAddForm}
                        isLoading={invoicesRequests.invoicesPost.loading}
                        errors={invoicesRequests.invoicesPost.errors}
                        activeCustomerId={activeCustomerId}
                    />
                    {activeInvoice && <InvoiceChangeForm
                        isVisible={isVisibleChangeForm}
                        handleClose={this.toggleInvoiceChangeForm}
                        isLoading={invoicesRequests.invoicesPut.loading}
                        errors={invoicesRequests.invoicesPut.errors}
                        activeInvoice={activeInvoice}
                        activeCustomerId={activeCustomerId}
                    />}
                    {activeInvoice && <InvoiceDeleteForm
                        isVisible={isVisibleDeleteForm}
                        handleClose={this.toggleInvoiceDeleteForm}
                        isLoading={invoicesRequests.invoicesDelete.loading}
                        errors={invoicesRequests.invoicesDelete.errors}
                        _id={activeInvoice._id}
                        handleSubmit={this.handleSubmitInvoiceDeleteForm}
                    />}
                    <InvoicesList
                        invoicesRequest={invoicesRequests.invoicesGet}
                        invoicesData={invoices.data}
                        activeCustomerId={activeCustomerId}
                        loadInvoices={loadInvoices}
                        loadProducts={loadProducts}
                    />
                </section>}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    invoices: state.invoices,
    customers: state.customers,
    invoicesRequests: state.request.invoices,
});

const mapDispatchToProps = (
    dispatch: Dispatch<Actions | productsActions.Actions>
): DispatchProps => (
    {
        loadInvoices: () => {
            dispatch(Actions.loadAllInvoices());
        },
        loadProducts: () => {
            dispatch(productsActions.Actions.loadAllProducts());
        },
        submitDeleteForm: (_id) => {
            dispatch(Actions.submitInvoiceDeleteForm(_id));
        },
        destroyForm: (form) => {
            dispatch(destroy(form));
        },
    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(InvoicesPage);