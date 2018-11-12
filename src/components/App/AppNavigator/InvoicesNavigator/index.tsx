import { createStackNavigator } from 'react-navigation';
// import InvoicesScreen from '../InvoicesNavigator/InvoicesScreen';
import CustomerSelectScreen from '../InvoicesNavigator/CustomerSelectScreen';

export default createStackNavigator({
  InvoicesScreen: {
    screen: CustomerSelectScreen,
    navigationOptions: {
      title: 'Invoices',
    },
  },
});
