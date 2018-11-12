import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import Customer from '../Customer';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

import { Customer as CustomerInterface } from '../../../../../../redux/customers/states';
import { RequestNestedState } from '../../../../../../redux/request/nested-states/customers/states';
import ErrorRequestView from '../../../../../../shared/components/ErrorRequestView';

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
    const {customersRequest: {errors, loading, loaded}, customersData} = this.props;

    if (errors) {
      return (
        <View>
          <ErrorRequestView errors={errors}/>
        </View>
      );
    } else if (loading) {
      return (
        <View style={style.loader}>
          <RegularText>Wait a second, loading...</RegularText>
          <ActivityIndicator/>
        </View>
      );
    } else if (!loaded) {
      return (
        <View>
          <RegularText>Something went wrong! Customers have not loaded, try reloading app</RegularText>
        </View>
      );
    }

    return (
      <FlatList
        style={style.list}
        data={customersData}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}
