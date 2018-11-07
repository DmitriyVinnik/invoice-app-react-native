import * as customersDelete from '../nested-states/customers-delete/AC';
import * as customersGet from '../nested-states/customers-get/AC';
import * as customersPost from '../nested-states/customers-post/AC';
import * as customersPut from '../nested-states/customers-put/AC';
import {ActionsUnion} from '../../../../../shared/types/ActionsUnion';

const requestActionsFail = {
    get: customersGet.Actions.customersGetFail,
    post: customersPost.Actions.customersPostFail,
    put: customersPut.Actions.customersPutFail,
    delete: customersDelete.Actions.customersDeleteFail,
};

const requestActionsSuccess = {
    get: customersGet.Actions.customersGetSuccess,
    post: customersPost.Actions.customersPostSuccess,
    put: customersPut.Actions.customersPutSuccess,
    delete: customersDelete.Actions.customersDeleteSuccess,
};

export const customersRequestAC = {
    customersDelete,
    customersGet,
    customersPost,
    customersPut,
};

export type RequestActionsFail = ActionsUnion<typeof requestActionsFail>
export type RequestActionsSuccess = ActionsUnion<typeof requestActionsSuccess>
