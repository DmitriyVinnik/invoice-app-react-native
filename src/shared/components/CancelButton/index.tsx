import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './style';

type Props = TouchableOpacityProps;

const CancelButton: React.SFC<Props> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={props.disabled ? [style.button, style.disabled] : style.button}
    >
      <View>
        <Icon name='clear' size={40} color='#5d0756'/>
      </View>
    </TouchableOpacity>
  );
};

export default CancelButton;
