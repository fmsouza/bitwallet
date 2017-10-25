import ethers from 'ethers';
import { GAS_LIMIT as gasLimit, GAS_PRICE as gasPrice, TRANSACTION_ACTIONS } from 'common/constants';
import store from 'common/stores';

const { TRANSFER, LOADING } = TRANSACTION_ACTIONS;

export const transfer = (amount, to) => (dispatch) => {
    const { contract, wallet } = store.getState().wallet;
    contract.functions.transfer(to, amount, { gasLimit, gasPrice })
        .then(txn => dispatch({ type: TRANSFER, payload: txn }));
}

export const isLoading = (loading) => ({ type: LOADING, payload: !!loading });