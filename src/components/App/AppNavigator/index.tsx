import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import CustomersNavigator from './CustomersNavigator';
import ProductsNavigator from './ProductsNavigator';

const Navigator = createBottomTabNavigator({
  Customers: CustomersNavigator,
  Products: ProductsNavigator,
}, {
  initialRouteName: 'Customers',
});

export default class AppNavigator extends React.Component {
  render() {
    return <Navigator />
  }
}