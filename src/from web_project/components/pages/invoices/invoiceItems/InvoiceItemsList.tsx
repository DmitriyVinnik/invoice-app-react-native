import React, {Component} from 'react';
import InvoiceItem from './InvoiceItem';
import {InvoiceItem as InvoiceItemInterface} from '../../../../../redux/invoiceItems/states/index';
import {RequestNestedState} from '../../../../../redux/request/nested-states/invoiceItems/states/index';

export interface OwnProps {
    invoiceItemsData: InvoiceItemInterface[],
    invoiceItemsRequest: RequestNestedState;
    activeInvoiceId: number | null;

    loadInvoiceItems(invoice_id: number): void,
}

export default class InvoiceItemsList extends Component<OwnProps> {

    public componentDidMount() {
        const {activeInvoiceId, loadInvoiceItems} = this.props;

        if (activeInvoiceId) {
            loadInvoiceItems(activeInvoiceId);
        }
    }

    public render() {
        const {invoiceItemsRequest: {errors, loading, loaded}, invoiceItemsData, activeInvoiceId} = this.props;
        let invoiceItemElements: React.ReactNode | null;
        if (invoiceItemsData) {
            invoiceItemElements = invoiceItemsData.filter(
                (invoiceItem) => invoiceItem.invoice_id === activeInvoiceId
            ).map(invoiceItem => (
                <InvoiceItem
                    id={invoiceItem.id}
                    invoice_id={invoiceItem.invoice_id}
                    product_id={invoiceItem.product_id}
                    quantity={invoiceItem.quantity}
                    key={invoiceItem.id}
                />
            ));
        } else {
            invoiceItemElements = null;
        }

        if (errors) {
            return (
                <p className='errors'>Error: {errors}</p>
            );
        } else if (loading) {
            return (
                <p className='loader'>Wait a second, loading...</p>
            );
        } else if (!loaded) {
            return (
                <p className='errors'>Something went wrong! InvoiceItems have not loaded, try reloading the page</p>
            )
        }

        return (
            <ul className='entity-list entity-list--sub'>
                {invoiceItemElements}
            </ul>
        )
    }
}
