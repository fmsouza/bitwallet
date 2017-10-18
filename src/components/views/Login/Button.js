import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors, measures } from 'common/styles';

const styles = StyleSheet.create({
    container: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: measures.defaultPadding,
        borderRadius: 4
    },
    border: {
        borderWidth: 2,
        borderColor: colors.secondary
    },
    title: {
        color: colors.secondary,
        fontSize: 16
    }
});

const getContainerStyle = (borderless) => borderless ? styles.container : StyleSheet.flatten([styles.container, styles.border]);

export default ({ borderless, onPress, title, ...props }) => (
    <TouchableHighlight style={getContainerStyle(borderless)} onPress={onPress} underlayColor={null}>
        <Text style={styles.title} children={title} />
    </TouchableHighlight>
);