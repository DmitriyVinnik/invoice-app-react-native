import {initialState as customersGetState} from '../nested-states/customers-get/states';
import {initialState as customersPostState} from '../nested-states/customers-post/states';
import {initialState as customersPutState} from '../nested-states/customers-put/states';
import {initialState as customersDeleteState} from '../nested-states/customers-delete/states';
import {Customer} from '../../../../customers/states';

export interface RequestNestedState {
    loading: boolean;
    loaded: boolean;
    errors: string | null;
    data: Customer[] | Customer | null;
}

export interface CustomersRequestState {
    customersGet: RequestNestedState,
    customersPost: RequestNestedState,
    customersPut: RequestNestedState,
    customersDelete: RequestNestedState,
}

export const initialState: CustomersRequestState = {
    customersGet: customersGetState,
    customersPost: customersPostState,
    customersPut: customersPutState,
    customersDelete: customersDeleteState,
};