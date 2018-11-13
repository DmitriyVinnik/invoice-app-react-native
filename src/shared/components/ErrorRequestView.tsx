import React from 'react';
import { Text, View } from 'react-native';
import { Error } from '../types/Request';

export interface OwnProps {
  errors: Error | null;
  messageSuccess: string | null;
}

const ErrorRequestView: React.SFC<OwnProps> = (props: OwnProps) => {
  const {errors, messageSuccess} = props;

  return (
    <View>
      {
        errors ?
          (<Text style={{color: 'red'}}>
            Error: {Array.isArray(errors.message) ? errors.message.join(', ') : errors.message}
          </Text>) :
          (<Text style={{color: 'green'}}>{messageSuccess}</Text>)
      }
    </View>
  );
};

export default ErrorRequestView;
