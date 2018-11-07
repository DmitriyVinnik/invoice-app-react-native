import {combineReducers} from 'redux';
import {reducer as customersDeleteReducer} from '../nested-states/customers-delete/reducers';
import {reducer as customersGetReducer} from '../nested-states/customers-get/reducers';
import {reducer as customersPostReducer} from '../nested-states/customers-post/reducers';
import {reducer as customersPutReducer} from '../nested-states/customers-put/reducers';

export const customersReducer = combineReducers({
    customersGet: customersGetReducer,
    customersDelete: customersDeleteReducer,
    customersPost: customersPostReducer,
    customersPut: customersPutReducer,
});