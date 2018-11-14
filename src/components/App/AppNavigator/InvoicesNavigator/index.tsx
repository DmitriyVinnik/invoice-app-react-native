import { createStackNavigator } from 'react-navigation';
import InvoicesScreen from '../InvoicesNavigator/InvoicesScreen';
import HeaderServise from '../../../../shared/services/header.service';

export default createStackNavigator({
  InvoicesScreen: {
    screen: InvoicesScreen,
    navigationOptions: HeaderServise.initNavOpt('Invoices'),
  },
});
