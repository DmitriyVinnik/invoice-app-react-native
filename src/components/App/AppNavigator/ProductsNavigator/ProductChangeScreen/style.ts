import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWraper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  textTitle: {
    fontWeight: '700',
  },
  fieldWraper: {
    width: '60%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  field: {
    marginBottom: 15,
  },
  buttonWraper: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
  },
  button: {
    width: '30%',
    height: 30,
  },
  toastWraper: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default style;