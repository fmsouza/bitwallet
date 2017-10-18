import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as Views from './components/views';
import { colors } from './common/styles';

export const INITIAL_ROUTE = 'Login';

export default StackNavigator({
    Extract: { screen: Views.Extract },
    Login: { screen: Views.Login },
    Overview: { screen: Views.Overview }
}, {
    initialRouteName: INITIAL_ROUTE,
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary,
        },
        headerTitleStyle: {
            color: colors.secondary
        }
    }
});