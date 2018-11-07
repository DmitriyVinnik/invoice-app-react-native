import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import productsService from '../../../../../../../shared/services/products.service';
import * as fromActions from '../AC';

export const productsDeleteEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.PRODUCTS_DELETE),
    switchMap((action: fromActions.Actions): Observable<fromActions.Actions> =>
        productsService.deleteProduct(action.payload).pipe(
            map(ajaxResponse => {
                return fromActions.Actions.productsDeleteSuccess(ajaxResponse.response)
            }),
            catchError((ajaxErrors: AjaxError) => {
                return of(fromActions.Actions.productsDeleteFail(ajaxErrors.response))
            })
        )
    )
);