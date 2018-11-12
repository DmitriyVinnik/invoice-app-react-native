import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

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
      style={
        isProductActive ?
          [style.container, style.active] :
          style.container
      }
      onPress={!isProductActive ? onClickProduct : onReClickProduct}
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

export default connect<StateProps, DispatchProps>(
  mapStateToProps, mapDispatchToProps,
)(Product);
