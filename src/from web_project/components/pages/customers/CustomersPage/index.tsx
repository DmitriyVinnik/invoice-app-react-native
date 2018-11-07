import React, {Component} from 'react';
import {connect} from 'react-redux';

import CustomerList from '../CustomerList/index';
import CustomerAddForm from '../CustomerAddForm';
import CustomerChangeForm from '../CustomerChangeForm';
import CustomerDeleteForm from '../CustomerDeleteForm';
import EditPanel from '../../../shared/EditPanel';
import {Actions} from '../../../../../redux/customers/AC/index';
import {destroy} from 'redux-form';

import {Dispatch} from 'redux';
import {RootState} from '../../../../../redux/store';
import {CustomersRequestState} from '../../../../../redux/request/nested-states/customers/states/index';
import {CustomerDataForServer, CustomersState} from '../../../../../redux/customers/states/index';

interface StateProps {
    customers: CustomersState,
    customersRequests: CustomersRequestState,
}

interface DispatchProps {
    loadCustomers(): void,
    submitAddForm(data: CustomerDataForServer): void,
    submitChangeForm(data: CustomerDataForServer, id: number): void,
    submitDeleteForm(id: number): void,
    destroyForm(form: string): void,
}

type Props = StateProps & DispatchProps;

interface State {
    isVisibleAddForm: boolean,
    isVisibleChangeForm: boolean,
    isVisibleDeleteForm: boolean,
}

class CustomersPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isVisibleAddForm: false,
            isVisibleChangeForm: false,
            isVisibleDeleteForm: false,
        };
    }

    public handleSubmitCustomerAddForm = (values: CustomerDataForServer): void => {
        this.props.submitAddForm(values);
    };
    public handleSubmitCustomerChangeForm = (values: CustomerDataForServer): void => {
        const {customers: {activeCustomerId}, submitChangeForm} = this.props;

        if (activeCustomerId) {
            submitChangeForm(values, activeCustomerId);
        }
    };
    public handleSubmitCustomerDeleteForm = (evt: React.FormEvent<HTMLFormElement>): void => {
        const {customers: {activeCustomerId}, submitDeleteForm} = this.props;

        evt.preventDefault();
        if (activeCustomerId) {
            submitDeleteForm(activeCustomerId);
            this.setState({isVisibleDeleteForm: false})
        }
    };
    public toggleCustomerAddForm = (): void => {
        this.setState({
            isVisibleAddForm: !this.state.isVisibleAddForm,
        });

        if (this.state.isVisibleAddForm) {
            this.props.destroyForm('customerAdd');
        }
    };
    public toggleCustomerChangeform = (): void => {
        this.setState({
            isVisibleChangeForm: !this.state.isVisibleChangeForm,
        });
    };
    public toggleCustomerDeleteForm = (): void => {
        this.setState({
            isVisibleDeleteForm: !this.state.isVisibleDeleteForm,
        });
    };

    public render() {
        const {customers: {activeCustomerId, data}, customersRequests, loadCustomers} = this.props;
        const {isVisibleAddForm, isVisibleChangeForm, isVisibleDeleteForm} = this.state;
        const activeCustomer = data.find(
            (elem) => elem.id === activeCustomerId
        );

        return (
            <section>
                <EditPanel
                    labelButton='customer'
                    onAddButtonClick={this.toggleCustomerAddForm}
                    onChangeButtonClick={this.toggleCustomerChangeform}
                    onDeleteButtonClick={this.toggleCustomerDeleteForm}
                    activeId={activeCustomerId}
                />
                <CustomerAddForm
                    isVisible={isVisibleAddForm}
                    handleClose={this.toggleCustomerAddForm}
                    isLoading={customersRequests.customersPost.loading}
                    errors={customersRequests.customersPost.errors}
                    onSubmit={this.handleSubmitCustomerAddForm}
                />
                <CustomerChangeForm
                    isVisible={isVisibleChangeForm}
                    handleClose={this.toggleCustomerChangeform}
                    isLoading={customersRequests.customersPut.loading}
                    errors={customersRequests.customersPut.errors}
                    onSubmit={this.handleSubmitCustomerChangeForm}
                    activeCustomer={activeCustomer}
                />
                <CustomerDeleteForm
                    isVisible={isVisibleDeleteForm}
                    handleClose={this.toggleCustomerDeleteForm}
                    isLoading={customersRequests.customersDelete.loading}
                    errors={customersRequests.customersDelete.errors}
                    name={activeCustomer ? activeCustomer.name : null}
                    handleSubmit={this.handleSubmitCustomerDeleteForm}
                />
                <h1 className='main-heading'>Customers: </h1>
                <CustomerList
                    customersRequest={customersRequests.customersGet}
                    customersData={data}
                    loadCustomers={loadCustomers}
                />
            </section>
        )
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    customers: state.customers,
    customersRequests: state.request.customers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
    {
        loadCustomers: () => {
            dispatch(Actions.loadAllCustomers());
        },
        submitAddForm: (data) => {
            dispatch(Actions.submitCustomerAddForm(data));
        },
        submitChangeForm: (data, id) => {
            dispatch(Actions.submitCustomerChangeForm(data, id));
        },
        submitDeleteForm: (id) => {
            dispatch(Actions.submitCustomerDeleteForm(id));
        },
        destroyForm: (form: string) => {
            dispatch(destroy(form));
        },
    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(CustomersPage);