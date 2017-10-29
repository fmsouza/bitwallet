import ethers from 'ethers';

export const generateMnemonics = () => ethers.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));

export const padStartHex = (hex, targetLength = 64, padString = '0') => {
    if (!hex.indexOf('0x')) hex = hex.slice(2);
    return `0x${hex.padStart(targetLength, padString)}`;
}