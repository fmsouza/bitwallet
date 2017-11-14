import { NavigationActions } from 'react-navigation';

let navigatorHandler = null;

export function setNavigationHandler(navigator) {
    navigatorHandler = navigator;
}

export async function navigate(routeName, params = {}, action) {
    const navigateAction = NavigationActions.navigate({ routeName, params, action });
    navigatorHandler.dispatch(navigateAction);
}

