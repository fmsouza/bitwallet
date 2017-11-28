import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import NavigationActions from "react-navigation/lib/NavigationActions";
import * as Views from './components/views';
import { Navigation } from './common/actions';
import { colors } from './common/styles';

export const INITIAL_ROUTE = 'Login';

const navigator = StackNavigator({
    ConfirmRedeem: { screen: Views.ConfirmRedeem },
    ConfirmTransaction: { screen: Views.ConfirmTransaction },
    Extract: { screen: Views.Extract },
    LoadPK: { screen: Views.LoadPK },
    Login: { screen: Views.Login },
    ManagePoints: { screen: Views.ManagePoints },
    Offers: { screen: Views.Offers },
    Overview: { screen: Views.Overview },
    Products: { screen: Views.Products },
    ProductDetails: { screen: Views.ProductDetails },
    ReceivePoints: { screen: Views.ReceivePoints },
    SendPoints: { screen: Views.SendPoints },
    SelectDestinationAddress: { screen: Views.SelectDestinationAddress },
    Settings: { screen: Views.Settings }
}, {
    initialRouteName: INITIAL_ROUTE,
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary,
        },
        headerTintColor: colors.secondary
    }
});

Navigation.setNavigationHandler(navigator);

const parentGetStateForAction = navigator.router.getStateForAction;

navigator.router.getStateForAction = (action, inputState) => {
    const state = parentGetStateForAction(action, inputState);
    
    // fix it up if applicable
    if (state && action.type === NavigationActions.NAVIGATE) {
        if (action.params && action.params.replaceRoute) {
            delete action.params.replaceRoute;
            while (state.routes.length > 1 && state.index > 0) {
                const oldIndex = state.index - 1;
                // remove one that we are replacing
                state.routes.splice(oldIndex, 1);
                // index now one less
                state.index = oldIndex;
            }
        }
    }

    return state;
};

export default navigator;