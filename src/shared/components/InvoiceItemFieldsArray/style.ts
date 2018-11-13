import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  buttonAddWraper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 30,
    padding: 6,
    borderWidth: 2,
    borderColor: '#5d0756',
    backgroundColor: '#cf0ec1',
    borderRadius: 15,
  },
  buttonAddTitle: {
    color: '#fff',
  },
  invoiceItemsList: {
    paddingTop: 10,
  },
  invoiceItemWraper: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#5d0756',
    borderStyle: 'solid',
  },
  invoiceItemsCountWraper: {
    width: 60,
  },
  productWraper: {
    width: '50%',
    marginRight: 10,
  },
  buttonRemoveWraper: {
    width: 50,
  },
  errorText: {
    color: 'red',
  },
  textTitle: {
    fontWeight: '700',
  },
  iconTrashWraper: {
    paddingTop: 10,
  },
});

export default style;