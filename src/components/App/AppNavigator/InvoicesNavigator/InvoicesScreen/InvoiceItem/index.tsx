import React from 'react';

import {InvoiceItem as InvoiceItemInterface} from '../../../../../../redux/invoiceItems/states/index';

type OwnProps = InvoiceItemInterface


const InvoiceItem: React.SFC<OwnProps> = (props: OwnProps) => {
    const {
        _id, quantity, invoice_id, product_id,
    } = props;

    return (
        <li className='entity-list__sub-item'>
            <ul className='invoice-item-list'>
                <li className='invoice-item-list__item'>
                    InvoiceItem _id:
                    <span className='invoice-item-list__title'> {_id}</span>
                </li>
                <li className='invoice-item-list__item'>
                    Invoice _id:
                    <span className='invoice-item-list__title'> {invoice_id}</span>
                </li>
                <li className='invoice-item-list__item'>
                    Product _id:
                    <span className='invoice-item-list__title'> {product_id}</span>
                </li>
                <li className='invoice-item-list__item'>
                    Quantity:
                    <span className='invoice-item-list__title'> {quantity}</span>
                </li>
            </ul>
        </li>
    );
};

export default InvoiceItem;