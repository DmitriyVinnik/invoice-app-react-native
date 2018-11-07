import {Action} from 'redux';
import {Observable} from 'rxjs';
import {ofType, StateObservable} from 'redux-observable';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import * as fromActions from '../AC';
import {customersRequestAC, RequestActionsSuccess} from '../../request/nested-states/customers/AC';
import {RootState} from '../../store';

const loadAllCustomersEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.CUSTOMERS_LOAD_ALL),
    withLatestFrom(state$),
    filter(([, state]) => {
        const {loaded, loading} = state.request.customers.customersGet;

        return (!loaded && !loading) === true;
    }),
    map(() => customersRequestAC.customersGet.Actions.customersGet())
);

const updateCustomersDataEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<RequestActionsSuccess>(
        customersRequestAC.customersGet.ActionTypes.CUSTOMERS_GET_SUCCESS,
        customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_SUCCESS,
        customersRequestAC.customersPut.ActionTypes.CUSTOMERS_PUT_SUCCESS,
        customersRequestAC.customersDelete.ActionTypes.CUSTOMERS_DELETE_SUCCESS,
    ),
    map((action) => {

        switch (action.type) {
            case customersRequestAC.customersGet.ActionTypes.CUSTOMERS_GET_SUCCESS:
            case customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_SUCCESS:
            case customersRequestAC.customersPut.ActionTypes.CUSTOMERS_PUT_SUCCESS: {
                const {data} = action.payload;

                return fromActions.Actions.setCustomersData(data)
            }

            case customersRequestAC.customersDelete.ActionTypes.CUSTOMERS_DELETE_SUCCESS: {
                const {data} = action.payload;

                return fromActions.Actions.updateCustomersDataAfterDeleteRequest(data)
            }
        }
    })
);

const submitCustomerFormsEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(
        fromActions.ActionTypes.CUSTOMERS_SUBMIT_ADD_FORM,
        fromActions.ActionTypes.CUSTOMERS_SUBMIT_CHANGE_FORM,
        fromActions.ActionTypes.CUSTOMERS_SUBMIT_DELETE_FORM,
    ),
    map((action) => {

        switch (action.type) {
            case fromActions.ActionTypes.CUSTOMERS_SUBMIT_ADD_FORM: {
                const {data} = action.payload;

                return customersRequestAC.customersPost.Actions.customersPost(data)
            }

            case fromActions.ActionTypes.CUSTOMERS_SUBMIT_CHANGE_FORM: {
                const {data, id} = action.payload;

                return customersRequestAC.customersPut.Actions.customersPut(data, id)
            }

            case fromActions.ActionTypes.CUSTOMERS_SUBMIT_DELETE_FORM: {
                const {id} = action.payload;

                return customersRequestAC.customersDelete.Actions.customersDelete(id)
            }

            default:
                return null;
        }
    })
);

export const customersEpics = [
    loadAllCustomersEpic,
    updateCustomersDataEpic,
    submitCustomerFormsEpic,
];