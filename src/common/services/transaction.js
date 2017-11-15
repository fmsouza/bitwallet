import axios from 'axios';
import { Wallet as WalletStore } from 'common/stores';
import { Contract, General, Transaction } from 'common/constants';
import { padStartHex } from 'common/utils';

export async function getTransactionHistory(walletAddress) {
    walletAddress = padStartHex(wallet.getAddress()).toLowerCase();
    const { status, data } = await axios.get(`${General.API}?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${Contract.ADDRESS}&topic0=${Transaction.OPERATION_TRANSFER_HASH}&topic1=${walletAddress}&topic2=${walletAddress}&topic1_2_opr=or`);
    if (status === 200 && data.status === 1) return data.result;
    else throw new Error('No results');
}

export async function transfer(to, amount) {
    const { contract, wallet } = WalletStore;
    return await contract.functions.transfer(to, amount, Transaction.OPTIONS);
}