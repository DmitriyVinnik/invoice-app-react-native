import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from '../../../../../../redux/customers/AC';

import { Dispatch } from 'redux';
import { Customer as CustomerInterface } from '../../../../../../redux/customers/states';
import { RootState } from '../../../../../../redux/store';

type OwnProps = CustomerInterface

interface StateProps {
  activeCustomerId: number | null,
  customersData: CustomerInterface[],
}

interface DispatchProps {
  selectActiveCustomer(data: CustomerInterface[], _id: number): void,
  resetSelectionActiveCustomer(): void,
}

type Props = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state: RootState): StateProps => ({
  activeCustomerId: state.customers.activeCustomerId,
  customersData: state.customers.data,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
  {
    selectActiveCustomer: (data, _id) => {
      dispatch(Actions.selectCustomer(data, _id));
    },
    resetSelectionActiveCustomer: () => {
      dispatch(Actions.resetSelectionCustomer());
    },
  }
);

class Customer extends React.Component<Props> {
  render() {
    const {
      _id, name, address, phone, activeCustomerId, customersData,
      resetSelectionActiveCustomer, selectActiveCustomer,
    } = this.props;
    const onClickCustomer = (): void => {
      selectActiveCustomer(customersData, _id);
    };
    const isCustomerActive = activeCustomerId === _id;
    const onReClickCustomer = (): void => {
      resetSelectionActiveCustomer();
    };

    return (
      <TouchableOpacity
        onPress={!isCustomerActive ? onClickCustomer : onReClickCustomer}
      >
        <View style={isCustomerActive && style.active}>
          <View>
            <Text>Name:
              <Text> {name}</Text>
            </Text>
            <Text>
              _id:
              <Text> {_id}</Text>
            </Text>
          </View>
          <View>
            <Text>
              Address:
              <Text> {address}</Text>
            </Text>
          </View>
          <View>
            <Text>
              Phone:
              <Text> {phone}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps, mapDispatchToProps
)(Customer)

const style = StyleSheet.create({
  active: {
    backgroundColor: 'red'
  },
});