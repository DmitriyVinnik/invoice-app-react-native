import { createStackNavigator } from 'react-navigation';
import InvoicesScreen from '../InvoicesNavigator/InvoicesScreen';
// import CustomerSelectScreen from '../InvoicesNavigator/CustomerSelectScreen';

export default createStackNavigator({
  InvoicesScreen: {
    screen: InvoicesScreen,
    navigationOptions: {
      title: 'Invoices',
    },
  },
});
