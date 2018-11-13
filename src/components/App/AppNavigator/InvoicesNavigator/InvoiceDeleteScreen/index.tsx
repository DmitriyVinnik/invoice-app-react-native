import React from 'react';
import {
  View, Text, Modal,
  GestureResponderEvent,
} from 'react-native';
import ErrorRequestView from '../../../../../shared/components/ErrorRequestView';
import RegularText from '../../../../../shared/components/RegularText';
import RegularButton from '../../../../../shared/components/RegularButton';
import style from './style';

import { Error } from '../../../../../shared/types/Request';

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  errors: Error | null;
  _id: number | null;
  handleSubmit(evt: GestureResponderEvent): void;
  handleClose(): void;
}

type Props = OwnProps;

const InvoiceDeleteForm: React.SFC<Props> = (props: Props) => {
  const {_id, isVisible, isLoading, errors, handleSubmit, handleClose} = props;

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
            <Text style={style.textTitle}>Delete invoice.</Text>
          </RegularText>
        </View>
        <View style={style.contentWraper}>
          {errors && <ErrorRequestView errors={errors}/>}
          {
            _id &&
            <View style={style.contentWraper}>
                <RegularText>
                    You really want to delete the invoice?
                </RegularText>
            </View>
          }
        </View>
        <View style={style.buttonWraper}>
          <RegularButton
            onPress={handleClose}
            title='Cancel'
          />
          <RegularButton
            onPress={handleSubmit}
            title='Delete'
            disabled={isLoading}
          />
        </View>
      </View>
    </Modal>
  );
};

export default InvoiceDeleteForm;
