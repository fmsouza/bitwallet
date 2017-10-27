import ethers from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS, WALLET_ACTIONS } from 'common/constants';
import { CustomSigner } from 'common/utils';
import store from 'common/stores';

const { Contract, providers, Wallet } = ethers;
const { LOAD_WALLET, LOADING, UPDATE_BALANCE } = WALLET_ACTIONS;

const PROVIDER = providers.getDefaultProvider();

export const updateBalance = () => (dispatch) => {
    const { contract, wallet } = store.getState().wallet;
    contract.functions.balanceOf(wallet.getAddress())
        .then(({ balance }) => dispatch({ type: UPDATE_BALANCE, payload: balance }));
}

export const loadWalletFromMnemonics = (mnemonics) => {
    const wallet = Wallet.fromMnemonics(mnemonics);
    wallet.provider = PROVIDER;
    const signer = new CustomSigner(wallet);
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    return { type: LOAD_WALLET, payload: { contract, wallet } };
}

export const loadWalletFromPrivateKey = (pk) => {
    const wallet = new Wallet(pk, PROVIDER);
    const signer = new CustomSigner(wallet);
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    return { type: LOAD_WALLET, payload: { contract, wallet } };
}

export const loadWalletFromLogin = (username, password) => (dispatch) =>
    Wallet.fromBrainWallet(username, password).then(wallet => {
        wallet.provider = PROVIDER;
        const signer = new CustomSigner(wallet);
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        dispatch({ type: LOAD_WALLET, payload: { contract, wallet } });
    });

export const isLoading = (loading) => ({ type: LOADING, payload: !!loading });