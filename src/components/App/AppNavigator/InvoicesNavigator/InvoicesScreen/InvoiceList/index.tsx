import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Invoice from '../Invoice';
import Icon from 'react-native-vector-icons/FontAwesome';
import RegularText from '../../../../../../shared/components/RegularText';
import ToastRequest from '../../../../../../shared/components/ToastRequest';
import style from './style';

import { Invoice as InvoiceInterface } from '../../../../../../redux/invoices/states';
import { RequestNestedState } from '../../../../../../redux/request/nested-states/invoices/states';

export interface OwnProps {
  invoicesData: InvoiceInterface[];
  invoicesRequest: RequestNestedState;
  activeCustomerId: number | null;
  loadInvoices(): void;
  loadProducts(): void;
  deleteInvoice(_id: number): void;
}

export default class InvoiceList extends Component<OwnProps> {

  public componentDidMount() {
    this.props.loadInvoices();
    this.props.loadProducts();
  }

  private keyExtractor = (item: InvoiceInterface) => `${item._id}`;

  private renderItem: ListRenderItem<InvoiceInterface> = ({item}) => {
    const trashIcon = (
      <View style={style.trashIcon}>
        <Icon
          name='trash'
          color='#5d0756'
          size={35}
        />
      </View>
    );

    const swipeoutBtns = [
      {
        component: trashIcon,
        backgroundColor: 'transparent',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => {
          this.props.deleteInvoice(item._id);
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
        <Invoice
          _id={item._id}
          customer_id={item.customer_id}
          discount={item.discount}
          total={item.total}
        />
      </Swipeout>
    );
  }

  public render() {
    const {invoicesRequest: {loading}, invoicesData, activeCustomerId} = this.props;
    const filteredInvoices = invoicesData.filter(
      (invoice) => invoice.customer_id === activeCustomerId,
    );

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
          data={filteredInvoices}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
