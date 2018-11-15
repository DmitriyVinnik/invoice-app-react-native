import React from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import CustomerList from './CustomerList';
import CustomerAddScreen from '../CustomerAddScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
}

class CustomersScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisibleAddForm: false,
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

  public handleSubmitCustomerAddForm = (values: CustomerDataForServer): void => {
    this.props.resetToast();
    this.props.submitAddForm(values);
  }

  public handleSubmitCustomerDeleteForm = (evt: GestureResponderEvent): void => {
    const {customers: {activeCustomerId}, submitDeleteForm} = this.props;

    evt.preventDefault();
    if (activeCustomerId) {
      this.props.resetToast();
      submitDeleteForm(activeCustomerId);
    }
  }

  render() {
    const {customers, customersRequests, loadCustomers} = this.props;
    const {isVisibleAddForm} = this.state;

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
        </View>
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(CustomersScreen);