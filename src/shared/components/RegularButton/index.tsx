import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import RegularText from '../RegularText';
import style from './style';

interface OwnProps extends TouchableOpacityProps {
  title: string;
}

const RegularButton: React.SFC<OwnProps> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={style.button}
    >
      <View style={style.titleWraper}>
        <RegularText>
          <Text style={style.title}>{props.title}</Text>
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

export default RegularButton;
