import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RegularText from '../../../../../../shared/components/RegularText';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import style from './style';

import { Product as ProductInterface } from '../../../../../../redux/products/states';

type OwnProps = ProductInterface;

type Props = OwnProps & NavigationInjectedProps;

const Product: React.SFC<Props> = (props: Props) => {
  const {_id, name, price} = props;
  const onClickProduct = (): void => {
    const product: ProductInterface = {
      _id,
      name,
      price,
    };

    props.navigation.navigate('ProductDetail', {
      product,
    });
  };

  return (
    <TouchableOpacity
      style={style.container}
      onPress={onClickProduct}
    >
      <View>
        <RegularText>
          Name:
          <Text style={style.text}> {name}</Text>
        </RegularText>
        <RegularText>
          Price:
          <Text style={style.text}> {price}</Text>
        </RegularText>
        <RegularText>
          id:
          <Text style={style.text}> {_id}</Text>
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(Product);
