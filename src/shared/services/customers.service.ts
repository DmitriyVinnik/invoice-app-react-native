import { ajax } from 'rxjs/ajax';
import {apiEndpoint} from '../constants/env.constants';
import { RequestServiceCustomers, RequestPayloadCustomers } from '../types/Request'

class CustomersService implements RequestServiceCustomers {

  public postCustomer(payload: RequestPayloadCustomers) {
    return ajax.post(
      apiEndpoint + 'customers/',
      JSON.stringify(payload.data),
      {
        'Content-Type': 'application/json; charset=utf-8',
      }
    )
  }

  public getCustomer() {
    return ajax.get(apiEndpoint + 'customers/')
  }

  public putCustomer(payload: RequestPayloadCustomers) {
    return ajax.put(
      apiEndpoint + 'customers/' + payload._id,
      JSON.stringify(payload.data),
      {
        'Content-Type': 'application/json; charset=utf-8',
      }
    )
  }

  public deleteCustomer(payload: RequestPayloadCustomers) {
    return ajax.delete(apiEndpoint + 'customers/' + payload._id)
  }
}

export default new CustomersService();
