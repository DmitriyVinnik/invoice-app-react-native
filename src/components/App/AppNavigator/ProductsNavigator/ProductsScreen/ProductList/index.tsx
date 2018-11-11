import React, { Component } from 'react';
import { View, Text, FlatList, ListRenderItem } from 'react-native';
import Product from '../Product';

import { Product as ProductInterface } from '../../../../../../redux/products/states';
import { RequestNestedState } from '../../../../../../redux/request/nested-states/products/states';
import ErrorRequestView from '../../../../../../shared/components/ErrorRequestView';

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
    const {productsRequest: {errors, loading, loaded}, productsData} = this.props;

    if (errors) {
      return (
        <View>
          <ErrorRequestView errors={errors}/>
        </View>
      );
    } else if (loading) {
      return (
        <View>
          <Text>Wait a second, loading...</Text>
        </View>
      );
    } else if (!loaded) {
      return (
        <View>
          <Text>Something went wrong! Products have not loaded, try reloading the page</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={productsData}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}
