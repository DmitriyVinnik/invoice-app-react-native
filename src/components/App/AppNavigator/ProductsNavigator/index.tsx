import { createStackNavigator } from 'react-navigation';
import ProductsScreen from './ProductsScreen';
import ProductDetailScreen from './ProductDetailScreen';
import HeaderServise from '../../../../shared/services/header.service';

export default createStackNavigator({
    Products: ProductsScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    initialRouteName: 'Products',
    navigationOptions: HeaderServise.initNavOpt('Products'),
  },
);
