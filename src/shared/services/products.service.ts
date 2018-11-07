import {ajax} from 'rxjs/ajax';
import {RequestPayloadProducts, RequestServiceProducts} from '../types/Request'

const PRODUCTS_URL = 'http://localhost:8000/api/products/';

class ProductsService implements RequestServiceProducts {

    public postProduct(payload: RequestPayloadProducts) {
        return ajax.post(
            PRODUCTS_URL,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public getProduct() {
        return ajax.get(PRODUCTS_URL)
    }

    public putProduct(payload: RequestPayloadProducts) {
        return ajax.put(
            PRODUCTS_URL + payload.id,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public deleteProduct(payload: RequestPayloadProducts) {
        return ajax.delete(PRODUCTS_URL + payload.id)
    }
}

export default new ProductsService();
