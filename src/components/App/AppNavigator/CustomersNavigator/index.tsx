import { createStackNavigator } from 'react-navigation';
import CustomersScreen from './CustomersScreen';
import CustomerDetailScreen from './CustomerDetailScreen';
import HeaderServise from '../../../../shared/services/header.service';

export default createStackNavigator({
  Customers: CustomersScreen,
  CustomerDetail: CustomerDetailScreen,
},
  {
    initialRouteName: 'Customers',
    navigationOptions: HeaderServise.initNavOpt('Customers'),
  },
);

// Customers: {
//   screen: CustomersScreen,
//     navigationOptions: HeaderServise.initNavOpt('Customers'),
// },
// CustomerDetailScreen: {
//   screen: CustomerDetailScreen,
//     navigationOptions: HeaderServise.initNavOpt('CustomerDetail'),
// },
