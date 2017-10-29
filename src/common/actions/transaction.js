import ethers from 'ethers';
import axios from 'axios';
import { GAS_LIMIT as gasLimit, GAS_PRICE as gasPrice, TRANSACTION_ACTIONS, OPERATION_TRANSFER_HASH, CONTRACT_ADDRESS } from 'common/constants';
import store from 'common/stores';
import { padStartHex } from 'common/utils';

const { HISTORY, LOADING, TRANSFER } = TRANSACTION_ACTIONS;

export const transfer = (to, amount) => (dispatch) => {
    const { contract, wallet } = store.getState().wallet;
    contract.functions.transfer(to, amount, { gasLimit, gasPrice })
        .then(transactionHash => dispatch({ type: TRANSFER, payload: { to, amount, transactionHash } }));
}

export const history = () => (dispatch) => {
    const { wallet } = store.getState().wallet;
    const walletAddress = padStartHex(wallet.getAddress()).toLowerCase();
    axios.get(`https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${CONTRACT_ADDRESS}&topic0=${OPERATION_TRANSFER_HASH}&topic1=${walletAddress}&topic2=${walletAddress}&topic1_2_opr=or`)
        .then(({ status, data }) => {
            if (status === 200 && data.status == 1)
                dispatch({ type: HISTORY, payload: data.result });
            else
                dispatch({ type: LOADING, payload: false });
        });
}

export const isLoading = (loading) => ({ type: LOADING, payload: !!loading });