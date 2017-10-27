import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { measures } from 'common/styles';

export default ({ transaction }) => (
    <View style={styles.container}>
        <Text style={styles.title}>{new Date(parseInt(transaction.timeStamp)*1000).toString()}</Text>
        <Text style={styles.subtitle}>Amount: {parseInt(transaction.data)}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: 'grey',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: measures.defaultPadding
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 12
    }
});