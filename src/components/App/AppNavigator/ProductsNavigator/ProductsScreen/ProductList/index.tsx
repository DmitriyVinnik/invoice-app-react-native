import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Product from '../Product';
import Icon from 'react-native-vector-icons/FontAwesome';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

import { Product as ProductInterface } from '../../../../../../redux/products/states';
import { RequestNestedState } from '../../../../../../redux/request/nested-states/products/states';

export interface OwnProps {
  productsData: ProductInterface[];
  productsRequest: RequestNestedState;
  loadProducts(): void;
  deleteProduct(_id: number): void;
}

export default class ProductList extends Component<OwnProps> {

  public componentDidMount() {
    const {loadProducts} = this.props;

    loadProducts();
  }

  private keyExtractor = (item: ProductInterface) => `${item._id}`;

  private renderItem: ListRenderItem<ProductInterface> = ({item}) => {
    const trashIcon = (
      <View style={style.trashIcon}>
        <Icon
          name='trash'
          color='#5d0756'
          size={40}
        />
      </View>
    );

    const swipeoutBtns = [
      {
        component: trashIcon,
        backgroundColor: 'transparent',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => {
          this.props.deleteProduct(item._id);
        },
      },
    ];

    return (
      <Swipeout
        right={swipeoutBtns}
        buttonWidth={50}
        autoClose={true}
        backgroundColor='transparent'
      >
        <Product
          _id={item._id}
          name={item.name}
          price={item.price}
        />
      </Swipeout>
    );
  }

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
