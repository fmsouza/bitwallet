import ethers from 'ethers';
import { General } from 'common/constants';

const { Contract, HDNode, providers, utils, Wallet } = ethers;

const PROVIDER = providers.getDefaultProvider(General.BLOCKCHAIN_NETWORK);
const decimals = Math.pow(10, General.BLOCKCHAIN_DECIMALS);

export const createWalletWithPK = (pk, provider=PROVIDER) => new Wallet(pk, provider);

export const padStartHex = (hex, targetLength = 64, padString = '0') => {
    if (!hex.indexOf('0x')) hex = hex.slice(2);
    return `0x${hex.padStart(targetLength, padString)}`;
}

export const tokenDecimals = (value) => ethers.utils.formatEther(value);

export const expandTokenAmount = (value) => {
    const big = utils.bigNumberify(value);
    const dec = utils.bigNumberify(String(decimals));
    return big.mul(dec);
}

export const generateKeyFromSeed = (value) => {
    const seed = utils.toUtf8Bytes(value);
    const node = HDNode.fromSeed(seed);
    return node.privateKey;
}

export const truncateBalance = (balance) => {
    balance = balance.toString();
    balance = balance.slice(0, (balance.indexOf(".")) + 3);
    return Number(balance);
}