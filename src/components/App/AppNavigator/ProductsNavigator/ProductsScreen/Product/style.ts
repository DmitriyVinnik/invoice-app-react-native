import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#cf0ec1',
    borderRadius: 5,
  },
  active: {
    backgroundColor: '#cf0ec1',
  },
  text: {
    fontWeight: '700',
  },
});

export default style;