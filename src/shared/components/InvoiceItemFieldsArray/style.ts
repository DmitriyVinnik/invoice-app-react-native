import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const style = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 330,
    alignItems: 'center',
    padding: 10,
  },
  headerWraper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonAddWraper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonAddTitle: {
    color: '#fff',
  },
  invoiceItemsList: {
    // paddingTop: 10,
  },
  invoiceItemWraper: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#5d0756',
    borderStyle: 'solid',
  },
  productWraper: {
    width: screenWidth - 130,
  },
  quantityWraper: {
    width: 60,
  },
  buttonRemoveWraper: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  textTitle: {
    fontWeight: '700',
  },
});

export default style;