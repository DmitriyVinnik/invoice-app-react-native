import { createStackNavigator } from 'react-navigation';
import ProductsScreen from './ProductsScreen';
import HeaderServise from '../../../../shared/services/header.service';

export default createStackNavigator({
  ProductsScreen: {
    screen: ProductsScreen,
    navigationOptions: HeaderServise.initNavOpt('Products'),
  },
});
