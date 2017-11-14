import ethers from 'ethers';
import { BLOCKCHAIN_DECIMALS, BLOCKCHAIN_NETWORK } from 'common/constants';

const { Contract, HDNode, providers, utils, Wallet } = ethers;

const PROVIDER = providers.getDefaultProvider(BLOCKCHAIN_NETWORK);
const decimals = Math.pow(10, BLOCKCHAIN_DECIMALS);

export const createWalletWithPK = (pk, provider=PROVIDER) => new Wallet(pk, provider);

export const padStartHex = (hex, targetLength = 64, padString = '0') => {
    if (!hex.indexOf('0x')) hex = hex.slice(2);
    return `0x${hex.padStart(targetLength, padString)}`;
}

export const tokenDecimals = (value) => ethers.utils.formatEther(value);

export const expandTokenAmount = (value) => value * decimals;

export const generateKeyFromSeed = (value) => {
    const seed = utils.toUtf8Bytes(value);
    const node = HDNode.fromSeed(seed);
    return node.privateKey;
}