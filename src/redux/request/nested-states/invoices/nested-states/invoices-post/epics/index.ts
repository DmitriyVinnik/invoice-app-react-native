import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import invoicesService from '../../../../../../../shared/services/invoices.service';
import * as fromActions from '../AC';

export const invoicesPostEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.INVOICES_POST),
    switchMap((action: fromActions.Actions): Observable<fromActions.Actions> =>
        invoicesService.postInvoice(action.payload).pipe(
            map(ajaxResponse => {
                return fromActions.Actions.invoicesPostSuccess(ajaxResponse.response)
            }),
            catchError((ajaxError: AjaxError) => {
                return of(fromActions.Actions.invoicesPostFail(ajaxError.response))
            })
        )
    )
);