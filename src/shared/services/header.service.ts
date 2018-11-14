import { NavigationScreenConfig } from 'react-navigation';

interface IHeaderService {
  initNavOpt(title: string): NavigationScreenConfig<any>;
}

class HeaderService implements IHeaderService {

  public initNavOpt(title: string) {
    return {
      title,
      headerStyle: {
        backgroundColor: '#4e0747',
      },
      headerTitleStyle: {
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
      },
    };
  }
}

export default new HeaderService();