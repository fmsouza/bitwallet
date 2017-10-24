import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from 'common/styles';

export default class Balance extends React.Component {

    render() {
        const { balance, loading, onPressExtract, onPressRefresh } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Seu saldo de pontos atual é</Text>
                    <ActivityIndicator animating={loading} />
                </View>
                <Text style={styles.balance}>{balance}</Text>
                <View style={styles.footer}>
                    <TouchableWithoutFeedback onPress={onPressRefresh}>
                        <Image style={styles.refresh} source={require('assets/img/refresh.png')} />
                    </TouchableWithoutFeedback>
                    
                    <TouchableWithoutFeedback onPress={onPressExtract}>
                        <View>
                            <Text style={styles.history}>Ver extrato de pontos</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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
        justifyContent: 'space-between',
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
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    refresh: {
        width: 24,
        height: 24
    },
    history: {
        fontSize: 14,
        color: 'grey'
    }
});