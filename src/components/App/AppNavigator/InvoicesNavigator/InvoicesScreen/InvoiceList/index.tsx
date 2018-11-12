import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import Invoice from '../Invoice';
import RegularText from '../../../../../../shared/components/RegularText';
import ErrorRequestView from '../../../../../../shared/components/ErrorRequestView';
import style from './style';

import { Invoice as InvoiceInterface } from '../../../../../../redux/invoices/states';
import { RequestNestedState } from '../../../../../../redux/request/nested-states/invoices/states';

export interface OwnProps {
  invoicesData: InvoiceInterface[];
  invoicesRequest: RequestNestedState;
  activeCustomerId: number | null;
  loadInvoices(): void;
  loadProducts(): void;
}

export default class InvoiceList extends Component<OwnProps> {

  public componentDidMount() {
    this.props.loadInvoices();
    this.props.loadProducts();
  }

  private keyExtractor = (item: InvoiceInterface) => `${item._id}`;

  private renderItem: ListRenderItem<InvoiceInterface> = ({item}) => (
    <Invoice
      _id={item._id}
      customer_id={item.customer_id}
      discount={item.discount}
      total={item.total}
    />
  )

  public render() {
    const {invoicesRequest: {errors, loading, loaded}, invoicesData, activeCustomerId} = this.props;
    const filteredInvoices = invoicesData.filter(
      (invoice) => invoice.customer_id === activeCustomerId,
    );

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
        data={filteredInvoices}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}
