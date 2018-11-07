// import {isEqual} from 'lodash-es';
import {Action} from 'redux';
import {Observable} from 'rxjs';
import {ofType, StateObservable} from 'redux-observable';
import {map} from 'rxjs/operators';
import * as fromActions from '../AC';
import {invoiceItemsRequestAC, RequestActionsSuccess} from '../../request/nested-states/invoiceItems/AC';
import {
    invoicesRequestAC,
    PostSuccess as RequestInvoicePostSuccess,
    DeleteSuccess as RequestInvoiceDeleteSuccess,
    // PutSuccess as RequestInvoicePutSuccess,
} from '../../request/nested-states/invoices/AC';
import {RootState} from "../../store";
import {/*InvoiceItem,*/ InvoiceItemDataForServer} from "../states";

const loadAllInvoiceItemsEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.LoadAction>(fromActions.ActionTypes.INVOICE_ITEMS_LOAD_ALL),
    map((action) => invoiceItemsRequestAC.invoiceItemsGet.Actions.invoiceItemsGet(action.payload.invoice_id))
);

const updateInvoiceItemsDataEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<RequestActionsSuccess>(
        invoiceItemsRequestAC.invoiceItemsGet.ActionTypes.INVOICE_ITEMS_GET_SUCCESS,
        invoiceItemsRequestAC.invoiceItemsPost.ActionTypes.INVOICE_ITEMS_POST_SUCCESS,
        invoiceItemsRequestAC.invoiceItemsPut.ActionTypes.INVOICE_ITEMS_PUT_SUCCESS,
        invoiceItemsRequestAC.invoiceItemsDelete.ActionTypes.INVOICE_ITEMS_DELETE_SUCCESS,
    ),
    map((action) => {

        switch (action.type) {
            case invoiceItemsRequestAC.invoiceItemsGet.ActionTypes.INVOICE_ITEMS_GET_SUCCESS:
            case invoiceItemsRequestAC.invoiceItemsPost.ActionTypes.INVOICE_ITEMS_POST_SUCCESS:
            case invoiceItemsRequestAC.invoiceItemsPut.ActionTypes.INVOICE_ITEMS_PUT_SUCCESS: {
                const {data} = action.payload;

                return fromActions.Actions.setInvoiceItemsData(data)
            }

            case invoiceItemsRequestAC.invoiceItemsDelete.ActionTypes.INVOICE_ITEMS_DELETE_SUCCESS: {
                const {data} = action.payload;

                return fromActions.Actions.updateInvoiceItemsDataAfterDeleteRequest(data)
            }

            default:
                return null;
        }

    })
);

const afterSuccesPostInvoiceEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType<RequestInvoicePostSuccess>(invoicesRequestAC.invoicesPost.ActionTypes.INVOICES_POST_SUCCESS),
    map((action) => {
        const {id} = action.payload.data;

        let formData: InvoiceItemDataForServer[] = [];
        let dataForServer: InvoiceItemDataForServer[] = [];
        if (state$.value.form.invoiceAdd.values) {
            formData = state$.value.form.invoiceAdd.values.invoiceItems;
            dataForServer = formData.map<InvoiceItemDataForServer>((elem) => {
                elem.invoice_id = id;

                return elem
            })
        }

        return invoiceItemsRequestAC.invoiceItemsPost.Actions.invoiceItemsPost(dataForServer, id)
    })
);

const afterSuccessDeleteInvoiceEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType<RequestInvoiceDeleteSuccess>(invoicesRequestAC.invoicesDelete.ActionTypes.INVOICES_DELETE_SUCCESS),
    map((action) => {
        const {id} = action.payload.data;

        let dataForServer: number[] = [];
        if (state$.value.invoiceItems.data) {
            dataForServer = state$.value.invoiceItems.data
                .filter((dataElem) => dataElem.invoice_id === id)
                .map<number>((elem) => elem.id)
        }

        return invoiceItemsRequestAC.invoiceItemsDelete.Actions.invoiceItemsDelete(dataForServer, id)
    })
);

// const postInvoiceItemsAfterSuccessPutInvoiceEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
//     ofType<RequestInvoicePutSuccess>(invoicesRequestAC.invoicesPut.ActionTypes.INVOICES_PUT_SUCCESS),
//     map((action) => {
//         const {id} = action.payload.data;
//
//         let formData: InvoiceItem[] = [];
//         let dataForServer: InvoiceItemDataForServer[] = [];
//         if (state$.value.form.invoiceAdd.values) {
//             formData = state$.value.form.invoiceAdd.values.invoiceItems;
//             dataForServer = formData.filter((formElem) => !formElem.id)
//         }
//         console.log('-------------post', dataForServer)
//         return dataForServer ?
//             invoiceItemsRequestAC.invoiceItemsPost.Actions.invoiceItemsPost(dataForServer, id) :
//             {}
//     })
// );
//
// const deleteInvoiceItemsAfterSuccessPutInvoiceEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
//     ofType<RequestInvoicePutSuccess>(invoicesRequestAC.invoicesPut.ActionTypes.INVOICES_PUT_SUCCESS),
//     map((action) => {
//         const {id} = action.payload.data;
//         const stateData: InvoiceItem[] = state$.value.invoiceItems.data.filter(
//             (stateElem) => stateElem.invoice_id === id
//         );
//         let formData: InvoiceItem[] = [];
//         let dataForServer: number[] = [];
//
//         if (state$.value.form.invoiceAdd.values) {
//             formData = state$.value.form.invoiceAdd.values.invoiceItems;
//             dataForServer = stateData
//                 .filter((stateElem) => {
//                         const isInFormData = formData.find(
//                             (formElem) => formElem.id === stateElem.id
//                         );
//
//                         return !isInFormData
//                     }
//                 )
//                 .map<number>((elem) => elem.id)
//         }
//         console.log('-------------delete', dataForServer)
//         return dataForServer ?
//             invoiceItemsRequestAC.invoiceItemsDelete.Actions.invoiceItemsDelete(dataForServer, id) :
//             {}
//     })
// );
//
// const putInvoiceItemsAfterSuccessPutInvoiceEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
//     ofType<RequestInvoicePutSuccess>(invoicesRequestAC.invoicesPut.ActionTypes.INVOICES_PUT_SUCCESS),
//     map((action) => {
//         const invoice_id = action.payload.data.id;
//         const stateData: InvoiceItem[] = state$.value.invoiceItems.data.filter(
//             (stateElem) => stateElem.invoice_id === invoice_id
//         );
//         let formData: InvoiceItem[] = [];
//         let dataForServer: InvoiceItem[] = [];
//
//         if (state$.value.form.invoiceAdd.values) {
//             formData = state$.value.form.invoiceAdd.values.invoiceItems;
//             dataForServer = formData
//                 .filter((formElem) => !!formElem.id)
//                 .filter((formElem) => {
//                     const formElemInState = stateData.find(
//                         (stateElem) => formElem.id === stateElem.id
//                     );
//
//                     return !(formElemInState && isEqual(formElemInState, formElem));
//                 })
//         }
//         console.log('-------------put', dataForServer)
//         return dataForServer ?
//         invoiceItemsRequestAC.invoiceItemsPut.Actions.invoiceItemsPut(dataForServer, invoice_id) :
//             {}
//     })
// );

const submitInvoiceItemsEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(
        fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_ADD,
        fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_PUT,
        fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_DELETE,
    ),
    map((action) => {

        switch (action.type) {
            case fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_ADD: {
                const {data, invoice_id} = action.payload;
                return invoiceItemsRequestAC.invoiceItemsPost.Actions.invoiceItemsPost(data, invoice_id)
            }

            case fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_PUT: {
                const {data, invoice_id} = action.payload;
                return invoiceItemsRequestAC.invoiceItemsPut.Actions.invoiceItemsPut(data, invoice_id)
            }

            case fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_DELETE: {
                const {id, invoice_id} = action.payload;
                return invoiceItemsRequestAC.invoiceItemsDelete.Actions.invoiceItemsDelete(id, invoice_id)
            }

            default:
                return null;
        }
    })
);

export const invoiceItemsEpics = [
    loadAllInvoiceItemsEpic,
    updateInvoiceItemsDataEpic,
    afterSuccesPostInvoiceEpic,
    afterSuccessDeleteInvoiceEpic,
    submitInvoiceItemsEpic,
    // postInvoiceItemsAfterSuccessPutInvoiceEpic,
    // deleteInvoiceItemsAfterSuccessPutInvoiceEpic,
    // putInvoiceItemsAfterSuccessPutInvoiceEpic,
];