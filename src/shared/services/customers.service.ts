import {ajax} from 'rxjs/ajax';
import {RequestServiceCustomers, RequestPayloadCustomers} from '../types/Request'

const CUSTOMERS_URL = 'http://localhost:8000/api/customers/';

class CustomersService implements RequestServiceCustomers {

    public postCustomer(payload: RequestPayloadCustomers) {
        return ajax.post(
            CUSTOMERS_URL,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public getCustomer() {
        return ajax.get(CUSTOMERS_URL)
    }

    public putCustomer(payload: RequestPayloadCustomers) {
        return ajax.put(
            CUSTOMERS_URL + payload.id,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public deleteCustomer(payload: RequestPayloadCustomers) {
        return ajax.delete(CUSTOMERS_URL + payload.id)
    }
}

export default new CustomersService();
