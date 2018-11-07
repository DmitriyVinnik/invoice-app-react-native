import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import customersService from '../../../../../../../shared/services/customers.service';
import * as fromActions from '../AC';

export const customersPostEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.CUSTOMERS_POST),
    switchMap((action: fromActions.Actions): Observable<fromActions.Actions> =>
        customersService.postCustomer(action.payload).pipe(
            map(ajaxResponse => {
                return fromActions.Actions.customersPostSuccess(ajaxResponse.response)
            }),
            catchError((ajaxError: AjaxError) => {
                return of(fromActions.Actions.customersPostFail(ajaxError.response))
            })
        )
    )
);