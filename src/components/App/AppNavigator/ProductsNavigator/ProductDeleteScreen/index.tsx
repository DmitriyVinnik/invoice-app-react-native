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
  name: string | null;
  handleSubmit(evt: GestureResponderEvent): void;
  handleClose(): void;
}

type Props = OwnProps;

const ProductDeleteForm: React.SFC<Props> = (props: Props) => {
  const {name, isVisible, isLoading, errors, handleSubmit, handleClose} = props;

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
            <Text style={style.textTitle}>Delete product.</Text>
          </RegularText>
        </View>
        <View style={style.contentWraper}>
          {errors && <ErrorRequestView errors={errors}/>}
          {
            name &&
            <RegularText>
                You really want to delete the product:
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

export default ProductDeleteForm;
