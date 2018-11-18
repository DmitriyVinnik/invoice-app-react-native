import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

import { Invoice as InvoiceInterface } from '../../../../../../redux/invoices/states';

type OwnProps = InvoiceInterface;

export interface InvoiceNavigationParams {
  invoice: InvoiceInterface;
  invoiceDetailTitle: number;
}

type Props = OwnProps & NavigationInjectedProps<InvoiceNavigationParams>;

const Invoice: React.SFC<Props> = (props: Props) => {
  const {
    _id, discount, total, customer_id, navigation,
  } = props;
  const onClickInvoice = (): void => {
    const invoice: InvoiceInterface = {
      _id,
      customer_id,
      discount,
      total,
    };
    const params: InvoiceNavigationParams = {
      invoice,
      invoiceDetailTitle: invoice._id,
    };

    navigation.navigate('InvoiceDetail', params);
  };

  return (
    <TouchableOpacity
      style={style.container}
      onPress={onClickInvoice}
    >
      <View>
        <RegularText>
          Invoice id:
          <Text style={style.text}> {_id}</Text>
        </RegularText>
        <RegularText>
          Discount:
          <Text style={style.text}> {discount}</Text>
        </RegularText>
        <RegularText>
          Total:
          <Text style={style.text}> {total}</Text>
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(Invoice);