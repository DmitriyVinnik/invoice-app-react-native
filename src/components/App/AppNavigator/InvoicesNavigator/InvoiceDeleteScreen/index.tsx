import React from 'react';
import {
  View, Text, Modal,
  GestureResponderEvent,
} from 'react-native';
import ToastRequest from '../../../../../shared/components/ToastRequest/index';
import RegularText from '../../../../../shared/components/RegularText';
import RegularButton from '../../../../../shared/components/RegularButton';
import style from './style';

export interface OwnProps {
  isVisible: boolean;
  isLoading: boolean;
  _id: number | null;
  handleSubmit(evt: GestureResponderEvent): void;
  handleClose(): void;
}

type Props = OwnProps;

const InvoiceDeleteForm: React.SFC<Props> = (props: Props) => {
  const {_id, isVisible, isLoading, handleSubmit, handleClose} = props;

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
          <ToastRequest />
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
