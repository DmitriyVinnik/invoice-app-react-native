import {Action} from 'redux';
import {Observable} from 'rxjs';
import {ofType, StateObservable} from 'redux-observable';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import * as fromActions from '../AC';
import * as customersActions from '../../customers/AC';
import {invoicesRequestAC, RequestActionsSuccess} from '../../request/nested-states/invoices/AC';
import {RootState} from "../../store";
import {InvoiceDataForServer} from "../states";

const loadAllInvoicesEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.INVOICES_LOAD_ALL),
    withLatestFrom(state$),
    filter(([,state]) => {
        const {loaded, loading} = state.request.invoices.invoicesGet;

        return  (!loaded && !loading) === true;
    }),
    map(() => invoicesRequestAC.invoicesGet.Actions.invoicesGet())
);

const updateInvoicesDataEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<RequestActionsSuccess>(
        invoicesRequestAC.invoicesGet.ActionTypes.INVOICES_GET_SUCCESS,
        invoicesRequestAC.invoicesPost.ActionTypes.INVOICES_POST_SUCCESS,
        invoicesRequestAC.invoicesPut.ActionTypes.INVOICES_PUT_SUCCESS,
        invoicesRequestAC.invoicesDelete.ActionTypes.INVOICES_DELETE_SUCCESS,
    ),
    map((action) => {

        switch (action.type) {
            case invoicesRequestAC.invoicesGet.ActionTypes.INVOICES_GET_SUCCESS:
            case invoicesRequestAC.invoicesPost.ActionTypes.INVOICES_POST_SUCCESS:
            case invoicesRequestAC.invoicesPut.ActionTypes.INVOICES_PUT_SUCCESS: {
                const {data} = action.payload;

                return fromActions.Actions.setInvoicesData(data)
            }

            case invoicesRequestAC.invoicesDelete.ActionTypes.INVOICES_DELETE_SUCCESS: {
                const {data} = action.payload;

                return fromActions.Actions.updateInvoicesDataAfterDeleteRequest(data)
            }

            default:
                return null;
        }

    })
);

const submitInvoiceFormsEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(
        fromActions.ActionTypes.INVOICES_SUBMIT_ADD_FORM,
        fromActions.ActionTypes.INVOICES_SUBMIT_CHANGE_FORM,
        fromActions.ActionTypes.INVOICES_SUBMIT_DELETE_FORM,
    ),
    map((action) => {

        switch (action.type) {
            case fromActions.ActionTypes.INVOICES_SUBMIT_ADD_FORM: {
                const {data, total} = action.payload;
                const body: InvoiceDataForServer = {
                    discount: data.discount,
                    customer_id: data.customer_id,
                    total
                };

                return invoicesRequestAC.invoicesPost.Actions.invoicesPost(body)
            }

            case fromActions.ActionTypes.INVOICES_SUBMIT_CHANGE_FORM: {
                const {data, total, id} = action.payload;
                const body: InvoiceDataForServer = {
                    discount: data.discount,
                    customer_id: data.customer_id,
                    total
                };

                return invoicesRequestAC.invoicesPut.Actions.invoicesPut(body, id)
            }

            case fromActions.ActionTypes.INVOICES_SUBMIT_DELETE_FORM: {
                const {id} = action.payload;

                return invoicesRequestAC.invoicesDelete.Actions.invoicesDelete(id)
            }

            default:
                return null;
        }
    })
);

const afterSelectCustomerEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<customersActions.Actions>(customersActions.ActionTypes.CUSTOMERS_SELECT_ACTIVE),
    map(() => fromActions.Actions.resetSelectionInvoice())
);

export const invoicesEpics = [
    loadAllInvoicesEpic,
    updateInvoicesDataEpic,
    submitInvoiceFormsEpic,
    afterSelectCustomerEpic,
];