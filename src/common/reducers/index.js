import { combineReducers } from 'redux';
import wallet from './wallet';
import transaction from './transaction';

export default combineReducers({
    transaction,
    wallet
});