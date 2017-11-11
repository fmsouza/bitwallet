import ethers from 'ethers';

export const padStartHex = (hex, targetLength = 64, padString = '0') => {
    if (!hex.indexOf('0x')) hex = hex.slice(2);
    return `0x${hex.padStart(targetLength, padString)}`;
}

export const tokenDecimals = (value, decimals) => value / (10**decimals);