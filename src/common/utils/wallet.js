import ethers from 'ethers';

export const generateMnemonics = () => ethers.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));