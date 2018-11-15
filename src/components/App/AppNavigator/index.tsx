import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import RootToaster from './RootToaster';
import CustomersNavigator from './CustomersNavigator';
import ProductsNavigator from './ProductsNavigator';
import InvoicesNavigator from './InvoicesNavigator';
import style from './style';

const Navigator = createBottomTabNavigator({
  Invoices: InvoicesNavigator,
  Customers: CustomersNavigator,
  Products: ProductsNavigator,
}, {
  initialRouteName: 'Invoices',
  tabBarOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#5d0756',
    inactiveTintColor: 'gray',
    tabStyle: {
      height: 30,
    },
    labelStyle: {
      fontFamily: 'CrimsonText-Bold',
      fontSize: 16,
      fontWeight: '700',
    },
    style: {
      height: 30,
    },
  },
});

// export default class AppNavigator extends React.Component {
//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <Navigator/>
//         <RootToaster/>
//       </View>
//     );
//   }
// }

import { BackHandler, Dimensions, Animated, TouchableOpacity, Text } from 'react-native';

const {width, height} = Dimensions.get('window');

export default class AppNavigator extends React.Component<any, any> {

  state = {
    backClickCount: 0,
  };

  constructor(props) {
    super(props);

    this.springValue = new Animated.Value(100);

  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  _spring() {
    this.setState({backClickCount: 1}, () => {
      Animated.sequence([
        Animated.spring(
          this.springValue,
          {
            toValue: -.15 * height,
            friction: 5,
            duration: 300,
            useNativeDriver: true,
          },
        ),
        Animated.timing(
          this.springValue,
          {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
          },
        ),

      ]).start(() => {
        this.setState({backClickCount: 0});
      });
    });

  }

  handleBackButton = () => {
    this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();

    return true;
  }

  render() {

    return (
      <View style={style.container}>
        <Navigator/>
        <RootToaster/>

        <Animated.View style={[style.animatedView, {transform: [{translateY: this.springValue}]}]}>
          <Text style={style.exitTitleText}>Press back again to exit the app</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => BackHandler.exitApp()}
            style={style.buttonExit}
          >
            <Text style={style.exitText}>Exit</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}