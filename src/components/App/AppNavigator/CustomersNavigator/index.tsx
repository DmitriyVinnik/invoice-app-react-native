import { createStackNavigator } from 'react-navigation';
import CustomersScreen from './CustomersScreen';
import HeaderServise from '../../../../shared/services/header.service';

export default createStackNavigator({
  CustomersScreen: {
    screen: CustomersScreen,
    navigationOptions: HeaderServise.initNavOpt('Customers'),
  },
});
