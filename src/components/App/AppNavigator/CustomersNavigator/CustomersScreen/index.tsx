import React from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { connect } from 'react-redux';

import CustomerList from './CustomerList';
import EditPanel from '../../../../../shared/components/EditPanel';
import CustomerDeleteScreen from '../CustomerDeleteScreen';
import CustomerAddScreen from '../CustomerAddScreen';
import CustomerChangeScreen from '../CustomerChangeScreen';

import { CustomerDataForServer, CustomersState } from '../../../../../redux/customers/states';
import { CustomersRequestState } from '../../../../../redux/request/nested-states/customers/states';
import { RootState } from '../../../../../redux/store';
import { Dispatch } from 'redux';

import { Actions } from '../../../../../redux/customers/AC';
import { destroy } from 'redux-form';

interface StateProps {
  customers: CustomersState;
  customersRequests: CustomersRequestState;
}

interface DispatchProps {
  loadCustomers(): void;
  submitAddForm(data: CustomerDataForServer): void;
  submitChangeForm(data: CustomerDataForServer, _id: number): void;
  submitDeleteForm(_id: number): void;
  destroyForm(form: string): void;
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
    submitChangeForm: (data, _id) => {
      dispatch(Actions.submitCustomerChangeForm(data, _id));
    },
    submitDeleteForm: (_id) => {
      dispatch(Actions.submitCustomerDeleteForm(_id));
    },
    destroyForm: (form: string) => {
      dispatch(destroy(form));
    },
  }
);

type Props = StateProps & DispatchProps;

interface State {
  isVisibleAddForm: boolean;
  isVisibleChangeForm: boolean;
  isVisibleDeleteForm: boolean;
}

class CustomersScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisibleAddForm: false,
      isVisibleChangeForm: false,
      isVisibleDeleteForm: false,
    };
  }

  public toggleCustomerAddForm = (): void => {
    this.setState({
      isVisibleAddForm: !this.state.isVisibleAddForm,
    });

    if (this.state.isVisibleAddForm) {
      this.props.destroyForm('customerAdd');
    }
  }

  public toggleCustomerChangeform = (): void => {
    this.setState({
      isVisibleChangeForm: !this.state.isVisibleChangeForm,
    });
  }

  public toggleCustomerDeleteForm = (): void => {
    this.setState({
      isVisibleDeleteForm: !this.state.isVisibleDeleteForm,
    });
  }

  public handleSubmitCustomerAddForm = (values: CustomerDataForServer): void => {
    this.props.submitAddForm(values);
  }

  public handleSubmitCustomerChangeForm = (values: CustomerDataForServer): void => {
    const {customers: {activeCustomerId}, submitChangeForm} = this.props;

    if (activeCustomerId) {
      submitChangeForm(values, activeCustomerId);
    }
  }

  public handleSubmitCustomerDeleteForm = (evt: GestureResponderEvent): void => {
    const {customers: {activeCustomerId}, submitDeleteForm} = this.props;

    evt.preventDefault();
    if (activeCustomerId) {
      submitDeleteForm(activeCustomerId);
      this.setState({isVisibleDeleteForm: false});
    }
  }

  render() {
    const {customers, customersRequests, loadCustomers} = this.props;
    const {isVisibleAddForm, isVisibleChangeForm, isVisibleDeleteForm} = this.state;
    const activeCustomer = customers.data.find(
      (elem) => elem._id === customers.activeCustomerId,
    );

    return (
      <View>
        <CustomerList
          customersRequest={customersRequests.customersGet}
          customersData={customers.data}
          loadCustomers={loadCustomers}
        />
        <EditPanel
          labelButton='customer'
          activeId={customers.activeCustomerId}
          onAddButtonClick={this.toggleCustomerAddForm}
          onChangeButtonClick={this.toggleCustomerChangeform}
          onDeleteButtonClick={this.toggleCustomerDeleteForm}
        />
        <CustomerAddScreen
          isVisible={isVisibleAddForm}
          handleClose={this.toggleCustomerAddForm}
          isLoading={customersRequests.customersPost.loading}
          errors={customersRequests.customersPost.errors}
          submitForm={this.handleSubmitCustomerAddForm}
        />
        <CustomerChangeScreen
          isVisible={isVisibleChangeForm}
          handleClose={this.toggleCustomerChangeform}
          isLoading={customersRequests.customersPut.loading}
          errors={customersRequests.customersPut.errors}
          submitForm={this.handleSubmitCustomerChangeForm}
          activeCustomer={activeCustomer}
        />
        <CustomerDeleteScreen
          isVisible={isVisibleDeleteForm}
          handleClose={this.toggleCustomerDeleteForm}
          isLoading={customersRequests.customersDelete.loading}
          errors={customersRequests.customersDelete.errors}
          name={activeCustomer ? activeCustomer.name : null}
          handleSubmit={this.handleSubmitCustomerDeleteForm}
        />
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(CustomersScreen);