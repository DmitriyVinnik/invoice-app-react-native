import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import invoicesService from '../../../../../../../shared/services/invoices.service';
import * as fromActions from '../AC';

export const invoicesPutEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.INVOICES_PUT),
    switchMap((action: fromActions.Actions): Observable<fromActions.Actions> =>
        invoicesService.putInvoice(action.payload).pipe(
            map(ajaxResponse => {
                return fromActions.Actions.invoicesPutSuccess(ajaxResponse.response)
            }),
            catchError((ajaxError: AjaxError) => {
                return of(fromActions.Actions.invoicesPutFail(ajaxError.response))
            })
        )
    )
);