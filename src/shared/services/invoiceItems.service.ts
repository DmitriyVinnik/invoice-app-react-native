import { forkJoin, Observable } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { apiEndpoint } from '../constants/env.constants';
import { InvoiceItem, InvoiceItemDataForServer } from "../../redux/invoiceItems/states";

interface GetPayload {
  invoice_id: number,
}

interface PostPayload extends GetPayload {
  data: InvoiceItemDataForServer[],
}

interface PutPayload extends GetPayload {
  data: InvoiceItem[],
}

interface DeletePayload extends GetPayload {
  _id: number[],
}

interface RequestServiceInvoiceItems {
  postInvoiceItem(payload: PostPayload): Observable<AjaxResponse[]>;
  getInvoiceItem(payload?: GetPayload): Observable<AjaxResponse>;
  putInvoiceItem(payload: PutPayload): Observable<AjaxResponse[]>;
  deleteInvoiceItem(payload: DeletePayload): Observable<AjaxResponse[]>;
}

class InvoiceItemsService implements RequestServiceInvoiceItems {

  public postInvoiceItem(payload: PostPayload) {
    const {data, invoice_id} = payload;
    const arrayObservable = data.map<Observable<AjaxResponse>>((elem) => {
      return ajax.post(
        apiEndpoint + 'invoices/' + invoice_id + '/items/',
        JSON.stringify(elem),
        {
          'Content-Type': 'application/json; charset=utf-8',
        }
      )
    });

    return forkJoin(arrayObservable);
  }

  public getInvoiceItem(payload: GetPayload) {
    return ajax.get(apiEndpoint + 'invoices/' + payload.invoice_id + '/items/')
  }

  public putInvoiceItem(payload: PutPayload) {
    const {data, invoice_id} = payload;
    const arrayObservable = data.map<Observable<AjaxResponse>>((elem) => {
      return ajax.put(
        apiEndpoint + 'invoices/' + invoice_id + '/items/' + elem._id,
        JSON.stringify(elem),
        {
          'Content-Type': 'application/json; charset=utf-8',
        }
      )
    });

    return forkJoin(arrayObservable);
  }

  public deleteInvoiceItem(payload: DeletePayload) {
    const {_id, invoice_id} = payload;
    const arrayObservable = _id.map<Observable<AjaxResponse>>((idItem) => {
      return ajax.delete(apiEndpoint + 'invoices/' + invoice_id + '/items/' + idItem)
    });

    return forkJoin(arrayObservable);
  }
}

export default new InvoiceItemsService();
