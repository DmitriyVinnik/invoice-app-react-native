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
  name: string | null;
  handleSubmit(evt: GestureResponderEvent): void;
  handleClose(): void;
}

type Props = OwnProps;

const CustomerDeleteScreen: React.SFC<Props> = (props: Props) => {
  const {name, isVisible, isLoading, handleSubmit, handleClose} = props;

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
            <Text style={style.textTitle}>Delete customer.</Text>
          </RegularText>
        </View>
        <View style={style.contentWraper}>
          <ToastRequest/>
          {
            name &&
            <RegularText>
              You really want to delete the customer:
              <Text style={style.textTitle}> {name}</Text>
            </RegularText>
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

export default CustomerDeleteScreen;
