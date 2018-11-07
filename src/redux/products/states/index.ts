export interface ProductDataForServer {
    name: string,
    price: number,
}

export interface Product extends ProductDataForServer{
    id: number,
}

export interface ProductsState {
    data: Product[];
    activeProductId: number | null,
}

export const initialState: ProductsState = {
    data: [],
    activeProductId: null,
};
