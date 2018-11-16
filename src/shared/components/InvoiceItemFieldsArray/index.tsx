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
      <View style={style.headerWraper}>
        <RegularText>
          <Text style={style.textTitle}>Invoice Items (II): </Text>
        </RegularText>
      </View>
      <View style={style.buttonAddWraper}>
        <Icon.Button
          name='plus'
          backgroundColor='#5d0756'
          color='#fff'
          size={20}
          onPress={handleAddButtonClick}
        >
          <RegularText>
            <Text style={style.buttonAddTitle}>Add new invoice item</Text>
          </RegularText>
        </Icon.Button>
      </View>
      <ScrollView contentContainerStyle={style.invoiceItemsList}>
        {fields.map((productItem, index) => {
          const handleRemoveButtonClick = () => fields.remove(index);

          return (
            <View
              key={index}
              style={style.invoiceItemWraper}
            >
              <View style={style.productWraper}>
                <Field
                  name={`${productItem}.product_id`}
                  component={ProductSelectElement}
                  products={products}
                />
              </View>
              <View style={style.quantityWraper}>
                <Field
                  name={`${productItem}.quantity`}
                  component={FormField}
                  keyboard='numeric'
                  labelText='Quantity: '
                />
              </View>
              <View style={style.buttonRemoveWraper}>
                <TouchableOpacity
                  onPress={handleRemoveButtonClick}
                >
                  <View>
                    <Icon
                      name='trash'
                      color='#5d0756'
                      size={25}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        {
          error &&
          <RegularText>
              <Text style={style.errorText}>{error}</Text>
          </RegularText>
        }
      </ScrollView>
    </View>
  );
};

export default InvoiceItemFieldsArray;
