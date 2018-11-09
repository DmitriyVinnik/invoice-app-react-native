import React from 'react';

import {WrappedFieldProps} from 'redux-form';
import {ProductsState} from "../../../../../redux/products/states/index";

import {createStyles, StyleRules, Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface OwnProps {
    products: ProductsState,
    _id: string,
    label: string,
}

type Props = OwnProps & WrappedFieldProps & WithStyles<typeof styles>;

const ProductSelectElement: React.SFC<Props> = (props: Props) => {
    const {
        classes, input, _id, label, products: {data}, meta: {touched, error}
    } = props;
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        input.onChange(+event.target.value)
    };
    const menuItems = data.map(product => (
        <MenuItem
            value={product._id}
            key={product._id}
        >
            _id: {product._id}, {product.name} - price {product.price}
        </MenuItem>
    ));

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor={_id}>{label}</InputLabel>
            <Select
                {...input}
                value={input.value}
                onChange={handleChange}
                inputProps={{
                    name: input.name,
                    _id,
                }}
            >
                <MenuItem value=''>None</MenuItem>
                {menuItems}
            </Select>
            {touched && (error && <span>{error}</span>)}
        </FormControl>
    );

};

const styles = (theme: Theme): StyleRules => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

export default withStyles(styles)(ProductSelectElement);
