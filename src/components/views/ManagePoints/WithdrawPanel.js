import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { measures } from 'common/styles';
import ExpandablePanel from './ExpandablePanel';

export default class WithdrawPanel extends React.Component {

    render() {
        return (
            <ExpandablePanel title="Sacar dinheiro">
                <View style={styles.container}>
                    <Text>Quero sacar meu saldo</Text>
                </View>
            </ExpandablePanel>
        );
    }
}

const styles = StyleSheet.create({
    container: {}
});