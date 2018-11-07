import React from 'react';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import CssBaseLine from '@material-ui/core/CssBaseline';
import App from './App/index';

const Root:React.SFC = () => {
    return (
        <React.Fragment>
            <CssBaseLine/>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.Fragment>
    );
};

export default Root;