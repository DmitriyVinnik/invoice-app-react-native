import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  picker: {
    width: '80%',
    height: 60,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});

export default style;