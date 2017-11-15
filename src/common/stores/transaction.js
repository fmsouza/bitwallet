import { action, observable } from 'mobx';

const initialState = {
    history: [],
    loading: false
};

class TransactionStore {

    @observable history = initialState.history;
    @observable loading = initialState.loading;

    @action isLoading(state) {
        this.loading = Boolean(state);
    }
    
    @action setHistory(history) {
        this.history = history;
    }

    @action reset() {
        this.history = initialState.history;
        this.loading = initialState.loading;
    }

}

export default new TransactionStore();