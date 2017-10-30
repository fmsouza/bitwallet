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

export const FIAT_TOKEN_RATE = 0.10;