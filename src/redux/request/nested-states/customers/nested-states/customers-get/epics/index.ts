import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import customersService from '../../../../../../../shared/services/customers.service';
import * as fromActions from '../AC';

export const customersGetEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.CUSTOMERS_GET),
    switchMap((): Observable<fromActions.Actions> =>
        customersService.getCustomer().pipe(
            map(ajaxResponse => fromActions.Actions.customersGetSuccess(ajaxResponse.response)),
            catchError((ajaxError: AjaxError) => {
                return of(fromActions.Actions.customersGetFail(ajaxError.response))
            })
        )
    )
);