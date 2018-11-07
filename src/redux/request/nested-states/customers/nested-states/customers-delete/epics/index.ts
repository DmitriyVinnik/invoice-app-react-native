import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import customersService from '../../../../../../../shared/services/customers.service';
import * as fromActions from '../AC';

export const customersDeleteEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.CUSTOMERS_DELETE),
    switchMap((action: fromActions.Actions): Observable<fromActions.Actions> =>
        customersService.deleteCustomer(action.payload).pipe(
            map(ajaxResponse => {
                return fromActions.Actions.customersDeleteSuccess(ajaxResponse.response)
            }),
            catchError((ajaxErrors: AjaxError) => {
                return of(fromActions.Actions.customersDeleteFail(ajaxErrors.response))
            })
        )
    )
);