import React from 'react';
import { BackHandler, Platform, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import store from 'common/stores';
import Router, { INITIAL_ROUTE } from './Router';

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

    handleBackButton = () => {
        const { state, goBack } = this.props.navigation;
        const { index, routes } = state;
        if (routes[index].routeName !== INITIAL_ROUTE) {
            goBack();
            return true;
        }
        return false;
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <StatusBar {...ANDROID_STATUSBAR} />
                    <Router />
                </View>
            </Provider>
        );
    }
}