import ethers from 'ethers';
import { Contract } from 'common/constants';

class CustomSigner {

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

export const getContract = (wallet) => new ethers.Contract(Contract.ADDRESS, Contract.ABI, new CustomSigner(wallet));