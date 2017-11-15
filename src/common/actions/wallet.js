import { Wallet as WalletConstants } from 'common/constants';
import { Contract as ContractUtils, Wallet as WalletUtils } from 'common/utils';
import { Storage as StorageService, Wallet as WalletService } from 'common/services';
import { wallet as WalletStore } from 'common/stores';

export async function isLoading(loading) {
    WalletStore.isLoading(loading);
}

export async function loadWalletFromPrivateKey(pk) {
    if(pk.indexOf('0x') !== 0) pk = `0x${pk}`; // Add '0x' to the beginning case it is not present
    const wallet = WalletUtils.createWalletWithPK(pk);
    const contract = ContractUtils.getContract(wallet);
    await StorageService.setItem(WalletConstants.STORAGE, pk);
    WalletStore.setWallet(wallet);
    WalletStore.setContract(contract);
}

export async function loadWalletFromLogin(username, password) {
    const pk = WalletUtils.generateKeyFromSeed(username + password);
    await loadWalletFromPrivateKey(pk);
}

export async function loadWalletFromMemory() {
    const pk = await StorageService.getItem(WalletConstants.STORAGE);
    const wallet = WalletUtils.createWalletWithPK(pk);
    const contract = ContractUtils.getContract(wallet);
    WalletStore.setWallet(wallet);
    WalletStore.setContract(contract);
}   

export async function updateBalance() {
    const balance = await WalletService.updateBalance(WalletStore.contract, WalletStore.wallet);
    WalletStore.setBalance(balance);
}

export async function close() {
    await StorageService.setItem(WalletConstants.STORAGE, '');
    WalletStore.reset();
}