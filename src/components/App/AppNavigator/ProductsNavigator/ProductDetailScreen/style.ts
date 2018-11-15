import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    height: 120,
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 20,
  },
  list: {
    flex: 1,
    marginBottom: 30,
    marginTop: 5,
  },
  editPanel: {
    width: '100%',
    height: 70,
    position: 'absolute',
    padding: 10,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  text: {
    fontWeight: '700',
  },
});

export default style;