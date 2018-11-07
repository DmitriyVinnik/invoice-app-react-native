import {Action} from 'redux';
import {Observable} from 'rxjs';
import {ofType, StateObservable} from 'redux-observable';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import * as fromActions from '../AC';
import {productsRequestAC, RequestActionsSuccess} from '../../request/nested-states/products/AC';
import {RootState} from "../../store";

const loadAllProductsEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.PRODUCTS_LOAD_ALL),
    withLatestFrom(state$),
    filter(([,state]) => {
        const {loaded, loading} = state.request.products.productsGet;

        return  (!loaded && !loading) === true;
    }),
    map(() => productsRequestAC.productsGet.Actions.productsGet())
);

const updateProductsDataEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<RequestActionsSuccess>(
        productsRequestAC.productsGet.ActionTypes.PRODUCTS_GET_SUCCESS,
        productsRequestAC.productsPost.ActionTypes.PRODUCTS_POST_SUCCESS,
        productsRequestAC.productsPut.ActionTypes.PRODUCTS_PUT_SUCCESS,
        productsRequestAC.productsDelete.ActionTypes.PRODUCTS_DELETE_SUCCESS,
    ),
    map((action) => {

        switch (action.type) {
            case productsRequestAC.productsGet.ActionTypes.PRODUCTS_GET_SUCCESS:
            case productsRequestAC.productsPost.ActionTypes.PRODUCTS_POST_SUCCESS:
            case productsRequestAC.productsPut.ActionTypes.PRODUCTS_PUT_SUCCESS: {
                const {data} = action.payload;

                return fromActions.Actions.setProductsData(data)
            }

            case productsRequestAC.productsDelete.ActionTypes.PRODUCTS_DELETE_SUCCESS: {
                const {data} = action.payload;

                return fromActions.Actions.updateProductsDataAfterDeleteRequest(data)
            }

            default:
                return null;
        }

    })
);

const submitProductFormsEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(
        fromActions.ActionTypes.PRODUCTS_SUBMIT_ADD_FORM,
        fromActions.ActionTypes.PRODUCTS_SUBMIT_CHANGE_FORM,
        fromActions.ActionTypes.PRODUCTS_SUBMIT_DELETE_FORM,
    ),
    map((action) => {

        switch (action.type) {
            case fromActions.ActionTypes.PRODUCTS_SUBMIT_ADD_FORM: {
                const {data} = action.payload;

                return productsRequestAC.productsPost.Actions.productsPost(data)
            }

            case fromActions.ActionTypes.PRODUCTS_SUBMIT_CHANGE_FORM: {
                const {data, id} = action.payload;

                return productsRequestAC.productsPut.Actions.productsPut(data, id)
            }

            case fromActions.ActionTypes.PRODUCTS_SUBMIT_DELETE_FORM: {
                const {id} = action.payload;

                return productsRequestAC.productsDelete.Actions.productsDelete(id)
            }

            default:
                return null;
        }
    })
);

export const productsEpics = [
    loadAllProductsEpic,
    updateProductsDataEpic,
    submitProductFormsEpic,
];