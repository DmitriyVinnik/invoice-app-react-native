import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType, StateObservable } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import { invoiceItemsRequestAC, RequestActionsSuccess } from '../../request/nested-states/invoiceItems/AC';
import {
  invoicesRequestAC,
  PostSuccess as RequestInvoicePostSuccess,
  DeleteSuccess as RequestInvoiceDeleteSuccess,
} from '../../request/nested-states/invoices/AC';
import { RootState } from '../../store';
import { InvoiceItemDataForServer } from '../states';
import { InvoiceItemsFormData } from '../../form/states';

const loadAllInvoiceItemsEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.LoadAction>(fromActions.ActionTypes.INVOICE_ITEMS_LOAD_ALL),
  map((action) => invoiceItemsRequestAC.invoiceItemsGet.Actions.invoiceItemsGet(action.payload.invoice_id)),
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

        return fromActions.Actions.setInvoiceItemsData(data);
      }

      case invoiceItemsRequestAC.invoiceItemsDelete.ActionTypes.INVOICE_ITEMS_DELETE_SUCCESS: {
        const {data} = action.payload;

        return fromActions.Actions.updateInvoiceItemsDataAfterDeleteRequest(data);
      }

      default:
        return null;
    }

  }),
);

const afterSuccesPostInvoiceEpic = (
  action$: Observable<Action>, state$: StateObservable<RootState>,
) => action$.pipe(
  ofType<RequestInvoicePostSuccess>(invoicesRequestAC.invoicesPost.ActionTypes.INVOICES_POST_SUCCESS),
  map((action) => {
    const {_id} = action.payload.data;

    let formData: InvoiceItemsFormData[] = [];
    let dataForServer: InvoiceItemDataForServer[] = [];
    if (state$.value.form.invoiceAdd.values) {
      formData = state$.value.form.invoiceAdd.values.invoiceItems;
      dataForServer = formData.map<InvoiceItemDataForServer>((elem) => {
        return {
          ...elem,
          quantity: +elem.quantity,
          invoice_id: _id,
        };
      });
    }

    return invoiceItemsRequestAC.invoiceItemsPost.Actions.invoiceItemsPost(dataForServer, _id);
  }),
);

const afterSuccessDeleteInvoiceEpic = (
  action$: Observable<Action>, state$: StateObservable<RootState>,
) => action$.pipe(
  ofType<RequestInvoiceDeleteSuccess>(invoicesRequestAC.invoicesDelete.ActionTypes.INVOICES_DELETE_SUCCESS),
  map((action) => {
    const {_id} = action.payload.data;

    let dataForServer: number[] = [];
    if (state$.value.invoiceItems.data) {
      dataForServer = state$.value.invoiceItems.data
        .filter((dataElem) => dataElem.invoice_id === _id)
        .map<number>((elem) => elem._id);
    }

    return invoiceItemsRequestAC.invoiceItemsDelete.Actions.invoiceItemsDelete(dataForServer, _id);
  }),
);

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
        return invoiceItemsRequestAC.invoiceItemsPost.Actions.invoiceItemsPost(data, invoice_id);
      }

      case fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_PUT: {
        const {data, invoice_id} = action.payload;
        return invoiceItemsRequestAC.invoiceItemsPut.Actions.invoiceItemsPut(data, invoice_id);
      }

      case fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_DELETE: {
        const {_id, invoice_id} = action.payload;
        return invoiceItemsRequestAC.invoiceItemsDelete.Actions.invoiceItemsDelete(_id, invoice_id);
      }

      default:
        return null;
    }
  }),
);

export const invoiceItemsEpics = [
  loadAllInvoiceItemsEpic,
  updateInvoiceItemsDataEpic,
  afterSuccesPostInvoiceEpic,
  afterSuccessDeleteInvoiceEpic,
  submitInvoiceItemsEpic,
];