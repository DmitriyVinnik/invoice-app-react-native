import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import invoicesService from '../../../../../../../shared/services/invoices.service';
import * as fromActions from '../AC';

export const invoicesGetEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.INVOICES_GET),
    switchMap((): Observable<fromActions.Actions> =>
        invoicesService.getInvoice().pipe(
            map(ajaxResponse => fromActions.Actions.invoicesGetSuccess(ajaxResponse.response)),
            catchError((ajaxError: AjaxError) => {
                return of(fromActions.Actions.invoicesGetFail(ajaxError.response))
            })
        )
    )
);