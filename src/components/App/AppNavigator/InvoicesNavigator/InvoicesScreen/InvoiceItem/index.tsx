import React from 'react';
import { View, Text } from 'react-native';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

import { InvoiceItem as InvoiceItemInterface } from '../../../../../../redux/invoiceItems/states';

type OwnProps = InvoiceItemInterface;

const InvoiceItem: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    _id, quantity, invoice_id, product_id,
  } = props;

  return (
    <View style={style.container}>
      <RegularText>
        InvoiceItem _id:
        <Text style={style.text}> {_id}</Text>
      </RegularText>
      <RegularText>
        Invoice _id:
        <Text style={style.text}> {invoice_id}</Text>
      </RegularText>
      <RegularText>
        Product _id:
        <Text style={style.text}> {product_id}</Text>
      </RegularText>
      <RegularText>
        Quantity:
        <Text style={style.text}> {quantity}</Text>
      </RegularText>
    </View>
  );
};

export default InvoiceItem;