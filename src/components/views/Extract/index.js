import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { colors, measures } from 'common/styles';
import { Wallet } from 'common/actions';
import Balance from './Balance';
import ListItem from './ListItem';
import transactions from './mockedTransactions';

@connect(
    ({ wallet }) => ({
        balance: wallet.balance,
        contract: wallet.contract,
        wallet: wallet.wallet,
        loading: wallet.loading
    }),
    dispatch => ({
        isLoading: (loading) => dispatch(Wallet.isLoading(loading)),
        updateBalance: (wallet, contract) => dispatch(Wallet.updateBalance(wallet, contract))
    })
)
export class Extract extends React.Component {

    static navigationOptions = {
        title: 'Extrato de pontos'
    };

    state = { transactions };
    
    componentDidMount() {
        this.updateBalance();
    }

    updateBalance () {
        const { contract, wallet } = this.props;
        this.props.isLoading(true);
        this.props.updateBalance(wallet, contract);
    }

    renderItem = ({ item }) => <ListItem {...item} />

    render() {
        const { balance, loading } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.balance}>
                    <Balance balance={balance} loading={loading} />
                </View>
                <View style={styles.historyContainer}>
                    <FlatList
                        data={this.state.transactions}
                        keyExtractor={item => item.txDate}
                        renderItem={this.renderItem} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    historyContainer: {
        width: '100%'
    },
    balance: {
        height: 140,
        width: '100%'
    }
});