import React from 'react';
import { View, Text } from 'react-native';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

interface OwnProps {
  _id: number;
  productName?: string;
  quantity: number;
}

const InvoiceItem: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    _id, quantity, productName,
  } = props;

  return (
    <View style={style.container}>
      <RegularText>
        InvoiceItem _id:
        <Text style={style.text}> {_id}</Text>
      </RegularText>
      {/*<RegularText>*/}
      {/*Invoice _id:*/}
      {/*<Text style={style.text}> {invoice_id}</Text>*/}
      {/*</RegularText>*/}
      <RegularText>
        Product:
        <Text style={style.text}> {productName}</Text>
      </RegularText>
      <RegularText>
        Quantity:
        <Text style={style.text}> {quantity}</Text>
      </RegularText>
    </View>
  );
};

export default InvoiceItem;