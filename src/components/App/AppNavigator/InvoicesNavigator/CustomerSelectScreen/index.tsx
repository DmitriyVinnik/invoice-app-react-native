import React from 'react';
import {compose} from 'redux';
import {connect} from "react-redux";
import {Actions} from "../../../../../redux/customers/AC/index";

import {RootState} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {Customer, CustomersState} from "../../../../../redux/customers/states/index";
import {CustomersRequestState} from "../../../../../redux/request/nested-states/customers/states/index";

import {createStyles, StyleRules, Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface StateProps {
    customers: CustomersState,
    customersRequests: CustomersRequestState,
}

interface DispatchProps {
    loadCustomers(): void,

    selectActiveCustomer(data: Customer[], _id: number): void,
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

class CustomerSelectElement extends React.Component<Props> {
    public componentDidMount() {
        this.props.loadCustomers();
    }

    public handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {selectActiveCustomer, customers: {data}} = this.props;

        selectActiveCustomer(data, +event.target.value)
    };

    public render() {
        const {classes, customers: {activeCustomerId, data}} = this.props;
        const menuItems = data.map(customer => (
            <MenuItem
                value={customer._id}
                key={customer._id}
            >
                {customer.name}, _id: {customer._id}
            </MenuItem>
        ));

        return (
            <form className={classes.root} autoComplete="off">
                <p className={classes.label}>Choose the customer: </p>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="customers-select">Customer:</InputLabel>
                    <Select
                        value={activeCustomerId ? activeCustomerId : ''}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'customers',
                            _id: 'customers-select',
                        }}
                    >
                        <MenuItem value=''>None</MenuItem>
                        {menuItems}
                    </Select>
                </FormControl>
            </form>
        );
    }
}

const styles = (theme: Theme): StyleRules => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    label: {
        fontSize: '18px'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});


const mapStateToProps = (state: RootState): StateProps => ({
    customers: state.customers,
    customersRequests: state.request.customers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
    {
        loadCustomers: () => {
            dispatch(Actions.loadAllCustomers());
        },
        selectActiveCustomer: (data, _id) => {
            dispatch(Actions.selectCustomer(data, _id));
        },
    }
);

export default compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(CustomerSelectElement);
