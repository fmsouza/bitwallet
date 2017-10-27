import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { colors, measures } from 'common/styles';
import { Wallet, Transaction } from 'common/actions';
import Balance from './Balance';
import ListItem from './ListItem';

@connect(
    ({ transaction, wallet }) => ({
        transactionHistory: transaction.history,
        transactionLoading: transaction.loading,
        walletAddress: wallet.wallet.getAddress(),
        walletBalance: wallet.balance,
        walletLoading: wallet.loading
    }),
    dispatch => ({
        transactionLoadHistory: () => dispatch(Transaction.history()),
        transactionIsLoading: (loading) => dispatch(Transaction.isLoading(loading)),
        walletIsLoading: (loading) => dispatch(Wallet.isLoading(loading)),
        walletUpdateBalance: () => dispatch(Wallet.updateBalance())
    })
)
export class Extract extends React.Component {

    static navigationOptions = { title: 'Extrato de pontos' };
    
    componentDidMount() {
        this.props.walletIsLoading(true);
        this.props.transactionIsLoading(true);
        setTimeout(() => {
            this.props.walletUpdateBalance();
            this.props.transactionLoadHistory();
        }, 1);
    }

    renderItem = ({ item }) => <ListItem transaction={item} walletAddress={this.props.walletAddress} />

    render() {
        const { transactionHistory, transactionLoading, walletBalance, walletLoading } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.balance}>
                    <Balance balance={walletBalance} loading={walletLoading} />
                </View>
                <View style={styles.historyContainer}>
                    {transactionLoading && <ActivityIndicator animating={transactionLoading} />}
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
        justifyContent: 'flex-start',
        flex: 1
    },
    historyContainer: {
        width: '100%',
        flex: 1
    },
    balance: {
        height: 140,
        width: '100%'
    }
});