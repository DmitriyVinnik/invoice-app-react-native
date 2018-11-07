import {Observable} from "rxjs";
import {AjaxResponse} from "rxjs/ajax";
import {CustomerDataForServer} from "../../redux/customers/states";
import {ProductDataForServer} from "../../redux/products/states";
import {InvoiceDataForServer} from "../../redux/invoices/states";
// import {InvoiceItemDataForServer} from "../../redux/invoiceItems/states";

interface RequestPayload {
    errors?: string,
    id?: number
}

export interface RequestPayloadCustomers extends RequestPayload {
    data?: CustomerDataForServer,
}

export interface RequestPayloadProducts extends RequestPayload {
    data?: ProductDataForServer,
}

export interface RequestPayloadInvoices extends RequestPayload {
    data?: InvoiceDataForServer,
}

// export interface RequestPayloadInvoiceItems extends RequestPayload {
//     data: InvoiceItemDataForServer[],
//     invoice_id: number,
// }

export interface RequestServiceCustomers {
    postCustomer(payload: RequestPayloadCustomers): Observable<AjaxResponse>;
    getCustomer(payload?: RequestPayloadCustomers): Observable<AjaxResponse>;
    putCustomer(payload: RequestPayloadCustomers): Observable<AjaxResponse>;
    deleteCustomer(payload: RequestPayloadCustomers): Observable<AjaxResponse>;
}

export interface RequestServiceProducts {
    postProduct(payload: RequestPayloadProducts): Observable<AjaxResponse>;
    getProduct(payload?: RequestPayloadProducts): Observable<AjaxResponse>;
    putProduct(payload: RequestPayloadProducts): Observable<AjaxResponse>;
    deleteProduct(payload: RequestPayloadProducts): Observable<AjaxResponse>;
}

export interface RequestServiceInvoices {
    postInvoice(payload: RequestPayloadInvoices): Observable<AjaxResponse>;
    getInvoice(payload?: RequestPayloadInvoices): Observable<AjaxResponse>;
    putInvoice(payload: RequestPayloadInvoices): Observable<AjaxResponse>;
    deleteInvoice(payload: RequestPayloadInvoices): Observable<AjaxResponse>;
}

// export interface RequestServiceInvoiceItems {
//     postInvoiceItem(payload: RequestPayloadInvoiceItems): Observable<AjaxResponse[]>;
//     getInvoiceItem(payload?: RequestPayloadInvoiceItems): Observable<AjaxResponse>;
//     putInvoiceItem(payload: RequestPayloadInvoiceItems): Observable<AjaxResponse>;
//     deleteInvoiceItem(payload: RequestPayloadInvoiceItems): Observable<AjaxResponse>;
// }

