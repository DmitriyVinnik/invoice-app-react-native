import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import style from './style';

import { Actions } from '../../../redux/toast/AC';

import { Dispatch } from 'redux';
import { ToastState } from '../../../redux/toast/states';
import { RootState } from '../../../redux/store';

interface StateProps {
  toast: ToastState;
}

interface DispatchProps {
  resetToast(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  toast: state.toast,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
  {
    resetToast: () => {
      dispatch(Actions.hideToast());
    },
  }
);

type Props = StateProps & DispatchProps;

class ToastRequest extends React.Component<Props> {

  componentDidUpdate(prevProps: Props) {
    if (this.props.toast.message && this.props.toast.message !== prevProps.toast.message ) {
      setTimeout(this.props.resetToast, 5000);
    }

    if (this.props.toast.error && this.props.toast.error !== prevProps.toast.error ) {
      setTimeout(this.props.resetToast, 5000);
    }
  }

  render() {
    const {toast} = this.props;

    return (
      <View style={style.container}>
        {
          toast.error ?
            (<Text style={style.errorText}>
              Error: {toast.error}
            </Text>) :
            (<Text style={style.messageText}>{toast.message}</Text>)
        }
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ToastRequest);
