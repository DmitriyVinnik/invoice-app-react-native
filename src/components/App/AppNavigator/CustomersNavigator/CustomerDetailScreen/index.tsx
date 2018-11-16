import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import CustomerChangeScreen from '../CustomerChangeScreen';
import RegularText from '../../../../../shared/components/RegularText';
import EditButton from '../../../../../shared/components/EditButton';
import style from './style';

import { CustomerDataForServer } from '../../../../../redux/customers/states';
import { CustomersRequestState } from '../../../../../redux/request/nested-states/customers/states';
import { RootState } from '../../../../../redux/store';
import { Dispatch } from 'redux';
import { Customer } from '../../../../../redux/customers/states';
import {
  NavigationInjectedProps,
  NavigationScreenConfig,
  NavigationStackScreenOptions,
} from 'react-navigation';

import { Actions } from '../../../../../redux/customers/AC';
import { Actions as toastActions } from '../../../../../redux/toast/AC';

interface StateProps {
  customersRequests: CustomersRequestState;
}

interface DispatchProps {
  submitChangeForm(data: CustomerDataForServer, _id: number): void;
  selectActiveCustomer(_id: number): void;
  resetSelectionActiveCustomer(): void;
  resetToast(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  customersRequests: state.request.customers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions | toastActions>): DispatchProps => (
  {
    submitChangeForm: (data, _id) => {
      dispatch(Actions.submitCustomerChangeForm(data, _id));
    },
    selectActiveCustomer: (_id) => {
      dispatch(Actions.selectCustomer(_id));
    },
    resetSelectionActiveCustomer: () => {
      dispatch(Actions.resetSelectionCustomer());
    },
    resetToast: () => {
      dispatch(toastActions.hideToast());
    },
  }
);

type Props = StateProps & DispatchProps & NavigationInjectedProps;

interface State {
  isVisibleChangeForm: boolean;
}

class CustomerDetailsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisibleChangeForm: false,
    };
  }

  static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = (
    {navigation},
  ) => {
    const {params} = navigation.state;

    return {
      title: params ? params.customer.name : 'Customer',
      headerTintColor: '#fff',
    };
  }

  public componentDidMount() {
    this.props.selectActiveCustomer(this.customer._id);
  }

  public componentWillUnmount() {
    this.props.resetSelectionActiveCustomer();
  }

  private customer: Customer = this.props.navigation.getParam('customer');

  public toggleCustomerChangeform = (): void => {
    this.setState({
      isVisibleChangeForm: !this.state.isVisibleChangeForm,
    });

    if (this.state.isVisibleChangeForm) {
      this.props.resetToast();
    }
  }

  public handleSubmitCustomerChangeForm = (values: CustomerDataForServer): void => {
    const {submitChangeForm} = this.props;

    this.props.resetToast();
    submitChangeForm(values, this.customer._id);
  }

  render() {
    const {customersRequests} = this.props;
    const {isVisibleChangeForm} = this.state;

    return (
      <View style={style.container}>
        <View style={style.textContainer}>
          <RegularText>
            Name:
            <Text style={style.text}> {this.customer.name}</Text>
          </RegularText>
          <RegularText>
            id:
            <Text style={style.text}> {this.customer._id}</Text>
          </RegularText>
          <RegularText>
            Address:
            <Text style={style.text}> {this.customer.address}</Text>
          </RegularText>
          <RegularText>
            Phone:
            <Text style={style.text}> {this.customer.phone}</Text>
          </RegularText>
        </View>
        <View style={style.editPanel}>
          <View>
            <EditButton
              onPress={this.toggleCustomerChangeform}
            />
          </View>
          <CustomerChangeScreen
            isVisible={isVisibleChangeForm}
            handleClose={this.toggleCustomerChangeform}
            isLoading={customersRequests.customersPut.loading}
            submitForm={this.handleSubmitCustomerChangeForm}
            activeCustomer={this.customer}
          />
        </View>
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(CustomerDetailsScreen);