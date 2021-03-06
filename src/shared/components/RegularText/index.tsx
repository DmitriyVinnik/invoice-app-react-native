import React from 'react';
import { Text, StyleSheet } from 'react-native';

const RegularText: React.SFC = ({children}) => {
  return (
    <Text style={style.text}>
      {children}
    </Text>
  );
};

export default RegularText;

const style = StyleSheet.create({
  text: {
    fontFamily: 'CrimsonText-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    color: '#5d0756',
  },
});
