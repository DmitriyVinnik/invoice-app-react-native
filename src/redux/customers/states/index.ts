export interface CustomerDataForServer {
    name: string,
    address: string,
    phone: string,
}

export interface Customer extends CustomerDataForServer{
    id: number,
}

export interface CustomersState {
    data: Customer[];
    activeCustomerId: number | null,
}

export const initialState: CustomersState = {
    data: [],
    activeCustomerId: null,
};
