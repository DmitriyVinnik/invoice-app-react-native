import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

import { Customer as CustomerInterface } from '../../../../../../redux/customers/states';

type OwnProps = CustomerInterface;

type Props = OwnProps & NavigationInjectedProps;

class Customer extends React.Component<Props> {
  render() {
    const {
      _id, name, address, phone,
    } = this.props;
    const onClickCustomer = (): void => {
      const customer: CustomerInterface = {
        _id,
        name,
        address,
        phone,
      };

      this.props.navigation.navigate('CustomerDetail', {
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

export default withNavigation(Customer);
