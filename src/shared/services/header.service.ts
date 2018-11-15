import { TextStyle, ViewStyle } from 'react-native';

export interface NavOptions {
  title?: string;
  headerTitleStyle?: TextStyle;
  headerTitleContainerStyle?: ViewStyle;
  headerTintColor?: string;
  headerBackTitle?: string;
  headerTransparent?: boolean;
  headerRight?: JSX.Element;
  headerLeft?: JSX.Element;
  headerStyle?: ViewStyle;
}

interface IHeaderService {
  initNavOpt(title: string): NavOptions;
}

class HeaderService implements IHeaderService {

  public initNavOpt(title: string) {
    return {
      title,
      headerStyle: {
        backgroundColor: '#4e0747',
      },
      headerTitleStyle: {
        fontFamily: 'CrimsonText-Regular',
        fontSize: 20,
        color: '#fff',
      },
    };
  }
}

export default new HeaderService();