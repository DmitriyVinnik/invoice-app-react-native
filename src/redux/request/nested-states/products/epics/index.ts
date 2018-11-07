import {productsDeleteEpic} from '../nested-states/products-delete/epics';
import {productsGetEpic} from '../nested-states/products-get/epics';
import {productsPostEpic} from '../nested-states/products-post/epics';
import {productsPutEpic} from '../nested-states/products-put/epics';

export const productsEpic = [
    productsDeleteEpic,
    productsGetEpic,
    productsPostEpic,
    productsPutEpic,
];