import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { View, Text, Modal } from 'react-native';
import { reduxForm, Field, InjectedFormProps, FormErrors, FormAction, initialize } from 'redux-form';
import FormField from '../../../../../shared/components/FormField/index';
import ErrorRequestView from '../../../../../shared/components/ErrorRequestView';
import RegularText from '../../../../../shared/components/RegularText';
import RegularButton from '../../../../../shared/components/RegularButton';
import style from './style';

import { CustomerDataForServer, Customer } from '../../../../../redux/customers/states';
import { Error } from '../../../../../shared/types/Request';

type FormData = CustomerDataForServer;

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  errors: Error | null;
  activeCustomer?: Customer;
  handleClose(): void;
  submitForm(values: FormData): void;
}

interface DispatchProps {
  initializeForm: (values: FormData) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<FormAction>): DispatchProps => (
  {
    initializeForm: (values) => {
      dispatch(initialize('customerChange', values));
    },
  }
);

type Props = OwnProps & DispatchProps & InjectedFormProps<FormData, OwnProps>;

class CustomerChangeForm extends React.Component<Props> {

  public componentDidMount() {
    this.setFormValues();
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.activeCustomer !== this.props.activeCustomer) {
      this.setFormValues();
    }
  }

  public render() {
    const {isVisible, handleSubmit, isLoading, errors, pristine, handleClose, submitForm} = this.props;

    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={isVisible}
        onRequestClose={handleClose}
      >
        <View style={style.container}>
          <View style={style.headerWraper}>
            <RegularText>
              <Text style={style.textTitle}>Change customer.</Text>
            </RegularText>
          </View>
          <View style={style.fieldWraper}>
            {errors && <ErrorRequestView errors={errors}/>}
            <Field
              name='name'
              component={FormField}
              labelText='Customer`s name: '
            />
            <Field
              name='address'
              component={FormField}
              labelText='Customer`s address: '
            />
            <Field
              name='phone'
              component={FormField}
              keyboard='numeric'
              labelText='Customer`s phone: '
            />
          </View>
          <View style={style.buttonWraper}>
            <RegularButton
              onPress={handleClose}
              title='Cancel'
            />
            <RegularButton
              onPress={handleSubmit(submitForm)}
              title='Submit'
              disabled={pristine || isLoading}
            />
          </View>
        </View>
      </Modal>
    );
  }

  private setFormValues() {
    const {activeCustomer} = this.props;

    if (activeCustomer) {
      const initialFormValue: FormData = {
        name: activeCustomer.name,
        phone: activeCustomer.phone,
        address: activeCustomer.address,
      };

      this.props.initializeForm(initialFormValue);
    }
  }
}

const validate = (values: FormData): FormErrors => {
  const error: FormErrors<FormData> = {};

  if (!values.name) {
    error.name = 'Required';
  }

  if (!values.address) {
    error.address = 'Required';
  }

  if (!values.phone) {
    error.phone = 'Required';
  }

  return error;
};

export default compose(
  reduxForm<FormData, OwnProps>({
    form: 'customerChange',
    validate,
  }),
  connect<DispatchProps>(null, mapDispatchToProps),
)(CustomerChangeForm);
