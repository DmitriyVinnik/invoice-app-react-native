import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Actions} from '../../redux/toast/AC/index';

import {Dispatch} from 'redux';
import {ToastState} from '../../redux/toast/states/index';
import {RootState} from '../../redux/store';

import {withStyles, WithStyles, createStyles, Theme, StyleRules} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

declare var window: any;
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

type StateProps = ToastState

interface DispatchProps {
    closeToast: () => void
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>

const Toast = (props: Props) => {
    const {message, error, closeToast, isOpen, classes} = props;
    const handleClose = (event: React.MouseEvent<HTMLElement>, reason?: string): void => {
        if (reason === 'clickaway') {
            return;
        }

        closeToast();
    };
    const getMessageContent = (): React.ReactNode => {
        if (error) {
            return (
                <span>{error}</span>
            )
        }

        return (
            <span>{message}</span>
        )
    };

    return (
        <Typography classes={classes} component='div'>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={isOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={getMessageContent()}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.display1}
                        onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>,
                ]}
            />
        </Typography>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    isOpen: state.toast.isOpen,
    message: state.toast.message,
    error: state.toast.error,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
    {
        closeToast: () => {
            dispatch(Actions.hideToast());
        },
    }
);

const styles = (theme: Theme): StyleRules => createStyles({
    display1: {
        padding: theme.spacing.unit / 2,
    },
});

export default compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Toast);
