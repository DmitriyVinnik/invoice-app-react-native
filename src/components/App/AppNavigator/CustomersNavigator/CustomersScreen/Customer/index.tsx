import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from '../../../../../../redux/customers/AC';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

import { Dispatch } from 'redux';
import { Customer as CustomerInterface } from '../../../../../../redux/customers/states';
import { RootState } from '../../../../../../redux/store';

type OwnProps = CustomerInterface;

interface StateProps {
  activeCustomerId: number | null;
  customersData: CustomerInterface[];
}

interface DispatchProps {
  selectActiveCustomer(_id: number): void;
  resetSelectionActiveCustomer(): void;
}

type Props = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state: RootState): StateProps => ({
  activeCustomerId: state.customers.activeCustomerId,
  customersData: state.customers.data,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
  {
    selectActiveCustomer: (_id) => {
      dispatch(Actions.selectCustomer(_id));
    },
    resetSelectionActiveCustomer: () => {
      dispatch(Actions.resetSelectionCustomer());
    },
  }
);

class Customer extends React.Component<Props> {
  render() {
    const {
      _id, name, address, phone, activeCustomerId, /*customersData,*/
      resetSelectionActiveCustomer, selectActiveCustomer,
    } = this.props;
    const onClickCustomer = (): void => {
      selectActiveCustomer(_id);
    };
    const isCustomerActive = activeCustomerId === _id;
    const onReClickCustomer = (): void => {
      resetSelectionActiveCustomer();
    };

    return (
      <TouchableOpacity
        style={
          isCustomerActive ?
            [style.container, style.active] :
            style.container
        }
        onPress={!isCustomerActive ? onClickCustomer : onReClickCustomer}
      >
        <View>
          <RegularText>
            Name:
            <Text style={style.text}> {name}</Text>
          </RegularText>
          <RegularText>
            id:
            <Text style={style.text}> {_id}</Text>
          </RegularText>
          <RegularText>
            Address:
            <Text style={style.text}> {address}</Text>
          </RegularText>
          <RegularText>
            Phone:
            <Text style={style.text}> {phone}</Text>
          </RegularText>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps, mapDispatchToProps,
)(Customer);
