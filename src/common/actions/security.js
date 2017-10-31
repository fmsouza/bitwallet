import Storage from 'react-native-sensitive-info';
import { SECURITY_ACTIONS, STORAGE_CONFIG, STORAGE_WALLET } from 'common/constants';

const { RESET } = SECURITY_ACTIONS;

export const reset = () => (dispatch) => Storage.setItem(STORAGE_WALLET, '', STORAGE_CONFIG)
    .then(() => dispatch({ type: RESET }));