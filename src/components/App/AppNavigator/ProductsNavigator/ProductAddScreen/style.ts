import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerWraper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  textTitle: {
    fontWeight: '700',
  },
  buttonWraper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  fieldWraper: {
    flex: 1,
    marginLeft: 125,
  },
});

export default style;