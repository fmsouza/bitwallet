import ethers from 'ethers';
import Storage from 'react-native-sensitive-info';
import { CONTRACT_ABI, CONTRACT_ADDRESS, WALLET_ACTIONS, STORAGE_CONFIG, STORAGE_WALLET } from 'common/constants';
import { CustomSigner } from 'common/utils';
import store from 'common/store';

const { Contract, HDNode, providers, utils, Wallet } = ethers;
const { LOAD_WALLET, LOADING, UPDATE_BALANCE } = WALLET_ACTIONS;

const PROVIDER = providers.getDefaultProvider();

export const updateBalance = () => (dispatch) => {
    const { contract, wallet } = store.getState().wallet;
    contract.functions.balanceOf(wallet.getAddress())
        .then(({ balance }) => dispatch({ type: UPDATE_BALANCE, payload: balance.toString() }));
}

export const loadWalletFromPrivateKey = (pk) => (dispatch) => {
    const wallet = new Wallet(pk, PROVIDER);
    const signer = new CustomSigner(wallet);
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    Storage.setItem(STORAGE_WALLET, pk, STORAGE_CONFIG)
        .then(() => dispatch({ type: LOAD_WALLET, payload: { contract, wallet } }));
}

export const loadWalletFromLogin = (username, password) => (dispatch) => {
    const seed = utils.toUtf8Bytes(username + password);
    const node = HDNode.fromSeed(seed);
    loadWalletFromPrivateKey(node.privateKey)(dispatch);
}

export const loadWalletFromMemory = () => Storage.getItem(STORAGE_WALLET, STORAGE_CONFIG);

export const isLoading = (loading) => ({ type: LOADING, payload: !!loading });