import React from 'react';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';

import { RootState } from '../../../../redux/store';

interface StateProps {
  message: string | null;
  error: string | null;
}

const mapStateToProps = (state: RootState): StateProps => ({
  message: state.toast.message,
  error: state.toast.error,
});

type Props = StateProps;

class RootToaster extends React.PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.message && this.props.message !== prevProps.message) {
      this.toast.show(this.props.message);
    }

    if (this.props.error && this.props.error !== prevProps.error) {
      this.toast.show(this.props.error);
    }
  }

  public toast: Toast;

  private setToastRef = (elem: Toast) => {
    this.toast = elem;
  }

  render() {
    return (
      <Toast
        ref={this.setToastRef}
        opacity={0.75}
      />
    );
  }
}

export default connect<StateProps>(mapStateToProps)(RootToaster);