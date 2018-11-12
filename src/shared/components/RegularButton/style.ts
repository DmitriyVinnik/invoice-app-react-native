import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  button: {
    width: '30%',
    height: 30,
    padding: 3,
    borderWidth: 2,
    borderColor: '#5d0756',
    backgroundColor: '#cf0ec1',
    borderRadius: 10,
  },
  title: {
    fontSize: 12,
    lineHeight: 14,
    color: '#fff',
  },
  titleWraper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default style;