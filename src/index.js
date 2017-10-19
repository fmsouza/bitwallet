import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as Views from './components/views';
import { colors } from './common/styles';

export const INITIAL_ROUTE = 'Login';

export default StackNavigator({
    Extract: { screen: Views.Extract },
    Login: { screen: Views.Login },
    ManagePoints: { screen: Views.ManagePoints },
    Offers: { screen: Views.Offers },
    Overview: { screen: Views.Overview },
    Partners: { screen: Views.Partners },
    ReceivePoints: { screen: Views.ReceivePoints },
    SendPoints: { screen: Views.SendPoints }
}, {
    initialRouteName: INITIAL_ROUTE,
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary,
        },
        headerTintColor: colors.secondary
    }
});