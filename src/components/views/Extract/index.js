import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Balance } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Transaction } from 'common/actions';
import { General } from 'common/constants';
import ListItem from './ListItem';

@inject('transaction', 'wallet')
@observer
export class Extract extends React.Component {

    static navigationOptions = { title: 'Extrato de pontos' };
    
    componentDidMount() {
        this.loadHistory();
    }

    async loadHistory() {
        try {
            const { wallet } = this.props.wallet;
            await Transaction.isLoading(true);
            await Transaction.loadHistory(wallet.getAddress());
        } catch(e) {
            General.DEBUG && console.warn(e.message);
        } finally {
            await Transaction.isLoading(false);
        }
    }

    renderItem = ({ item }) => <ListItem item={item} walletAddress={this.props.wallet.wallet.getAddress()} />

    render() {
        const { history, loading } = this.props.transaction;
        return (
            <View style={styles.container}>
                <Balance />
                <View style={styles.historyContainer}>
                    <FlatList
                        data={history}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => this.loadHistory()} />}
                        keyExtractor={item => item.transactionHash}
                        renderItem={this.renderItem} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flex: 1
    },
    historyContainer: {
        alignItems: 'stretch',
        flex: 1
    }
});