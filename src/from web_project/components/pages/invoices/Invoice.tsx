import React from 'react';
import {connect} from 'react-redux';
import InvoiceItemsList from "./invoiceItems/InvoiceItemsList";
import {Actions} from '../../../../redux/invoices/AC/index';
import * as invoiceItemsActions from '../../../../redux/invoiceItems/AC/index';

import {Dispatch} from 'redux';
import {Invoice as InvoiceInterface} from '../../../../redux/invoices/states/index';
import {RootState} from '../../../../redux/store';
import {InvoiceItemsState} from "../../../../redux/invoiceItems/states/index";
import {InvoiceItemsRequestState} from "../../../../redux/request/nested-states/invoiceItems/states/index";

type OwnProps = InvoiceInterface

interface StateProps {
    activeInvoiceId: number | null,
    invoicesData: InvoiceInterface[],
    invoiceItems: InvoiceItemsState
    invoiceItemsRequests: InvoiceItemsRequestState,
}

interface DispatchProps {
    selectActiveInvoice(data: InvoiceInterface[], id: number): void,

    resetSelectionActiveInvoice(): void,

    loadInvoiceItems(invoice_id: number): void,
}

type Props = StateProps & DispatchProps & OwnProps

const Invoice: React.SFC<Props> = (props: Props) => {
    const {
        id, customer_id, discount, total, activeInvoiceId, invoicesData,
        invoiceItems, invoiceItemsRequests,
        resetSelectionActiveInvoice, selectActiveInvoice, loadInvoiceItems,
    } = props;
    const onClickInvoice = (): void => {
        selectActiveInvoice(invoicesData, id);
    };
    const isInvoiceActive = activeInvoiceId === id;
    const onReClickInvoice = (): void => {
        resetSelectionActiveInvoice();
    };

    return (
        <li
            onClick={!isInvoiceActive ? onClickInvoice : onReClickInvoice}
            className={
                isInvoiceActive ?
                    'entity-list__item entity-list__item--active' :
                    'entity-list__item'
            }
        >
            <ul className='invoice-list'>
                <li className='invoice-list__item'>
                    Invoice id:
                    <span className='invoice-list__title'> {id}</span>
                </li>
                <li className='invoice-list__item'>
                    Customer id:
                    <span className='invoice-list__title'> {customer_id}</span>
                </li>
                <li className='invoice-list__item'>
                    Discount:
                    <span className='invoice-list__title'> {discount}</span>
                </li>
                <li className='invoice-list__item'>
                    Total:
                    <span className='invoice-list__title'> {total}</span>
                </li>
            </ul>
            {isInvoiceActive &&
            <span className='invoice-list__heading'>
                Invoice items:
            </span>}
            {isInvoiceActive &&
            <InvoiceItemsList
                invoiceItemsRequest={invoiceItemsRequests.invoiceItemsGet}
                invoiceItemsData={invoiceItems.data}
                activeInvoiceId={activeInvoiceId}
                loadInvoiceItems={loadInvoiceItems}
            />}
        </li>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    activeInvoiceId: state.invoices.activeInvoiceId,
    invoicesData: state.invoices.data,
    invoiceItems: state.invoiceItems,
    invoiceItemsRequests: state.request.invoiceItems,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions | invoiceItemsActions.Actions>): DispatchProps => (
    {
        selectActiveInvoice: (data, id) => {
            dispatch(Actions.selectInvoice(data, id));
        },
        resetSelectionActiveInvoice: () => {
            dispatch(Actions.resetSelectionInvoice());
        },
        loadInvoiceItems: (invoice_id) => {
            dispatch(invoiceItemsActions.Actions.loadAllInvoiceItems(invoice_id));
        },
    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Invoice)