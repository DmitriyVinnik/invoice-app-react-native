import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import InvoiceItemsList from '../InvoiceItemsList';
import RegularText from '../../../../../../shared/components/RegularText';
import style from './style';

import { Actions } from '../../../../../../redux/invoices/AC';
import * as invoiceItemsActions from '../../../../../../redux/invoiceItems/AC';

import { Dispatch } from 'redux';
import { Invoice as InvoiceInterface } from '../../../../../../redux/invoices/states';
import { Product as ProductInterface } from '../../../../../../redux/products/states';
import { RootState } from '../../../../../../redux/store';
import { InvoiceItemsState } from '../../../../../../redux/invoiceItems/states';
import { InvoiceItemsRequestState } from '../../../../../../redux/request/nested-states/invoiceItems/states';

type OwnProps = InvoiceInterface;

interface StateProps {
  activeInvoiceId: number | null;
  invoicesData: InvoiceInterface[];
  productsData: ProductInterface[];
  invoiceItems: InvoiceItemsState;
  invoiceItemsRequests: InvoiceItemsRequestState;
}

interface DispatchProps {
  selectActiveInvoice(data: InvoiceInterface[], _id: number): void;
  resetSelectionActiveInvoice(): void;
  loadInvoiceItems(invoice_id: number): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  activeInvoiceId: state.invoices.activeInvoiceId,
  invoicesData: state.invoices.data,
  productsData: state.products.data,
  invoiceItems: state.invoiceItems,
  invoiceItemsRequests: state.request.invoiceItems,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions | invoiceItemsActions.Actions>): DispatchProps => (
  {
    selectActiveInvoice: (data, _id) => {
      dispatch(Actions.selectInvoice(data, _id));
    },
    resetSelectionActiveInvoice: () => {
      dispatch(Actions.resetSelectionInvoice());
    },
    loadInvoiceItems: (invoice_id) => {
      dispatch(invoiceItemsActions.Actions.loadAllInvoiceItems(invoice_id));
    },
  }
);

type Props = StateProps & DispatchProps & OwnProps;

const Invoice: React.SFC<Props> = (props: Props) => {
  const {
    _id, discount, total, activeInvoiceId, invoicesData,
    invoiceItems, invoiceItemsRequests, productsData,
    resetSelectionActiveInvoice, selectActiveInvoice, loadInvoiceItems,
  } = props;
  const onClickInvoice = (): void => {
    selectActiveInvoice(invoicesData, _id);
  };
  const isInvoiceActive = activeInvoiceId === _id;
  const onReClickInvoice = (): void => {
    resetSelectionActiveInvoice();
  };

  return (
    <TouchableOpacity
      style={
        isInvoiceActive ?
          [style.container, style.active] :
          style.container
      }
      onPress={!isInvoiceActive ? onClickInvoice : onReClickInvoice}
    >
      <View>
        <RegularText>
          Invoice id:
          <Text style={style.text}> {_id}</Text>
        </RegularText>
        <RegularText>
          Discount:
          <Text style={style.text}> {discount}</Text>
        </RegularText>
        <RegularText>
          Total:
          <Text style={style.text}> {total}</Text>
        </RegularText>
      </View>
      {
        isInvoiceActive &&
        <View>
            <View style={style.headerWraper}>
                <RegularText>
                    <Text style={style.text}>Invoice items: </Text>
                </RegularText>
            </View>
            <InvoiceItemsList
                invoiceItemsRequest={invoiceItemsRequests.invoiceItemsGet}
                invoiceItemsData={invoiceItems.data}
                products={productsData}
                activeInvoiceId={activeInvoiceId}
                loadInvoiceItems={loadInvoiceItems}
            />
        </View>
      }
    </TouchableOpacity>
  );
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Invoice);