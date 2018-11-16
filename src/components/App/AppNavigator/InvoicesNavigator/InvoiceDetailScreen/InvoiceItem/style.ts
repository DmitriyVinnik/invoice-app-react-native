import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: '#5d0756',
  },
  active: {
    backgroundColor: '#cf0ec1',
  },
  text: {
    fontWeight: '700',
  },
});

export default style;