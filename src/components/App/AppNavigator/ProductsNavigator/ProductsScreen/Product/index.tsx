import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from '../../../../../../redux/products/AC';

import { Dispatch } from 'redux';
import { Product as ProductInterface } from '../../../../../../redux/products/states';
import { RootState } from '../../../../../../redux/store';

type OwnProps = ProductInterface;

interface StateProps {
  activeProductId: number | null;
  productsData: ProductInterface[];
}

interface DispatchProps {
  selectActiveProduct(data: ProductInterface[], _id: number): void;
  resetSelectionActiveProduct(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  activeProductId: state.products.activeProductId,
  productsData: state.products.data,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
  {
    selectActiveProduct: (data, _id) => {
      dispatch(Actions.selectProduct(data, _id));
    },
    resetSelectionActiveProduct: () => {
      dispatch(Actions.resetSelectionProduct());
    },
  }
);

type Props = StateProps & DispatchProps & OwnProps;

const Product: React.SFC<Props> = (props: Props) => {
  const {
    _id, name, price, activeProductId, productsData,
    resetSelectionActiveProduct, selectActiveProduct,
  } = props;
  const onClickProduct = (): void => {
    selectActiveProduct(productsData, _id);
  };
  const isProductActive = activeProductId === _id;
  const onReClickProduct = (): void => {
    resetSelectionActiveProduct();
  };

  return (
    <TouchableOpacity
      onPress={!isProductActive ? onClickProduct : onReClickProduct}
    >
      <View style={isProductActive && style.active}>
        <Text>
          Name:
          <Text> {name}</Text>
        </Text>
        <Text>
          Price:
          <Text> {price}</Text>
        </Text>
        <Text>
          _id:
          <Text> {_id}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps, mapDispatchToProps,
)(Product);

const style = StyleSheet.create({
  active: {
    backgroundColor: 'red',
  },
});