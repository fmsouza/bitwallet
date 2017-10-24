import React from 'react';
import { BackHandler, Platform, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import Router, { INITIAL_ROUTE } from './src';
import configureStore from 'common/stores';
import AppConfig from './app.json';

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
            <Provider store={configureStore()}>
                <View style={{ flex: 1 }}>
                    <StatusBar {...AppConfig.expo.androidStatusBar} />
                    <Router />
                </View>
            </Provider>
        );
    }
}