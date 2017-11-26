import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, measures } from 'common/styles';

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
        borderColor: colors.gray,
        height: 64,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: measures.defaultPadding
    },
    title: {
        backgroundColor: 'transparent',
        color: colors.white,
        fontSize: measures.fontSizeMedium
    },
    subtitle: {
        backgroundColor: 'transparent',
        color: colors.white,
        fontSize: measures.fontSizeSmall
    }
});