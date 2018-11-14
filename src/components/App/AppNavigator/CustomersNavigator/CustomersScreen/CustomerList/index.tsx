import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import Customer from '../Customer';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

import { Customer as CustomerInterface } from '../../../../../../redux/customers/states';
import { RequestNestedState } from '../../../../../../redux/request/nested-states/customers/states';
import ToastRequest from '../../../../../../shared/components/ToastRequest/index';

export interface OwnProps {
  customersData: CustomerInterface[];
  customersRequest: RequestNestedState;
  loadCustomers(): void;
}

export default class CustomerList extends Component<OwnProps> {

  public componentDidMount() {
    const {loadCustomers} = this.props;

    loadCustomers();
  }

  private keyExtractor = (item: CustomerInterface) => `${item._id}`;

  private renderItem: ListRenderItem<CustomerInterface> = ({item}) => (
    <Customer
      _id={item._id}
      name={item.name}
      address={item.address}
      phone={item.phone}
    />
  )

  public render() {
    const {customersRequest: {loading}, customersData} = this.props;

    if (loading) {
      return (
        <View style={style.loader}>
          <RegularText>Wait a second, loading...</RegularText>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <View>
        <ToastRequest/>
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
