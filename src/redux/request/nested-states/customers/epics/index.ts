import {customersDeleteEpic} from '../nested-states/customers-delete/epics';
import {customersGetEpic} from '../nested-states/customers-get/epics';
import {customersPostEpic} from '../nested-states/customers-post/epics';
import {customersPutEpic} from '../nested-states/customers-put/epics';

export const customersEpic = [
    customersDeleteEpic,
    customersGetEpic,
    customersPostEpic,
    customersPutEpic,
];