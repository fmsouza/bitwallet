export const DEBUG = process.env.NODE_ENV === 'development';

const STORAGE_KEYCHAIN = '@BitWalletKeychain-513961259';
const STORAGE_PREFS = '@BitWalletPrefs-712638173';

export const STORAGE_CONFIG = {
    sharedPreferencesName: STORAGE_PREFS,
    keychainService: STORAGE_KEYCHAIN
};

export const PAYMENT_METHODS = [
    { value: 'credit_card', label: 'Cartão de crédito' },
    { value: 'deposit', label: 'Depósito' },
    { value: 'transfer', label: 'Transferência bancária' },
    { value: 'bill', label: 'Boleto' }
];

export const CREDIT_METHODS = [
    { value: 'deposit', label: 'Depósito bancário' },
    { value: 'prepaid_card', label: 'Cartão pré-pago' }
];

export const FIAT_TOKEN_RATE = 0.10;

export const BLOCKCHAIN_NETWORK = (DEBUG) ? 'rinkeby' : 'mainnet'; // 'mainnet' for production and 'rinkeby' for development
export const BLOCKCHAIN_DECIMALS = 18;

export const API = (DEBUG) ? 'https://rinkeby.etherscan.io/api' : 'https://api.etherscan.io/api';