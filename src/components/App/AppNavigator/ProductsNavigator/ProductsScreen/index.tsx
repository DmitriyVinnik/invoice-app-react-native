import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import ProductList from './ProductList';
import ProductAddScreen from '../ProductAddScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './style';

import { destroy } from 'redux-form';
import { Actions } from '../../../../../redux/products/AC';
import { Actions as toastActions } from '../../../../../redux/toast/AC';

import { Dispatch } from 'redux';
import { RootState } from '../../../../../redux/store';
import { ProductsRequestState } from '../../../../../redux/request/nested-states/products/states';
import { ProductDataForServer, ProductsState } from '../../../../../redux/products/states';
import { ProductsFormData } from '../../../../../redux/form/states';

interface StateProps {
  products: ProductsState;
  productsRequests: ProductsRequestState;
}

interface DispatchProps {
  loadProducts(): void;
  submitAddForm(data: ProductDataForServer): void;
  submitDeleteForm(_id: number): void;
  destroyForm(form: string): void;
  resetToast(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  products: state.products,
  productsRequests: state.request.products,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions | toastActions>): DispatchProps => (
  {
    loadProducts: () => {
      dispatch(Actions.loadAllProducts());
    },
    submitAddForm: (data) => {
      dispatch(Actions.submitProductAddForm(data));
    },
    submitDeleteForm: (_id) => {
      dispatch(Actions.submitProductDeleteForm(_id));
    },
    destroyForm: (form: string) => {
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

class ProductsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisibleAddForm: false,
    };
  }

  public handleSubmitProductAddForm = (values: ProductsFormData): void => {
    const valuesForServer: ProductDataForServer = {
      ...values,
      price: +values.price,
    };

    this.props.resetToast();
    this.props.submitAddForm(valuesForServer);
  }

  public toggleProductAddForm = (): void => {
    this.setState({
      isVisibleAddForm: !this.state.isVisibleAddForm,
    });

    if (this.state.isVisibleAddForm) {
      this.props.resetToast();
      this.props.destroyForm('productAdd');
    }
  }

  public render() {
    const {products, productsRequests, loadProducts, submitDeleteForm} = this.props;
    const {isVisibleAddForm} = this.state;

    return (
      <View style={style.container}>
        <View style={style.list}>
          <ProductList
            productsRequest={productsRequests.productsGet}
            productsData={products.data}
            loadProducts={loadProducts}
            deleteProduct={submitDeleteForm}
          />
        </View>
        <View style={style.editPanel}>
          <TouchableOpacity
            onPress={this.toggleProductAddForm}
            style={style.addButton}
          >
            <View>
              <Icon name='add-circle-outline' size={40} color='#fff'/>
            </View>
          </TouchableOpacity>
          <ProductAddScreen
            isVisible={isVisibleAddForm}
            handleClose={this.toggleProductAddForm}
            isLoading={productsRequests.productsPost.loading}
            submitForm={this.handleSubmitProductAddForm}
          />
        </View>
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ProductsScreen);
