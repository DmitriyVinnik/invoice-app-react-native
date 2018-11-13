import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Field, WrappedFieldArrayProps, WrappedFieldProps } from 'redux-form';
import FormField from '../../../shared/components/FormField';
import ProductSelectElement from '../ProductSelectElement';
import RegularText from '../../../shared/components/RegularText';
import style from './style';

import { ProductsState } from '../../../redux/products/states';

export interface OwnProps {
  products: ProductsState;
}

type Props = OwnProps & WrappedFieldProps & WrappedFieldArrayProps<any>;

const InvoiceItemFieldsArray: React.SFC<Props> = (props: Props) => {
  const {fields, products, meta: {error}} = props;
  const handleAddButtonClick = () => fields.push({});

  return (
    <View style={style.container}>
      <RegularText>
        <Text style={style.textTitle}>Invoice Items (II): </Text>
      </RegularText>
      <View style={style.buttonAddWraper}>
        <TouchableOpacity
          onPress={handleAddButtonClick}
          style={style.buttonAdd}
        >
          <Text style={style.buttonAddTitle}>Add new invoice item</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={style.invoiceItemsList}>
        {fields.map((productItem, index) => {
          const handleRemoveButtonClick = () => fields.remove(index);

          return (
            <View
              key={index}
              style={style.invoiceItemWraper}
            >
              <View style={style.invoiceItemsCountWraper}>
                <RegularText>{`II №${index + 1}: `}</RegularText>
              </View>
              <View style={style.productWraper}>
                <Field
                  name={`${productItem}.product_id`}
                  component={ProductSelectElement}
                  products={products}
                />
              </View>
              <Field
                name={`${productItem}.quantity`}
                component={FormField}
                keyboard='numeric'
                labelText='Quantity: '
              />
              <View style={style.buttonRemoveWraper}>
                <TouchableOpacity
                  onPress={handleRemoveButtonClick}
                >
                  <View style={style.iconTrashWraper}>
                    <Icon name='trash' size={25}/>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        {error && <Text style={style.errorText}>{error}</Text>}
      </ScrollView>
    </View>
  );
};

export default InvoiceItemFieldsArray;
