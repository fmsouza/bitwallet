import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from 'common/styles';

export default class Balance extends React.Component {

    render() {
        const { balance, onPressExtract } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Seu saldo de pontos atual é</Text>
                <Text style={styles.balance}>{balance}</Text>
                <TouchableWithoutFeedback onPress={onPressExtract}>
                    <View>
                        <Text style={styles.history}>Ver extrato de pontos</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 16
    },
    title: {
        fontSize: 20
    },
    balance: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0C71B1'
    },
    history: {
        fontSize: 14,
        color: 'grey'
    }
});