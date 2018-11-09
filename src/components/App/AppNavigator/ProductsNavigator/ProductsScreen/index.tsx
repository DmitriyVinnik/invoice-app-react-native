import React from "react";
import { Text, View } from "react-native";

export default class ProductsScreen extends React.Component {

  render() {
    return (
      <View >
        <Text>Products</Text>
      </View>
    );
  }
}

// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {destroy} from "redux-form";
//
// import ProductList from '../ProductList/index';
// import ProductAddForm from '../ProductAddForm';
// import ProductChangeForm from '../ProductChangeForm';
// import ProductDeleteForm from '../ProductDeleteForm';
// import EditPanel from '../../../shared/EditPanel';
// import {Actions} from '../../../../../redux/products/AC/index';
//
// import {Dispatch} from 'redux';
// import {RootState} from '../../../../../redux/store';
// import {ProductsRequestState} from '../../../../../redux/request/nested-states/products/states/index';
// import {ProductDataForServer, ProductsState} from '../../../../../redux/products/states/index';
//
// interface StateProps {
//   products: ProductsState,
//   productsRequests: ProductsRequestState,
// }
//
// interface DispatchProps {
//   loadProducts(): void,
//   submitAddForm(data: ProductDataForServer): void,
//   submitChangeForm(data: ProductDataForServer, _id: number): void,
//   submitDeleteForm(_id: number): void,
//   destroyForm(form: string): void,
// }
//
// type Props = StateProps & DispatchProps;
//
// interface State {
//   isVisibleAddForm: boolean,
//   isVisibleChangeForm: boolean,
//   isVisibleDeleteForm: boolean,
// }
//
// class Index extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       isVisibleAddForm: false,
//       isVisibleChangeForm: false,
//       isVisibleDeleteForm: false,
//     };
//   }
//
//   public handleSubmitProductAddForm = (values: ProductDataForServer): void => {
//     this.props.submitAddForm(values);
//   };
//   public handleSubmitProductChangeForm = (values: ProductDataForServer): void => {
//     const {products: {activeProductId}, submitChangeForm} = this.props;
//
//     if (activeProductId) {
//       submitChangeForm(values, activeProductId);
//     }
//   };
//   public handleSubmitProductDeleteForm = (evt: React.FormEvent<HTMLFormElement>): void => {
//     const {products: {activeProductId}, submitDeleteForm} = this.props;
//
//     evt.preventDefault();
//     if (activeProductId) {
//       submitDeleteForm(activeProductId);
//       this.setState({isVisibleDeleteForm: false})
//     }
//   };
//   public toggleProductAddForm = (): void => {
//     this.setState({
//       isVisibleAddForm: !this.state.isVisibleAddForm,
//     });
//
//     if (this.state.isVisibleAddForm) {
//       this.props.destroyForm('productAdd')
//     }
//   };
//   public toggleProductChangeForm = (): void => {
//     this.setState({
//       isVisibleChangeForm: !this.state.isVisibleChangeForm,
//     });
//   };
//   public toggleProductDeleteForm = (): void => {
//     this.setState({
//       isVisibleDeleteForm: !this.state.isVisibleDeleteForm,
//     });
//   };
//
//   public render() {
//     const {products: {activeProductId, data}, productsRequests, loadProducts} = this.props;
//     const {isVisibleAddForm, isVisibleChangeForm, isVisibleDeleteForm} = this.state;
//     const activeProduct = data.find(
//       (elem) => elem._id === activeProductId
//     );
//
//     return (
//       <section>
//         <EditPanel
//           labelButton='product'
//           onAddButtonClick={this.toggleProductAddForm}
//           onChangeButtonClick={this.toggleProductChangeForm}
//           onDeleteButtonClick={this.toggleProductDeleteForm}
//           activeId={activeProductId}
//         />
//         <ProductAddForm
//           isVisible={isVisibleAddForm}
//           handleClose={this.toggleProductAddForm}
//           isLoading={productsRequests.productsPost.loading}
//           errors={productsRequests.productsPost.errors}
//           onSubmit={this.handleSubmitProductAddForm}
//         />
//         <ProductChangeForm
//           isVisible={isVisibleChangeForm}
//           handleClose={this.toggleProductChangeForm}
//           isLoading={productsRequests.productsPut.loading}
//           errors={productsRequests.productsPut.errors}
//           onSubmit={this.handleSubmitProductChangeForm}
//           activeProduct={activeProduct}
//         />
//         <ProductDeleteForm
//           isVisible={isVisibleDeleteForm}
//           handleClose={this.toggleProductDeleteForm}
//           isLoading={productsRequests.productsDelete.loading}
//           errors={productsRequests.productsDelete.errors}
//           name={activeProduct ? activeProduct.name : null}
//           handleSubmit={this.handleSubmitProductDeleteForm}
//         />
//         <h1 className='main-heading'>Products: </h1>
//         <ProductList
//           productsRequest={productsRequests.productsGet}
//           productsData={data}
//           loadProducts={loadProducts}
//         />
//       </section>
//     )
//   }
// }
//
// const mapStateToProps = (state: RootState): StateProps => ({
//   products: state.products,
//   productsRequests: state.request.products,
// });
//
// const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
//   {
//     loadProducts: () => {
//       dispatch(Actions.loadAllProducts());
//     },
//     submitAddForm: (data) => {
//       dispatch(Actions.submitProductAddForm(data));
//     },
//     submitChangeForm: (data, _id) => {
//       dispatch(Actions.submitProductChangeForm(data, _id));
//     },
//     submitDeleteForm: (_id) => {
//       dispatch(Actions.submitProductDeleteForm(_id));
//     },
//     destroyForm: (form: string) => {
//       dispatch(destroy(form));
//     },
//   }
// );
//
// export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Index);
