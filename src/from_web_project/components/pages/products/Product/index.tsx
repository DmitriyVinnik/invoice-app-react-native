import React from 'react';
import {connect} from 'react-redux';
import {Actions} from '../../../../../redux/products/AC/index';

import {Dispatch} from 'redux';
import {Product as ProductInterface} from '../../../../../redux/products/states/index';
import {RootState} from '../../../../../redux/store';

type OwnProps = ProductInterface

interface StateProps {
    activeProductId: number | null,
    productsData: ProductInterface[],
}

interface DispatchProps {
    selectActiveProduct(data: ProductInterface[], _id: number): void,

    resetSelectionActiveProduct(): void,
}

type Props = StateProps & DispatchProps & OwnProps

const Product: React.SFC<Props> = (props: Props) => {
    const {
        _id, name, price, activeProductId, productsData,
        resetSelectionActiveProduct, selectActiveProduct,
    } = props;
    const onClickProduct = (): void => {
        selectActiveProduct(productsData, _id);
    };
    const isProductActive = activeProductId === _id;
    const onReClickProduct = (): void => {
        resetSelectionActiveProduct();
    };

    return (
        <li
            onClick={!isProductActive ? onClickProduct : onReClickProduct}
            className={
                isProductActive ?
                    'entity-list__item entity-list__item--active' :
                    'entity-list__item'
            }
        >
            <ul className='product-list'>
                <li className='product-list__item'>
                    Name:
                    <span className='product-list__title'> {name}</span>
                </li>
                <li className='product-list__item'>
                    Price:
                    <span className='product-list__title'> {price}</span>
                </li>
                <li className='product-list__item'>
                    _id:
                    <span className='product-list__title'> {_id}</span>
                </li>
            </ul>
        </li>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    activeProductId: state.products.activeProductId,
    productsData: state.products.data,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
    {
        selectActiveProduct: (data, _id) => {
            dispatch(Actions.selectProduct(data, _id));
        },
        resetSelectionActiveProduct: () => {
            dispatch(Actions.resetSelectionProduct());
        },
    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Product)