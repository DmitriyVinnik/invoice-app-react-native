import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import InvoiceItemsService from '../../../../../../../shared/services/invoiceItems.service';
import * as fromActions from '../AC';

export const invoiceItemsGetEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.INVOICE_ITEMS_GET),
    switchMap((action: fromActions.GetAction): Observable<fromActions.Actions> =>
        InvoiceItemsService.getInvoiceItem(action.payload).pipe(
            map(ajaxResponse => {
                return fromActions.Actions.invoiceItemsGetSuccess(ajaxResponse.response)
            }),
            catchError((ajaxError: AjaxError) => {
                return of(fromActions.Actions.invoiceItemsGetFail(ajaxError.response))
            })
        )
    )
);