import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerWraper: {
    flex: 1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  contentWraper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default style;