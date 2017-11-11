import ethers from 'ethers';
import { BLOCKCHAIN_DECIMALS } from 'common/constants';

export const padStartHex = (hex, targetLength = 64, padString = '0') => {
    if (!hex.indexOf('0x')) hex = hex.slice(2);
    return `0x${hex.padStart(targetLength, padString)}`;
}

export const tokenDecimals = (value) => value / (10**BLOCKCHAIN_DECIMALS);

export const expandTokenAmount = (value) => value * (10**BLOCKCHAIN_DECIMALS);