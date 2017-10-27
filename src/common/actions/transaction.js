import ethers from 'ethers';
import axios from 'axios';
import { GAS_LIMIT as gasLimit, GAS_PRICE as gasPrice, TRANSACTION_ACTIONS, OPERATION_TRANSFER_HASH, CONTRACT_ADDRESS } from 'common/constants';
import store from 'common/stores';

const { HISTORY, LOADING, TRANSFER } = TRANSACTION_ACTIONS;

export const transfer = (amount, to) => (dispatch) => {
    const { contract, wallet } = store.getState().wallet;
    contract.functions.transfer(to, amount, { gasLimit, gasPrice })
        .then(txn => dispatch({ type: TRANSFER, payload: txn }));
}

export const history = () => (dispatch) => {
    const { wallet } = store.getState().wallet;
    const walletAddress = wallet.getAddress();
    axios.get(`https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${CONTRACT_ADDRESS}&topic0=${OPERATION_TRANSFER_HASH}&topic1=${walletAddress}&topic0_1_opr=or&topic2=${walletAddress}&topic0_2_opr=or`)
        .then(({ status, data }) => {
            if (status === 200 && data.status === "1") {
                dispatch({ type: HISTORY, payload: data.result });
            }
        });
}

export const isLoading = (loading) => ({ type: LOADING, payload: !!loading });