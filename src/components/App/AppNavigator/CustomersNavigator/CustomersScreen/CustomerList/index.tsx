import React, { Component } from 'react';
import { View, Text, FlatList, ListRenderItem } from 'react-native';
import Customer from '../Customer';

import { Customer as CustomerInterface } from '../../../../../../redux/customers/states';
import { RequestNestedState } from '../../../../../../redux/request/nested-states/customers/states';

export interface OwnProps {
  customersData: CustomerInterface[],
  customersRequest: RequestNestedState;
  loadCustomers(): void,
}

export default class CustomerList extends Component<OwnProps> {

  public componentDidMount() {
    const {loadCustomers} = this.props;

    loadCustomers();
    console.log('-------------mount list')
    fetch('http://localhost:8000/api/customers/')
      .then((response) => response.json())
      .then((responseJson) => console.log('--------loaded',responseJson))
  }

  private keyExtractor = (item: CustomerInterface) => `${item.id}`;

  private renderItem: ListRenderItem<CustomerInterface> = ({item}) => (
    <Customer
      id={item.id}
      name={item.name}
      address={item.address}
      phone={item.phone}
    />
  );

  public render() {
    const {customersRequest: {errors, loading, loaded}, customersData} = this.props;

    if (errors) {
      return (
        <View>
          <Text>Error: {errors}</Text>
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
          <Text>Something went wrong! Customers have not loaded, try reloading the page</Text>
        </View>
      )
    }

    return (
      <FlatList<CustomerInterface>
        data={customersData}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    )
  }
}