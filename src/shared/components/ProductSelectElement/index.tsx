import React from 'react';
import { Picker, View, Text } from 'react-native';
import RegularText from '../../../shared/components/RegularText';
import style from './style';

import { WrappedFieldProps } from 'redux-form';
import { ProductsState } from '../../../redux/products/states';

interface OwnProps {
  products: ProductsState;
}

type Props = OwnProps & WrappedFieldProps;

const ProductSelectElement: React.SFC<Props> = (props: Props) => {
  const {
    input, products, meta: {touched, error},
  } = props;
  const handleChange = (itemValue: number) => {
    input.onChange(itemValue);
  };
  const pickerItems = products.data.map(product => (
    <Picker.Item
      label={`${product.name} - price ${product.price}`}
      value={product._id}
      key={product._id}
    />
  ));

  return (
    <View style={style.container}>
      <View>
        <View>
          <RegularText>Product:</RegularText>
        </View>
        {touched && (error && <Text style={style.errorText}>{error}</Text>)}
      </View>
      <Picker
        selectedValue={input.value}
        style={style.picker}
        onValueChange={handleChange}
      >
        <Picker.Item
          label='None'
          value={null}
          key='None'
        />
        {pickerItems}
      </Picker>
    </View>
  );

};

export default ProductSelectElement;
