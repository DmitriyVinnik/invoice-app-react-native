import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import CustomersNavigator from './CustomersNavigator';
import ProductsNavigator from './ProductsNavigator';
import InvoicesNavigator from './InvoicesNavigator';

const Navigator = createBottomTabNavigator({
  Invoices: InvoicesNavigator,
  Customers: CustomersNavigator,
  Products: ProductsNavigator,
}, {
  initialRouteName: 'Invoices',
  tabBarOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#5d0756',
    inactiveTintColor: 'gray',
    tabStyle: {
      height: 30,
    },
    labelStyle: {
      fontFamily: 'Arial',
      fontSize: 16,
      fontWeight: '700',
    },
    style: {
      height: 30,
    },
  },
});

export default class AppNavigator extends React.Component {
  render() {
    return <Navigator/>;
  }
}