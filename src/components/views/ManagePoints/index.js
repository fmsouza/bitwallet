import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { colors, measures } from 'common/styles';
import BuyPanel from './BuyPanel';
import SellPanel from './SellPanel';
import WithdrawPanel from './WithdrawPanel';

export class ManagePoints extends React.Component {

    static navigationOptions = {
        title: 'Gerenciar pontos'
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <BuyPanel />
                <SellPanel />
                <WithdrawPanel />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        padding: measures.defaultPadding,
        flex: 1
    }
});