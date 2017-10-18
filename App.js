import React from 'react';
import { BackHandler, Platform, StatusBar, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Router, { INITIAL_ROUTE } from './src';
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
            <View style={{ flex: 1 }}>
                <StatusBar {...AppConfig.expo.androidStatusBar} />
                <Router />
            </View>
        );
    }
}