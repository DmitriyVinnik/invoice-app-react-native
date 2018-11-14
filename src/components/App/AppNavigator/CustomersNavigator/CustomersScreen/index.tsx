import React from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import CustomerList from './CustomerList';
import EditPanel from '../../../../../shared/components/EditPanel/index';
import CustomerAddScreen from '../CustomerAddScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomerDeleteScreen from '../CustomerDeleteScreen';
import CustomerChangeScreen from '../CustomerChangeScreen';
import style from './style';

import { CustomerDataForServer, CustomersState } from '../../../../../redux/customers/states';
import { CustomersRequestState } from '../../../../../redux/request/nested-states/customers/states';
import { RootState } from '../../../../../redux/store';
import { Dispatch } from 'redux';

import { Actions } from '../../../../../redux/customers/AC';
import { destroy } from 'redux-form';
import { Actions as toastActions } from '../../../../../redux/toast/AC';

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
  resetToast(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  customers: state.customers,
  customersRequests: state.request.customers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions | toastActions>): DispatchProps => (
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
    resetToast: () => {
      dispatch(toastActions.hideToast());
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
      this.props.resetToast();
    }
  }

  public toggleCustomerChangeform = (): void => {
    this.setState({
      isVisibleChangeForm: !this.state.isVisibleChangeForm,
    });

    if (this.state.isVisibleChangeForm) {
      this.props.resetToast();
    }
  }

  public toggleCustomerDeleteForm = (): void => {
    this.setState({
      isVisibleDeleteForm: !this.state.isVisibleDeleteForm,
    });

    if (this.state.isVisibleDeleteForm) {
      this.props.resetToast();
    }
  }

  public handleSubmitCustomerAddForm = (values: CustomerDataForServer): void => {
    this.props.resetToast();
    this.props.submitAddForm(values);
  }

  public handleSubmitCustomerChangeForm = (values: CustomerDataForServer): void => {
    const {customers: {activeCustomerId}, submitChangeForm} = this.props;

    if (activeCustomerId) {
      this.props.resetToast();
      submitChangeForm(values, activeCustomerId);
    }
  }

  public handleSubmitCustomerDeleteForm = (evt: GestureResponderEvent): void => {
    const {customers: {activeCustomerId}, submitDeleteForm} = this.props;

    evt.preventDefault();
    if (activeCustomerId) {
      this.props.resetToast();
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
      <View style={style.container}>
        <View style={style.list}>
          <CustomerList
            customersRequest={customersRequests.customersGet}
            customersData={customers.data}
            loadCustomers={loadCustomers}
          />
        </View>
        <View style={style.editPanel}>
          <TouchableOpacity
            onPress={this.toggleCustomerAddForm}
            style={style.addButton}
          >
            <View>
              <Icon name='person-add' size={40} color='#fff'/>
            </View>
          </TouchableOpacity>
          {/*<EditPanel*/}
            {/*labelButton='customer'*/}
            {/*activeId={customers.activeCustomerId}*/}
            {/*onAddButtonClick={this.toggleCustomerAddForm}*/}
            {/*onChangeButtonClick={this.toggleCustomerChangeform}*/}
            {/*onDeleteButtonClick={this.toggleCustomerDeleteForm}*/}
          {/*/>*/}
          <CustomerAddScreen
            isVisible={isVisibleAddForm}
            handleClose={this.toggleCustomerAddForm}
            isLoading={customersRequests.customersPost.loading}
            submitForm={this.handleSubmitCustomerAddForm}
          />
          {/*<CustomerChangeScreen*/}
            {/*isVisible={isVisibleChangeForm}*/}
            {/*handleClose={this.toggleCustomerChangeform}*/}
            {/*isLoading={customersRequests.customersPut.loading}*/}
            {/*submitForm={this.handleSubmitCustomerChangeForm}*/}
            {/*activeCustomer={activeCustomer}*/}
          {/*/>*/}
          {/*<CustomerDeleteScreen*/}
            {/*isVisible={isVisibleDeleteForm}*/}
            {/*handleClose={this.toggleCustomerDeleteForm}*/}
            {/*isLoading={customersRequests.customersDelete.loading}*/}
            {/*name={activeCustomer ? activeCustomer.name : null}*/}
            {/*handleSubmit={this.handleSubmitCustomerDeleteForm}*/}
          {/*/>*/}
        </View>
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(CustomersScreen);