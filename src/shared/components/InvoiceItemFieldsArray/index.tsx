import React from 'react';
import {Field, WrappedFieldArrayProps, WrappedFieldProps} from 'redux-form';
import FormField from '../../../shared/FormField';
import ProductSelectElement from '../ProductSelectElement/index';
import {ProductsState} from "../../../redux/products/states/index";

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

export interface OwnProps {
    products: ProductsState
}

type Props = OwnProps & WrappedFieldProps & WrappedFieldArrayProps<any>

const InvoiceItemFieldsArray: React.SFC<Props> = (props: Props) => {
    const {fields, products, meta: {error}} = props;
    const handleAddButtonClick = () => fields.push({});

    return (
        <section>
            <h3 className='form__title'>Invoice Items (II): </h3>
            <div className='form__btn-wraper form__btn-wraper--one-btn'>
                <Button
                    onClick={handleAddButtonClick}
                    variant="contained"
                    color="primary"
                >
                    <AddIcon/>
                    Add new invoice item
                </Button>
            </div>
            <ul className='form__invoice-item-list'>
                {fields.map((productItem, index) => {
                    const handleRemoveButtonClick = () => fields.remove(index);

                    return (
                        <li
                            className='form__invoice-item'
                            key={index}
                        >
                            <h4>{`II #${index + 1}: `}</h4>
                            <Field
                                name={`${productItem}.product_id`}
                                component={ProductSelectElement}
                                products={products}
                                _id='add-invoiceItem-product'
                                label='Product: '
                            />
                            <div className='form__invoice-item-quantity'>
                                <Field
                                    name={`${productItem}.quantity`}
                                    component={FormField}
                                    type='number'
                                    min='1'
                                    _id='add-invoiceItem-quantity'
                                    labelText="Quantity: "
                                />
                            </div>
                            <IconButton
                                aria-label="Delete"
                                title="Remove invoice item"
                                onClick={handleRemoveButtonClick}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </li>
                    );
                })}
                {error && <li className="error">{error}</li>}
            </ul>
        </section>
    );
};

export default InvoiceItemFieldsArray;
