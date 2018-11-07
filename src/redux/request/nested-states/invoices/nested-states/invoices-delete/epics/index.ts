import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import invoicesService from '../../../../../../../shared/services/invoices.service';
import * as fromActions from '../AC';

export const invoicesDeleteEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.INVOICES_DELETE),
    switchMap((action: fromActions.Actions): Observable<fromActions.Actions> =>
        invoicesService.deleteInvoice(action.payload).pipe(
            map(ajaxResponse => {
                return fromActions.Actions.invoicesDeleteSuccess(ajaxResponse.response)
            }),
            catchError((ajaxErrors: AjaxError) => {
                return of(fromActions.Actions.invoicesDeleteFail(ajaxErrors.response))
            })
        )
    )
);