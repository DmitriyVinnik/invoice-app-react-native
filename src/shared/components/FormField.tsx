import React from 'react';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { WrappedFieldProps } from 'redux-form';

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
      <Text>{labelText}</Text>
      <TextInput
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboard}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus as any}
        value={input.value}
      />
      {touched && (error && <Text style={{color: 'red'}}>{error}</Text>)}
    </View>
  );
};

export default FormField;