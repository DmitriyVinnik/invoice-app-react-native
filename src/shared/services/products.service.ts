import { ajax } from 'rxjs/ajax';
import { apiEndpoint } from '../constants/env.constants';
import { RequestPayloadProducts, RequestServiceProducts } from '../types/Request'

class ProductsService implements RequestServiceProducts {

  public postProduct(payload: RequestPayloadProducts) {
    return ajax.post(
      apiEndpoint + 'products/',
      JSON.stringify(payload.data),
      {
        'Content-Type': 'application/json; charset=utf-8',
      }
    )
  }

  public getProduct() {
    return ajax.get(apiEndpoint + 'products/')
  }

  public putProduct(payload: RequestPayloadProducts) {
    return ajax.put(
      apiEndpoint + 'products/' + payload.id,
      JSON.stringify(payload.data),
      {
        'Content-Type': 'application/json; charset=utf-8',
      }
    )
  }

  public deleteProduct(payload: RequestPayloadProducts) {
    return ajax.delete(apiEndpoint + 'products/' + payload.id)
  }
}

export default new ProductsService();
