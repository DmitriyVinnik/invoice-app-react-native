import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import customersService from '../../../../../../../shared/services/customers.service';
import * as fromActions from '../AC';

export const customersPutEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.CUSTOMERS_PUT),
    switchMap((action: fromActions.Actions): Observable<fromActions.Actions> =>
        customersService.putCustomer(action.payload).pipe(
            map(ajaxResponse => {
                return fromActions.Actions.customersPutSuccess(ajaxResponse.response)
            }),
            catchError((ajaxError: AjaxError) => {
                return of(fromActions.Actions.customersPutFail(ajaxError.response))
            })
        )
    )
);