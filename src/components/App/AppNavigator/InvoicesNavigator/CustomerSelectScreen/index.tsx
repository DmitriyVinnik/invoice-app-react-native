import React from 'react';
import { Picker, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from '../../../../../redux/customers/AC';
import RegularText from '../../../../../shared/components/RegularText';
import style from './style';

import { RootState } from '../../../../../redux/store';
import { Dispatch } from 'redux';
import { CustomersState } from '../../../../../redux/customers/states';
import { CustomersRequestState } from '../../../../../redux/request/nested-states/customers/states';

interface StateProps {
  customers: CustomersState;
  customersRequests: CustomersRequestState;
}

interface DispatchProps {
  loadCustomers(): void;
  selectActiveCustomer(_id: number): void;
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
    selectActiveCustomer: (_id) => {
      dispatch(Actions.selectCustomer(_id));
    },
  }
);

type Props = StateProps & DispatchProps;

class CustomerSelectElement extends React.Component<Props> {
  public componentDidMount() {
    this.props.loadCustomers();
  }

  public handleChange = (itemValue: number): void => {
    const {selectActiveCustomer} = this.props;
    selectActiveCustomer(itemValue);
  }

  public render() {
    const {customers, customersRequests} = this.props;
    const pickerItems = customers.data.map(customer => (
      <Picker.Item
        label={customer.name}
        value={customer._id}
        key={customer._id}
      />
    ));

    return (
      <View style={style.container}>
        <RegularText>Select customer, please:</RegularText>
        <View style={style.pickerWraper}>
          {customersRequests.customersGet.loading && <ActivityIndicator/>}
          <Picker
            selectedValue={customers.activeCustomerId ? customers.activeCustomerId : 'none'}
            style={style.picker}
            onValueChange={this.handleChange}
          >
            <Picker.Item
              label='None'
              value={null}
              key='None'
            />
            {pickerItems}
          </Picker>
        </View>
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
(CustomerSelectElement);
