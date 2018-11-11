import React, { Component } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { connect } from 'react-redux';

import ProductList from './ProductList';
import ProductAddScreen from '../ProductAddScreen';
import ProductChangeScreen from '../ProductChangeScreen';
import ProductDeleteScreen from '../ProductDeleteScreen';
import EditPanel from '../../../../../shared/components/EditPanel';

import { destroy } from 'redux-form';
import { Actions } from '../../../../../redux/products/AC';

import { Dispatch } from 'redux';
import { RootState } from '../../../../../redux/store';
import { ProductsRequestState } from '../../../../../redux/request/nested-states/products/states';
import { ProductDataForServer, ProductsState } from '../../../../../redux/products/states';

interface StateProps {
  products: ProductsState;
  productsRequests: ProductsRequestState;
}

interface DispatchProps {
  loadProducts(): void;
  submitAddForm(data: ProductDataForServer): void;
  submitChangeForm(data: ProductDataForServer, _id: number): void;
  submitDeleteForm(_id: number): void;
  destroyForm(form: string): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  products: state.products,
  productsRequests: state.request.products,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
  {
    loadProducts: () => {
      dispatch(Actions.loadAllProducts());
    },
    submitAddForm: (data) => {
      dispatch(Actions.submitProductAddForm(data));
    },
    submitChangeForm: (data, _id) => {
      dispatch(Actions.submitProductChangeForm(data, _id));
    },
    submitDeleteForm: (_id) => {
      dispatch(Actions.submitProductDeleteForm(_id));
    },
    destroyForm: (form: string) => {
      dispatch(destroy(form));
    },
  }
);

type Props = StateProps & DispatchProps;

interface State {
  isVisibleAddForm: boolean;
  isVisibleChangeForm: boolean;
  isVisibleDeleteForm: boolean;
}

class ProductsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisibleAddForm: false,
      isVisibleChangeForm: false,
      isVisibleDeleteForm: false,
    };
  }

  public handleSubmitProductAddForm = (values: ProductDataForServer): void => {
    this.props.submitAddForm(values);
  }

  public handleSubmitProductChangeForm = (values: ProductDataForServer): void => {
    const {products: {activeProductId}, submitChangeForm} = this.props;

    if (activeProductId) {
      submitChangeForm(values, activeProductId);
    }
  }

  public handleSubmitProductDeleteForm = (evt: GestureResponderEvent): void => {
    const {products: {activeProductId}, submitDeleteForm} = this.props;

    evt.preventDefault();
    if (activeProductId) {
      submitDeleteForm(activeProductId);
      this.setState({isVisibleDeleteForm: false});
    }
  }

  public toggleProductAddForm = (): void => {
    this.setState({
      isVisibleAddForm: !this.state.isVisibleAddForm,
    });

    if (this.state.isVisibleAddForm) {
      this.props.destroyForm('productAdd');
    }
  }

  public toggleProductChangeForm = (): void => {
    this.setState({
      isVisibleChangeForm: !this.state.isVisibleChangeForm,
    });
  }

  public toggleProductDeleteForm = (): void => {
    this.setState({
      isVisibleDeleteForm: !this.state.isVisibleDeleteForm,
    });
  }

  public render() {
    const {products, productsRequests, loadProducts} = this.props;
    const {isVisibleAddForm, isVisibleChangeForm, isVisibleDeleteForm} = this.state;
    const activeProduct = products.data.find(
      (elem) => elem._id === products.activeProductId,
    );

    return (
      <View>
        <ProductList
          productsRequest={productsRequests.productsGet}
          productsData={products.data}
          loadProducts={loadProducts}
        />
        <EditPanel
          labelButton='product'
          onAddButtonClick={this.toggleProductAddForm}
          onChangeButtonClick={this.toggleProductChangeForm}
          onDeleteButtonClick={this.toggleProductDeleteForm}
          activeId={products.activeProductId}
        />
        <ProductAddScreen
          isVisible={isVisibleAddForm}
          handleClose={this.toggleProductAddForm}
          isLoading={productsRequests.productsPost.loading}
          errors={productsRequests.productsPost.errors}
          submitForm={this.handleSubmitProductAddForm}
        />
        <ProductChangeScreen
          isVisible={isVisibleChangeForm}
          handleClose={this.toggleProductChangeForm}
          isLoading={productsRequests.productsPut.loading}
          errors={productsRequests.productsPut.errors}
          submitForm={this.handleSubmitProductChangeForm}
          activeProduct={activeProduct}
        />
        <ProductDeleteScreen
          isVisible={isVisibleDeleteForm}
          handleClose={this.toggleProductDeleteForm}
          isLoading={productsRequests.productsDelete.loading}
          errors={productsRequests.productsDelete.errors}
          name={activeProduct ? activeProduct.name : null}
          handleSubmit={this.handleSubmitProductDeleteForm}
        />
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ProductsScreen);
