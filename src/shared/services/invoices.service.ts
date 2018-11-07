import {ajax} from 'rxjs/ajax';
import {RequestPayloadInvoices, RequestServiceInvoices} from '../types/Request'

const INVOICES_URL = 'http://localhost:8000/api/invoices/';

class InvoicesService implements RequestServiceInvoices {

    public postInvoice(payload: RequestPayloadInvoices) {
        return ajax.post(
            INVOICES_URL,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public getInvoice() {
        return ajax.get(INVOICES_URL)
    }

    public putInvoice(payload: RequestPayloadInvoices) {
        return ajax.put(
            INVOICES_URL + payload.id,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public deleteInvoice(payload: RequestPayloadInvoices) {
        return ajax.delete(INVOICES_URL + payload.id)
    }
}

export default new InvoicesService();
