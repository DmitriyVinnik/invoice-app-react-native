import React from 'react';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { WrappedFieldProps } from 'redux-form';
import RegularText from '../RegularText';
import style from './style';

export interface OwnProps {
  labelText: string;
  keyboard?: KeyboardTypeOptions;
  placeholder?: string;
  editable?: boolean;
}

type Props = OwnProps & WrappedFieldProps;

export const FormField: React.SFC<Props> = (props: Props) => {
  const {
    placeholder, input, labelText, keyboard, editable, meta: {touched, error},
  } = props;

  return (
    <View>
      <RegularText>{labelText}</RegularText>
      <TextInput
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboard}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus as any}
        value={input.value}
        style={style.textInput}
      />
      {touched && (error && <Text style={style.errorText}>{error}</Text>)}
    </View>
  );
};

export default FormField;