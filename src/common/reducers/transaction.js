import { TRANSACTION_ACTIONS } from 'common/constants';

const { HISTORY, LOADING, TRANSFER } = TRANSACTION_ACTIONS;

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
            return newState;

        default: return newState;
    }
}