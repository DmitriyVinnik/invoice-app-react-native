import React from 'react';
import { TouchableOpacityProps, View, Text } from 'react-native';
import RegularText from '../RegularText';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from './style';

type Props = TouchableOpacityProps;

const OkButton: React.SFC<Props> = (props) => {
  return (
    <View style={props.disabled ? [style.changeButtonWraper, style.disabled] : style.changeButtonWraper}>
      <Icon.Button
        name='edit'
        backgroundColor='#5d0756'
        color='#fff'
        size={40}
        disabled={props.disabled}
        onPress={props.onPress}
      >
        <RegularText>
          <Text style={style.text}>Edit</Text>
        </RegularText>
      </Icon.Button>
    </View>
  );
};

export default OkButton;
