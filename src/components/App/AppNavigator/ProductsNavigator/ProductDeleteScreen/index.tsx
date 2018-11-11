import React from 'react';

import {
  View, Text, TouchableOpacity, Modal,
  GestureResponderEvent,
} from 'react-native';
import ErrorRequestView from '../../../../../shared/components/ErrorRequestView';

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
      <View>
        <Text>Delete product.</Text>
      </View>
      <View>
        <View>
          {errors && <ErrorRequestView errors={errors}/>}
          {
            name &&
            <View>
              You really want to delete the product:
              <View> {name}</View>
            </View>
          }
          <View>
            <View>
              <TouchableOpacity
                onPress={handleClose}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isLoading}
                onPress={handleSubmit}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProductDeleteForm;
