import React from "react";
import {connect} from 'react-redux';
import CustomerList from './CustomerList';

import { CustomersState } from "../../../../../redux/customers/states";
import { CustomersRequestState } from "../../../../../redux/request/nested-states/customers/states";
import { RootState } from "../../../../../redux/store";
import { Dispatch } from "redux";

import { Actions } from "../../../../../redux/customers/AC";

interface StateProps {
  customers: CustomersState,
  customersRequests: CustomersRequestState,
}

interface DispatchProps {
  loadCustomers(): void,
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
  }
);

type Props = StateProps & DispatchProps;

class CustomersScreen extends React.Component<Props> {

  render() {
    const {customers, customersRequests, loadCustomers} = this.props;

    return (
      <CustomerList
        customersRequest={customersRequests.customersGet}
        customersData={customers.data}
        loadCustomers={loadCustomers}
      />
    );
  }

}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(CustomersScreen);