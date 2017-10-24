import ethers from 'ethers';

export class CustomSigner {

    constructor(wallet) {
        this.wallet = wallet;
        this.provider = wallet.provider;
    }

    getAddress() {
        return Promise.resolve(this.wallet.getAddress());
    }

    sign(transaction) {
        return Promise.resolve(this.wallet.sign(transaction));
    }
}