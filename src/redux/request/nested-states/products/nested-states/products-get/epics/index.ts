import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import productsService from '../../../../../../../shared/services/products.service';
import * as fromActions from '../AC';

export const productsGetEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.PRODUCTS_GET),
    switchMap((): Observable<fromActions.Actions> =>
        productsService.getProduct().pipe(
            map(ajaxResponse => fromActions.Actions.productsGetSuccess(ajaxResponse.response)),
            catchError((ajaxError: AjaxError) => {
                return of(fromActions.Actions.productsGetFail(ajaxError.response))
            })
        )
    )
);