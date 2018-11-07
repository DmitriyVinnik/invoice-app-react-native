import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
    id: number | null,

    handleSubmit(evt: React.FormEvent<HTMLFormElement>): void,

    handleClose(): void,
}

type Props = OwnProps

const InvoiceDeleteForm: React.SFC<Props> = (props: Props) => {
    const {id, isVisible, isLoading, errors, handleSubmit, handleClose} = props;

    return (
        <Dialog
            open={isVisible}
            onClose={handleClose}
            aria-labelledby="customer-delete-dialog-title"
        >
            <DialogTitle
                id="customer-delete-dialog-title"
                className='form__title'
            >
                <span className='form__title'>Delete invoice.</span>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    {errors && (<span className='errors'>Error: {errors}</span>)}
                    {id &&
                    <DialogContentText>
                        You really want to delete the invoice - ID:
                        <span className='form__title form__title--small'> {id}</span>
                    </DialogContentText>}
                    <DialogActions>
                        <div className='form__btn-wraper'>
                            <Button
                                onClick={handleClose}
                                variant="contained"
                                color="primary"
                            >
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                disabled={isLoading}
                                variant="contained"
                                color="primary"
                            >
                                Delete
                            </Button>
                        </div>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InvoiceDeleteForm;
