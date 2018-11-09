import React, {Component} from 'react';
import Invoice from './Invoice';
import {Invoice as InvoiceInterface} from '../../../../redux/invoices/states/index';
import {RequestNestedState} from '../../../../redux/request/nested-states/invoices/states/index';

export interface OwnProps {
    invoicesData: InvoiceInterface[],
    invoicesRequest: RequestNestedState,
    activeCustomerId: number | null,
    loadInvoices(): void,
    loadProducts(): void,
}

export default class InvoicesList extends Component<OwnProps> {

    public componentDidMount() {
        this.props.loadInvoices();
        this.props.loadProducts();
    }

    public render() {
        const {invoicesRequest: {errors, loading, loaded}, invoicesData, activeCustomerId} = this.props;
        let invoiceItems: React.ReactNode | null;

        if (invoicesData) {
            invoiceItems = invoicesData.filter((invoice) => invoice.customer_id === activeCustomerId)
                .map(invoice => (
                <Invoice
                    _id={invoice._id}
                    customer_id={invoice.customer_id}
                    discount={invoice.discount}
                    total={invoice.total}
                    key={invoice._id}
                />
            ));
        } else {
            invoiceItems = null;
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
                <p className='errors'>Something went wrong! Invoices have not loaded, try reloading the page</p>
            )
        }

        return (
            <ul className='entity-list'>
                {invoiceItems}
            </ul>
        )
    }
}
