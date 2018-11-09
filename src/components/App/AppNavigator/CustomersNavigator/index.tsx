// import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CustomersScreen from './CustomersScreen';

export default createStackNavigator({
  CustomersScreen: {
    screen: CustomersScreen,
    navigationOptions: {
      title: 'Customers',
    },
  },
});
