import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, measures } from 'common/styles';
import Balance from './Balance';
import ListItem from './ListItem';
import transactions from './mockedTransactions';

export class Extract extends React.Component {

    static navigationOptions = {
        title: 'Extrato de pontos'
    };

    state = { transactions };

    renderItem = ({ item }) => <ListItem {...item} />

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.balance}>
                    <Balance />
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