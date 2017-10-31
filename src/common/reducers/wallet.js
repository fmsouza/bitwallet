import { SECURITY_ACTIONS, WALLET_ACTIONS } from 'common/constants';

const { UPDATE_BALANCE, LOAD_WALLET, LOADING } = WALLET_ACTIONS;
const { RESET } = SECURITY_ACTIONS;

const INITIAL_STATE = {
    balance: 0,
    wallet: null,
    contract: null,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    const newState = { ...state };
    switch(action.type) {

        case LOAD_WALLET:
            const { contract, wallet } = action.payload;
            newState.wallet = wallet;
            newState.contract = contract;
            newState.loading = false;
            return newState;

        case UPDATE_BALANCE:
            newState.balance = action.payload;
            newState.loading = false;
            return newState;

        case LOADING:
            newState.loading = action.payload;
            return newState;
            
        case RESET:
            newState.balance = INITIAL_STATE.balance;
            newState.wallet = INITIAL_STATE.wallet;
            newState.contract = INITIAL_STATE.contract;
            newState.loading = INITIAL_STATE.loading;
            return newState;

        default: return newState;
    }
}