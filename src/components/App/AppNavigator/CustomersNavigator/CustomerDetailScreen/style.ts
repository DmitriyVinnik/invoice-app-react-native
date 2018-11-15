import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
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
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    paddingRight: 5,
    paddingBottom: 5,
    borderRadius: 25,
    backgroundColor: '#5d0756',
  },
  text: {
    fontWeight: '700',
  },
});

export default style;