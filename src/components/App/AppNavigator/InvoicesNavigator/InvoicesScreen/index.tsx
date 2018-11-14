import React, { Component } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { connect } from 'react-redux';

import InvoiceList from './InvoiceList';
import InvoiceAddForm from '../InvoiceAddScreen';
import InvoiceChangeForm from '../InvoiceChangeScreen';
import InvoiceDeleteForm from '../InvoiceDeleteScreen';
import EditPanel from '../../../../../shared/components/EditPanel';
import CustomerSelectElement from '../CustomerSelectScreen';
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
  isVisibleChangeForm: boolean;
  isVisibleDeleteForm: boolean;
}

class InvoicesScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisibleAddForm: false,
      isVisibleChangeForm: false,
      isVisibleDeleteForm: false,
    };
  }

  public handleSubmitInvoiceDeleteForm = (evt: GestureResponderEvent): void => {
    const {invoices: {activeInvoiceId}, submitDeleteForm} = this.props;

    evt.preventDefault();
    if (activeInvoiceId) {
      this.props.resetToast();
      submitDeleteForm(activeInvoiceId);
      this.setState({isVisibleDeleteForm: false});
    }
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

  public toggleInvoiceChangeForm = (): void => {
    this.setState({
      isVisibleChangeForm: !this.state.isVisibleChangeForm,
    });

    if (this.state.isVisibleChangeForm) {
      this.props.resetToast();
    }
  }

  public toggleInvoiceDeleteForm = (): void => {
    this.setState({
      isVisibleDeleteForm: !this.state.isVisibleDeleteForm,
    });

    if (this.state.isVisibleDeleteForm) {
      this.props.resetToast();
    }
  }

  public render() {
    const {
      invoices: {activeInvoiceId}, invoicesRequests, invoices,
      loadInvoices, loadProducts,
      customers: {activeCustomerId},
    } = this.props;
    const {isVisibleAddForm, isVisibleChangeForm, isVisibleDeleteForm} = this.state;
    const activeInvoice = invoices.data.find(
      (elem) => elem._id === activeInvoiceId,
    );

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
                  />
              </View>
              <View style={style.editPanel}>
                  <EditPanel
                      labelButton='invoice'
                      onAddButtonClick={this.toggleInvoiceAddForm}
                      onChangeButtonClick={this.toggleInvoiceChangeForm}
                      onDeleteButtonClick={this.toggleInvoiceDeleteForm}
                      activeId={activeInvoiceId}
                  />
                  <InvoiceAddForm
                      isVisible={isVisibleAddForm}
                      handleClose={this.toggleInvoiceAddForm}
                      isLoading={invoicesRequests.invoicesPost.loading}
                      activeCustomerId={activeCustomerId}
                  />
                {
                  activeInvoice &&
                  <View>
                      <InvoiceChangeForm
                          isVisible={isVisibleChangeForm}
                          handleClose={this.toggleInvoiceChangeForm}
                          isLoading={invoicesRequests.invoicesPut.loading}
                          activeInvoice={activeInvoice}
                          activeCustomerId={activeCustomerId}
                      />
                      <InvoiceDeleteForm
                          isVisible={isVisibleDeleteForm}
                          handleClose={this.toggleInvoiceDeleteForm}
                          isLoading={invoicesRequests.invoicesDelete.loading}
                          _id={activeInvoice._id}
                          handleSubmit={this.handleSubmitInvoiceDeleteForm}
                      />
                  </View>
                }
              </View>
          </View>
        }
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(InvoicesScreen);