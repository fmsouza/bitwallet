import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { measures } from 'common/styles';

export default ({ address, name }) => (
    <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{address}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        width: '100%',
        borderColor: 'grey',
        height: 64,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: measures.defaultPadding
    },
    title: {
        fontSize: 20
    },
    subtitle: {
        fontSize: 14
    }
});