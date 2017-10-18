import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as Views from './components/views';

export const INITIAL_ROUTE = 'Login';

export default StackNavigator({
    Login: { screen: Views.Login }
}, {
    initialRouteName: INITIAL_ROUTE
});