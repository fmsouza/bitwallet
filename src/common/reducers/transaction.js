import { SECURITY_ACTIONS, TRANSACTION_ACTIONS } from 'common/constants';

const { HISTORY, LOADING, TRANSFER } = TRANSACTION_ACTIONS;
const { RESET } = SECURITY_ACTIONS;

const INITIAL_STATE = {
    history: [],
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    const newState = { ...state };
    switch(action.type) {

        case HISTORY:
            newState.history = action.payload.reverse();
            newState.loading = false;
            return newState;

        case LOADING:
            newState.loading = action.payload;
            return newState;
            
        case TRANSFER:
            newState.loading = false;
            return newState;

        case RESET:
            newState.history = INITIAL_STATE.history;
            newState.loading = INITIAL_STATE.loading;
            return newState;

        default: return newState;
    }
}