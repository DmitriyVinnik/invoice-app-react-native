import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Customer from '../Customer';
import Icon from 'react-native-vector-icons/FontAwesome';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

import { Customer as CustomerInterface } from '../../../../../../redux/customers/states';
import { RequestNestedState } from '../../../../../../redux/request/nested-states/customers/states';

export interface OwnProps {
  customersData: CustomerInterface[];
  customersRequest: RequestNestedState;
  loadCustomers(): void;
  deleteCustomer(_id: number): void;
}

export default class CustomerList extends Component<OwnProps> {

  public componentDidMount() {
    const {loadCustomers} = this.props;

    loadCustomers();
  }

  private keyExtractor = (item: CustomerInterface) => `${item._id}`;

  private renderItem: ListRenderItem<CustomerInterface> = ({item}) => {
    const trashIcon = (
      <View style={style.trashIcon}>
        <Icon
          name='trash'
          color='#5d0756'
          size={50}
        />
      </View>
    );

    const swipeoutBtns = [
      {
        component: trashIcon,
        backgroundColor: 'transparent',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => {
          this.props.deleteCustomer(item._id);
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
        <Customer
          _id={item._id}
          name={item.name}
          address={item.address}
          phone={item.phone}
        />
      </Swipeout>
    );
  }

  public render() {
    const {customersRequest: {loading}, customersData} = this.props;

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
          data={customersData}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
