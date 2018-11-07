import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import productsService from '../../../../../../../shared/services/products.service';
import * as fromActions from '../AC';

export const productsPutEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.PRODUCTS_PUT),
    switchMap((action: fromActions.Actions): Observable<fromActions.Actions> =>
        productsService.putProduct(action.payload).pipe(
            map(ajaxResponse => {
                return fromActions.Actions.productsPutSuccess(ajaxResponse.response)
            }),
            catchError((ajaxError: AjaxError) => {
                return of(fromActions.Actions.productsPutFail(ajaxError.response))
            })
        )
    )
);