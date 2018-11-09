import React, {Component} from 'react';
import Customer from '../Customer/index';
import {Customer as CustomerInterface} from '../../../../../redux/customers/states/index';
import {RequestNestedState} from '../../../../../redux/request/nested-states/customers/states/index';

export interface OwnProps {
    customersData: CustomerInterface[],
    customersRequest: RequestNestedState;
    loadCustomers(): void,
}

export default class CustomerList extends Component<OwnProps> {

    public componentDidMount() {
        const {loadCustomers} = this.props;

        loadCustomers();
    }

    public render() {
        const {customersRequest: {errors, loading, loaded}, customersData} = this.props;
        let customerItems: React.ReactNode | null;

        if (customersData) {
            customerItems = customersData.map(customer => (
                <Customer
                    _id={customer._id}
                    name={customer.name}
                    address={customer.address}
                    phone={customer.phone}
                    key={customer._id}
                />
            ));
        } else {
            customerItems = null;
        }

        if (errors) {
            return (
                <p className='errors'>Error: {errors}</p>
            );
        } else if (loading) {
            return (
                <p className='loader'>Wait a second, loading...</p>
            );
        } else  if (!loaded) {
            return (
                <p className='errors'>Something went wrong! Customers have not loaded, try reloading the page</p>
            )
        }

        return (
            <ul className='entity-list'>
                {customerItems}
            </ul>
        )
    }
}
