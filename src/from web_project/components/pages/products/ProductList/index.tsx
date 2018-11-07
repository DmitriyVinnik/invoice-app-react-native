import React, {Component} from 'react';
import Product from '../Product/index';
import {Product as ProductInterface} from '../../../../../redux/products/states/index';
import {RequestNestedState} from '../../../../../redux/request/nested-states/products/states/index';

export interface OwnProps {
    productsData: ProductInterface[],
    productsRequest: RequestNestedState;
    loadProducts(): void,
}

export default class ProductList extends Component<OwnProps> {

    public componentDidMount() {
        const {loadProducts} = this.props;

        loadProducts();
    }

    public render() {
        const {productsRequest: {errors, loading, loaded}, productsData} = this.props;
        let productItems: React.ReactNode | null;

        if (productsData) {
            productItems = productsData.map(product => (
                <Product
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    key={product.id}
                />
            ));
        } else {
            productItems = null;
        }

        if (errors) {
            return (
                <p className='errors'>Error: {errors}</p>
            );
        } else if (loading) {
            return (
                <p className='loader'>Wait a second, loading...</p>
            );
        } else  if (!loaded) {
            return (
                <p className='errors'>Something went wrong! Products have not loaded, try reloading the page</p>
            )
        }

        return (
            <ul className='entity-list'>
                {productItems}
            </ul>
        )
    }
}
