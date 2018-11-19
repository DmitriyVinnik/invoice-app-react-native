import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import InvoiceList from './InvoiceList';
import InvoiceAddForm from '../InvoiceAddScreen';
import CustomerSelectElement from '../CustomerSelectScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from './style';

import { Actions } from '../../../../../redux/invoices/AC';
import * as productsActions from '../../../../../redux/products/AC';
import { destroy } from 'redux-form';
import { Actions as toastActions } from '../../../../../redux/toast/AC';

import { Dispatch } from 'redux';
import { RootState } from '../../../../../redux/store';
import { InvoicesRequestState } from '../../../../../redux/request/nested-states/invoices/states';
import { InvoicesState } from '../../../../../redux/invoices/states';
import { CustomersState } from '../../../../../redux/customers/states';

interface StateProps {
  invoices: InvoicesState;
  invoicesRequests: InvoicesRequestState;
  customers: CustomersState;
}

interface DispatchProps {
  loadProducts(): void;
  loadInvoices(): void;
  submitDeleteForm(_id: number): void;
  destroyForm(form: string): void;
  resetToast(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  invoices: state.invoices,
  customers: state.customers,
  invoicesRequests: state.request.invoices,
});

const mapDispatchToProps = (
  dispatch: Dispatch<Actions | productsActions.Actions | toastActions>,
): DispatchProps => (
  {
    loadInvoices: () => {
      dispatch(Actions.loadAllInvoices());
    },
    loadProducts: () => {
      dispatch(productsActions.Actions.loadAllProducts());
    },
    submitDeleteForm: (_id) => {
      dispatch(Actions.submitInvoiceDeleteForm(_id));
    },
    destroyForm: (form) => {
      dispatch(destroy(form));
    },
    resetToast: () => {
      dispatch(toastActions.hideToast());
    },
  }
);

type Props = StateProps & DispatchProps;

interface State {
  isVisibleAddForm: boolean;
}

class InvoicesScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisibleAddForm: false,
    };
  }

  public toggleInvoiceAddForm = (): void => {
    this.setState({
      isVisibleAddForm: !this.state.isVisibleAddForm,
    });

    if (this.state.isVisibleAddForm) {
      this.props.destroyForm('invoiceAdd');
      this.props.resetToast();
    }
  }

  public render() {
    const {
      invoicesRequests, invoices,
      loadInvoices, loadProducts, submitDeleteForm,
      customers: {activeCustomerId},
    } = this.props;
    const {isVisibleAddForm} = this.state;

    return (
      <View style={style.container}>
        <View style={style.customerSelectWraper}>
          <CustomerSelectElement/>
        </View>
        {
          activeCustomerId &&
          <View style={style.contentWraper}>
              <View style={style.list}>
                  <InvoiceList
                      invoicesRequest={invoicesRequests.invoicesGet}
                      invoicesData={invoices.data}
                      activeCustomerId={activeCustomerId}
                      loadInvoices={loadInvoices}
                      loadProducts={loadProducts}
                      deleteInvoice={submitDeleteForm}
                  />
              </View>
              <View style={style.editPanel}>
                  <TouchableOpacity
                      onPress={this.toggleInvoiceAddForm}
                      style={style.addButton}
                  >
                      <View>
                          <Icon name='cart-plus' size={30} color='#fff'/>
                      </View>
                  </TouchableOpacity>
                  <InvoiceAddForm
                      isVisible={isVisibleAddForm}
                      handleClose={this.toggleInvoiceAddForm}
                      isLoading={invoicesRequests.invoicesPost.loading}
                      activeCustomerId={activeCustomerId}
                  />
              </View>
          </View>
        }
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(InvoicesScreen);