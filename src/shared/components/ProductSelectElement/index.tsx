import React from 'react';
import { Picker, View, Text } from 'react-native';
import style from './style';

import { WrappedFieldProps } from 'redux-form';
import { ProductsState } from '../../../redux/products/states';

interface OwnProps {
  products: ProductsState;
  _id: string;
  label: string;
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
      label={`id: ${product._id}, ${product.name} - price ${product.price}`}
      value={product._id}
      key={product._id}
    />
  ));

  return (
    <View style={style.container}>
      <Picker
        selectedValue={products.activeProductId ? products.activeProductId : 'none'}
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
      {touched && (error && <Text style={style.errorText}>{error}</Text>)}
    </View>
  );

};

export default ProductSelectElement;
