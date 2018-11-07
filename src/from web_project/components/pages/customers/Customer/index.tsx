import React from 'react';
import {connect} from 'react-redux';
import {Actions} from '../../../../../redux/customers/AC/index';

import {Dispatch} from 'redux';
import {Customer as CustomerInterface} from '../../../../../redux/customers/states/index';
import {RootState} from '../../../../../redux/store';

type OwnProps = CustomerInterface

interface StateProps {
    activeCustomerId: number | null,
    customersData: CustomerInterface[],
}

interface DispatchProps {
    selectActiveCustomer(data: CustomerInterface[], id: number): void,

    resetSelectionActiveCustomer(): void,
}

type Props = StateProps & DispatchProps & OwnProps

const Customer: React.SFC<Props> = (props: Props) => {
    const {
        id, name, address, phone, activeCustomerId, customersData,
        resetSelectionActiveCustomer, selectActiveCustomer,
    } = props;
    const onClickCustomer = (): void => {
        selectActiveCustomer(customersData, id);
    };
    const isCustomerActive = activeCustomerId === id;
    const onReClickCustomer = (): void => {
        resetSelectionActiveCustomer();
    };

    return (
        <li
            onClick={!isCustomerActive ? onClickCustomer : onReClickCustomer}
            className={
                isCustomerActive ?
                    'entity-list__item entity-list__item--active' :
                    'entity-list__item'
            }
        >
            <ul className='customer-list'>
                <li className='customer-list__item'>
                    <div>
                        Name:
                        <span className='customer-list__title'> {name}</span>,
                    </div>
                    <div>
                        id:
                        <span className='customer-list__title'> {id}</span>
                    </div>
                </li>
                <li className='customer-list__item'>
                    <div>
                        Address:
                        <span className='customer-list__title'> {address}</span>
                    </div>
                </li>
                <li className='customer-list__item'>
                    <div>
                        Phone:
                        <span className='customer-list__title'> {phone}</span>
                    </div>
                </li>
            </ul>
        </li>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    activeCustomerId: state.customers.activeCustomerId,
    customersData: state.customers.data,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
    {
        selectActiveCustomer: (data, id) => {
            dispatch(Actions.selectCustomer(data, id));
        },
        resetSelectionActiveCustomer: () => {
            dispatch(Actions.resetSelectionCustomer());
        },
    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Customer)