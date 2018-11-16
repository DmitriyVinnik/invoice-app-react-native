import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import Product from '../Product';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

import { Product as ProductInterface } from '../../../../../../redux/products/states';
import { RequestNestedState } from '../../../../../../redux/request/nested-states/products/states';
import ToastRequest from '../../../../../../shared/components/ToastRequest/index';

export interface OwnProps {
  productsData: ProductInterface[];
  productsRequest: RequestNestedState;
  loadProducts(): void;
}

export default class ProductList extends Component<OwnProps> {

  public componentDidMount() {
    const {loadProducts} = this.props;

    loadProducts();
  }

  private keyExtractor = (item: ProductInterface) => `${item._id}`;

  private renderItem: ListRenderItem<ProductInterface> = ({item}) => (
    <Product
      _id={item._id}
      name={item.name}
      price={item.price}
    />
  )

  public render() {
    const {productsRequest: {loading}, productsData} = this.props;

    if (loading) {
      return (
        <View style={style.loader}>
          <RegularText>Wait a second, loading...</RegularText>
          <ActivityIndicator
            color='#5d0756'
          />
        </View>
      );
    }

    return (
      <View>
        <ToastRequest/>
        <FlatList
          style={style.list}
          data={productsData}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
