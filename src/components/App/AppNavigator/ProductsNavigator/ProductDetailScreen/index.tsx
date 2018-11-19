import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash-es';

import ProductChangeScreen from '../ProductChangeScreen';
import RegularText from '../../../../../shared/components/RegularText';
import EditButton from '../../../../../shared/components/EditButton';
import style from './style';

import { Actions } from '../../../../../redux/products/AC';
import { Actions as toastActions } from '../../../../../redux/toast/AC';

import { ProductDataForServer } from '../../../../../redux/products/states';
import { ProductsRequestState } from '../../../../../redux/request/nested-states/products/states';
import { RootState } from '../../../../../redux/store';
import { Dispatch } from 'redux';
import { Product, ProductsState } from '../../../../../redux/products/states';
import {
  NavigationInjectedProps,
  NavigationScreenConfig,
  NavigationStackScreenOptions,
} from 'react-navigation';
import { ProductNavigationParams } from '../ProductsScreen/Product';
import { ProductsFormData } from '../../../../../redux/form/states';

interface StateProps {
  productsRequests: ProductsRequestState;
  products: ProductsState;
}

interface DispatchProps {
  submitChangeForm(data: ProductDataForServer, _id: number): void;
  resetToast(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  productsRequests: state.request.products,
  products: state.products,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions | toastActions>): DispatchProps => (
  {
    submitChangeForm: (data, _id) => {
      dispatch(Actions.submitProductChangeForm(data, _id));
    },
    resetToast: () => {
      dispatch(toastActions.hideToast());
    },
  }
);

type Props = StateProps & DispatchProps & NavigationInjectedProps<ProductNavigationParams>;

interface State {
  isVisibleChangeForm: boolean;
}

class ProductDetailsScreen extends React.Component<Props, State> {
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
      title: navigation.getParam('productDetailTitle', 'Product'),
      headerTintColor: '#fff',
    };
  }

  public componentDidUpdate() {
    const {data} = this.props.products;
    const activeProduct: Product | undefined = data.find(
      (product) => product._id === this.product._id,
    );

    if (activeProduct && !isEqual(this.product, activeProduct)) {
      this.product = {
        ...activeProduct,
      };

      this.props.navigation.setParams({
        productDetailTitle: activeProduct.name,
      });
    }
  }

  private product: Product = this.props.navigation.getParam('product');

  public toggleProductChangeform = (): void => {
    this.setState({
      isVisibleChangeForm: !this.state.isVisibleChangeForm,
    });

    if (this.state.isVisibleChangeForm) {
      this.props.resetToast();
    }
  }

  public handleSubmitProductChangeForm = (values: ProductsFormData): void => {
    const {submitChangeForm} = this.props;
    const valuesForServer: ProductDataForServer = {
      ...values,
      price: +values.price,
    };

    this.props.resetToast();
    submitChangeForm(valuesForServer, this.product._id);
  }

  render() {
    const {productsRequests} = this.props;
    const {isVisibleChangeForm} = this.state;

    return (
      <View style={style.container}>
        <View style={style.textContainer}>
          <RegularText>
            Name:
            <Text style={style.text}> {this.product.name}</Text>
          </RegularText>
          <RegularText>
            id:
            <Text style={style.text}> {this.product._id}</Text>
          </RegularText>
          <RegularText>
            Price:
            <Text style={style.text}> {this.product.price}</Text>
          </RegularText>
        </View>
        <View style={style.editPanel}>
          <View>
            <EditButton
              onPress={this.toggleProductChangeform}
            />
          </View>
          <ProductChangeScreen
            isVisible={isVisibleChangeForm}
            handleClose={this.toggleProductChangeform}
            isLoading={productsRequests.productsPut.loading}
            submitForm={this.handleSubmitProductChangeForm}
            activeProduct={this.product}
          />
        </View>
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ProductDetailsScreen);