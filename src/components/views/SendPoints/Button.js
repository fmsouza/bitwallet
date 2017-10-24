import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors, measures } from 'common/styles';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: measures.defaultPadding,
        borderWidth: 2,
        borderColor: colors.secondary,
        backgroundColor: colors.primary,
        borderRadius: 4,
        margin: measures.defaultMargin
    },
    title: {
        color: colors.secondary,
        fontSize: 16
    }
});

export default ({ onPress, title, ...props }) => (
    <TouchableHighlight style={styles.container} onPress={onPress} underlayColor={null}>
        <Text style={styles.title} children={title} />
    </TouchableHighlight>
);