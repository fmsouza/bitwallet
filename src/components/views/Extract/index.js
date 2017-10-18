import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, measures } from 'common/styles';

export class Extract extends React.Component {

    static navigationOptions = {
        title: 'Extrato de pontos'
    };

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1
    },
    balance: {
        height: 140,
        width: '100%'
    }
});