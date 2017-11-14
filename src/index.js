import React from 'react';
import { BackHandler, Platform, StatusBar, View } from 'react-native';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import autobind from 'autobind-decorator';
import * as stores from 'common/stores';
import Router, { INITIAL_ROUTE } from './Router';

useStrict(true);

const ANDROID_STATUSBAR = {
    backgroundColor: "#000000",
    barStyle: "light-content"
};

export default class Application extends React.Component {

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    @autobind
    handleBackButton() {
        if (!this.props.navigation) return false;
        
        const { state, goBack } = this.props.navigation;
        if (state.routes.length > 1 && state.index > 0) {
            goBack();
            return true;
        }
        return false;
    }

    render() {
        return (
            <Provider {...stores}>
                <View style={{ flex: 1 }}>
                    <StatusBar {...ANDROID_STATUSBAR} />
                    <Router />
                </View>
            </Provider>
        );
    }
}