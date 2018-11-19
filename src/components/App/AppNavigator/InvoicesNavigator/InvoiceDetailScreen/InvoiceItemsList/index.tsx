import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import InvoiceItem from '../InvoiceItem';
import RegularText from '../../../../../../shared/components/RegularText';
import ToastRequest from '../../../../../../shared/components/ToastRequest/index';
import style from './style';

import { InvoiceItem as InvoiceItemInterface } from '../../../../../../redux/invoiceItems/states';
import { Product as ProductInterface } from '../../../../../../redux/products/states';
import { RequestNestedState } from '../../../../../../redux/request/nested-states/invoiceItems/states';

export interface OwnProps {
  invoiceItemsData: InvoiceItemInterface[];
  invoiceItemsRequest: RequestNestedState;
  products: ProductInterface[];
  activeInvoiceId: number | null;
  loadInvoiceItems(invoice_id: number): void;
}

export default class InvoiceItemsList extends Component<OwnProps> {

  public componentDidMount() {
    const {activeInvoiceId, loadInvoiceItems} = this.props;

    if (activeInvoiceId) {
      loadInvoiceItems(activeInvoiceId);
    }
  }

  private keyExtractor = (item: InvoiceItemInterface) => `${item._id}`;

  private renderItem: ListRenderItem<InvoiceItemInterface> = ({item}) => {
    const {products} = this.props;
    const product = products.find((prod) => prod._id === item.product_id);

    return (
      <InvoiceItem
        _id={item._id}
        productName={product && product.name}
        quantity={item.quantity}
      />
    );
  }

  public render() {
    const {
      invoiceItemsRequest: {loading}, invoiceItemsData, activeInvoiceId,
    } = this.props;
    const filteredInvoiceItems = invoiceItemsData.filter(
      (invoiceItem) => invoiceItem.invoice_id === activeInvoiceId,
    );
    // console.log(invoiceItemsData)
    if (loading) {
      return (
        <View style={style.loader}>
          <RegularText>Wait a second, loading...</RegularText>
          <ActivityIndicator
            color='#5d0756'
            style={style.indicator}
          />
        </View>
      );
    }

    return (
      <View>
        <ToastRequest/>
        <FlatList
          style={style.list}
          data={filteredInvoiceItems}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
