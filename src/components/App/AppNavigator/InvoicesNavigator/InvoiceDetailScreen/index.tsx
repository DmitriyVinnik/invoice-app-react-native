import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash-es';

import InvoiceChangeScreen from '../InvoiceChangeScreen';
import InvoiceItemsList from './InvoiceItemsList';
import RegularText from '../../../../../shared/components/RegularText';
import EditButton from '../../../../../shared/components/EditButton';
import style from './style';

import { InvoicesRequestState } from '../../../../../redux/request/nested-states/invoices/states';
import { RootState } from '../../../../../redux/store';
import { Dispatch } from 'redux';
import { Invoice, InvoicesState } from '../../../../../redux/invoices/states';
import {
  NavigationInjectedProps,
  NavigationScreenConfig,
  NavigationStackScreenOptions,
} from 'react-navigation';
import { Product as ProductInterface } from '../../../../../redux/products/states';
import { InvoiceItemsState } from '../../../../../redux/invoiceItems/states';
import { InvoiceItemsRequestState } from '../../../../../redux/request/nested-states/invoiceItems/states';
import { InvoiceNavigationParams } from '../InvoicesScreen/Invoice';

import { Actions } from '../../../../../redux/invoices/AC';
import { Actions as toastActions } from '../../../../../redux/toast/AC';
import * as invoiceItemsActions from '../../../../../redux/invoiceItems/AC';

interface StateProps {
  invoicesRequests: InvoicesRequestState;
  productsData: ProductInterface[];
  invoices: InvoicesState;
  invoiceItems: InvoiceItemsState;
  invoiceItemsRequests: InvoiceItemsRequestState;
}

interface DispatchProps {
  selectActiveInvoice(_id: number): void;
  resetSelectionActiveInvoice(): void;
  resetToast(): void;
  loadInvoiceItems(invoice_id: number): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  invoicesRequests: state.request.invoices,
  productsData: state.products.data,
  invoices: state.invoices,
  invoiceItems: state.invoiceItems,
  invoiceItemsRequests: state.request.invoiceItems,
});

const mapDispatchToProps = (
  dispatch: Dispatch<Actions | toastActions | invoiceItemsActions.Actions>,
): DispatchProps => (
  {
    selectActiveInvoice: (_id) => {
      dispatch(Actions.selectInvoice(_id));
    },
    resetSelectionActiveInvoice: () => {
      dispatch(Actions.resetSelectionInvoice());
    },
    resetToast: () => {
      dispatch(toastActions.hideToast());
    },
    loadInvoiceItems: (invoice_id) => {
      dispatch(invoiceItemsActions.Actions.loadAllInvoiceItems(invoice_id));
    },
  }
);

type Props = StateProps & DispatchProps & NavigationInjectedProps<InvoiceNavigationParams>;

interface State {
  isVisibleChangeForm: boolean;
}

class InvoiceDetailsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisibleChangeForm: false,
    };
  }

  static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = (
    {navigation},
  ) => {

    return {
      title: navigation.getParam('invoiceDetailTitle', 'Invoice'),
      headerTintColor: '#fff',
    };
  }

  public componentDidMount() {
    this.props.selectActiveInvoice(this.invoice._id);
  }

  public componentDidUpdate() {
    const {activeInvoiceId, data} = this.props.invoices;
    if (activeInvoiceId) {
      const activeInvoice: Invoice | undefined = data.find((invoice) => invoice._id === activeInvoiceId);

      if (activeInvoice && !isEqual(this.invoice, activeInvoice)) {
        this.invoice = {
          ...activeInvoice,
        };
      }
    }
  }

  public componentWillUnmount() {
    this.props.resetSelectionActiveInvoice();
  }

  private invoice: Invoice = this.props.navigation.getParam('invoice');

  public toggleInvoiceChangeform = (): void => {
    this.setState({
      isVisibleChangeForm: !this.state.isVisibleChangeForm,
    });

    if (this.state.isVisibleChangeForm) {
      this.props.resetToast();
    }
  }

  render() {
    const {
      invoicesRequests, invoiceItemsRequests, productsData, invoiceItems, loadInvoiceItems,
    } = this.props;
    const {isVisibleChangeForm} = this.state;

    return (
      <View style={style.container}>
        <View style={style.textContainer}>
          <RegularText>
            ID:
            <Text style={style.text}> {this.invoice._id}</Text>
          </RegularText>
          <RegularText>
            Customer id:
            <Text style={style.text}> {this.invoice.customer_id}</Text>
          </RegularText>
          <RegularText>
            Total:
            <Text style={style.text}> {this.invoice.total}</Text>
          </RegularText>
          <RegularText>
            Discount:
            <Text style={style.text}> {this.invoice.discount}</Text>
          </RegularText>
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
              activeInvoiceId={this.invoice._id}
              loadInvoiceItems={loadInvoiceItems}
            />
          </View>
        </View>
        <View style={style.editPanel}>
          <View>
            <EditButton
              onPress={this.toggleInvoiceChangeform}
            />
          </View>
          <InvoiceChangeScreen
            isVisible={isVisibleChangeForm}
            handleClose={this.toggleInvoiceChangeform}
            isLoading={invoicesRequests.invoicesPut.loading}
            activeInvoice={this.invoice}
          />
        </View>
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(InvoiceDetailsScreen);