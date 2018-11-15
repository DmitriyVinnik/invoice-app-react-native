import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from '../../../../../../redux/customers/AC';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

import { Dispatch } from 'redux';
import { Customer as CustomerInterface } from '../../../../../../redux/customers/states';
import { NavigationInjectedProps } from 'react-navigation';

type OwnProps = CustomerInterface;

interface DispatchProps {
  selectActiveCustomer(_id: number): void;
}

type Props = DispatchProps & OwnProps & NavigationInjectedProps;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
  {
    selectActiveCustomer: (_id) => {
      dispatch(Actions.selectCustomer(_id));
    },
  }
);

class Customer extends React.Component<Props> {
  render() {
    const {
      _id, name, address, phone, selectActiveCustomer,
    } = this.props;
    const onClickCustomer = (): void => {
      selectActiveCustomer(_id);

      const customer: CustomerInterface = {
        _id,
        name,
        address,
        phone,
      };

      this.props.navigation.navigate('CustomerDetailScreen', {
        customer,
      });

    };

    return (
      <TouchableOpacity
        style={style.container}
        onPress={onClickCustomer}
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

export default connect<DispatchProps>(
  null, mapDispatchToProps,
)(Customer);
