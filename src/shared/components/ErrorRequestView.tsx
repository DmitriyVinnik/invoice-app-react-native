import React from 'react';
import { Text, View } from 'react-native';
import { Error } from '../types/Request';

export interface OwnProps {
  errors: Error;
}

const ErrorRequestView: React.SFC<OwnProps> = (props: OwnProps) => {
  const {errors} = props;

  return (
    <View>
      <Text style={{color: 'red'}}>
        Error: {Array.isArray(errors.message) ? errors.message.join(', ') : errors.message}
      </Text>
    </View>
  );
};

export default ErrorRequestView;
