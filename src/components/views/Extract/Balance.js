import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from 'common/styles';

export default class Balance extends React.Component {

    render() {
        const { balance, loading, onPressExtract } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Seu saldo de pontos atual é</Text>
                    <ActivityIndicator animating={loading} />
                </View>
                <Text style={styles.balance}>{balance}</Text>
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
        padding: 8
    },
    title: {
        fontSize: 20
    },
    balance: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0C71B1'
    },
    header: {
        flexDirection: 'row'
    }
});