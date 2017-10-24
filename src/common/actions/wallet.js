import ethers from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS, WALLET_ACTIONS } from 'common/constants';
import { CustomSigner } from 'common/utils';

const { Contract, HDNode, providers, utils, Wallet } = ethers;
const { UPDATE_BALANCE, LOAD_WALLET, LOADING } = WALLET_ACTIONS;

export const updateBalance = (wallet, contract) => (dispatch) => {
    contract.functions.balanceOf(wallet.getAddress())
        .then(({ balance }) => dispatch({ type: UPDATE_BALANCE, payload: balance }));
}

export const createWallet = (mnemonics) => {
    const wallet = Wallet.fromMnemonics(mnemonics);
    wallet.provider = providers.getDefaultProvider();
    return { type: LOAD_WALLET, payload: wallet };
}

export const loadWallet = (username, password) => {
    const wallet = new Wallet("0x9b2fed1d748a0c485dadfbed79cb7601f8eee893e5d68f8517b9572801454380", providers.getDefaultProvider());
    // const wallet = Wallet.fromBrainWallet(username, password);
    // wallet.provider = providers.getDefaultProvider();
    const signer = new CustomSigner(wallet);
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    return { type: LOAD_WALLET, payload: { contract, wallet } };
};

export const isLoading = (loading) => ({ type: LOADING, payload: !!loading });