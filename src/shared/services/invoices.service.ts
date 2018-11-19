import { ajax } from 'rxjs/ajax';
import { apiEndpoint } from '../constants/env.constants';
import { RequestPayloadInvoices, RequestServiceInvoices } from '../types/Request';

class InvoicesService implements RequestServiceInvoices {

  public postInvoice(payload: RequestPayloadInvoices) {
    return ajax.post(
      apiEndpoint + 'invoices/',
      JSON.stringify(payload.data),
      {
        'Content-Type': 'application/json; charset=utf-8',
      },
    );
  }

  public getInvoice() {
    return ajax.get(apiEndpoint + 'invoices/');
  }

  public putInvoice(payload: RequestPayloadInvoices) {
    return ajax.put(
      apiEndpoint + 'invoices/' + payload._id,
      JSON.stringify(payload.data),
      {
        'Content-Type': 'application/json; charset=utf-8',
      },
    );
  }

  public deleteInvoice(payload: RequestPayloadInvoices) {
    return ajax.delete(apiEndpoint + 'invoices/' + payload._id);
  }
}

export default new InvoicesService();
