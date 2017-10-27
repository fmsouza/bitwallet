import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { colors, measures } from 'common/styles';
import { Wallet, Transaction } from 'common/actions';
import Balance from './Balance';
import ListItem from './ListItem';
import transactions from './mockedTransactions';

@connect(
    ({ transaction, wallet }) => ({
        transactionHistory: transaction.history,
        walletBalance: wallet.balance,
        walletLoading: wallet.loading
    }),
    dispatch => ({
        transactionLoadHistory: () => dispatch(Transaction.history()),
        walletIsLoading: (loading) => dispatch(Wallet.isLoading(loading)),
        walletUpdateBalance: () => dispatch(Wallet.updateBalance())
    })
)
export class Extract extends React.Component {

    static navigationOptions = { title: 'Extrato de pontos' };
    
    componentDidMount() {
        this.props.walletIsLoading(true);
        this.props.walletUpdateBalance();
        this.props.transactionLoadHistory();
    }

    renderItem = ({ item }) => <ListItem transaction={item} />

    render() {
        const { transactionHistory, walletBalance, walletLoading } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.balance}>
                    <Balance balance={walletBalance} loading={walletLoading} />
                </View>
                <View style={styles.historyContainer}>
                    <FlatList
                        data={transactionHistory}
                        keyExtractor={item => item.transactionHash}
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