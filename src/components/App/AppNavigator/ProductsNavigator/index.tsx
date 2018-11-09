// import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ProductsScreen from './ProductsScreen';

export default createStackNavigator({
  ProductsScreen: {
    screen: ProductsScreen,
    navigationOptions: {
      title: 'Products'
    }
  },
})
