import { createStackNavigator } from 'react-navigation';
import InvoicesScreen from './InvoicesScreen';
import InvoiceDetailScreen from './InvoiceDetailScreen';
import HeaderServise from '../../../../shared/services/header.service';

export default createStackNavigator({
    Invoices: InvoicesScreen,
    InvoiceDetail: InvoiceDetailScreen,
  },
  {
    initialRouteName: 'Invoices',
    navigationOptions: HeaderServise.initNavOpt('Invoices'),
  });
