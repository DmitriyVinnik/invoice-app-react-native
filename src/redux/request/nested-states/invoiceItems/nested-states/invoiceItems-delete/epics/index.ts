import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import InvoiceItemsService from '../../../../../../../shared/services/invoiceItems.service';
import * as fromActions from '../AC';
import {InvoiceItem} from "../../../../../../invoiceItems/states";

export const invoiceItemsDeleteEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.INVOICE_ITEMS_DELETE),
    switchMap((action: fromActions.DeleteAction): Observable<fromActions.Actions> =>
        InvoiceItemsService.deleteInvoiceItem(action.payload).pipe(
            map(ajaxResponse => {
                const response = ajaxResponse.map<InvoiceItem>((ajaxResp) => ajaxResp.response);

                return fromActions.Actions.invoiceItemsDeleteSuccess(response)
            }),
            catchError((ajaxErrors: AjaxError) => {
                return of(fromActions.Actions.invoiceItemsDeleteFail(ajaxErrors.response))
            })
        )
    )
);