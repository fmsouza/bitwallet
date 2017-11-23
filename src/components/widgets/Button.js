import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors, measures } from 'common/styles';

const styles = StyleSheet.create({
    container: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.secondary,
        backgroundColor: colors.primary,
        borderRadius: 4
    },
    borderless: {
        borderWidth: 0,
        backgroundColor: 'transparent'
    },
    title: {
        color: colors.secondary,
        fontSize: measures.fontSizeMedium
    }
});

const getStyles = (borderless) => {
    const mergedStyles = [styles.container];
    if (borderless) mergedStyles.push(styles.borderless);
    return StyleSheet.flatten(mergedStyles);
}

export const Button = ({ borderless, onPress, title, ...props }) => (
    <TouchableHighlight style={getStyles(borderless)} onPress={onPress} underlayColor={null} {...props}>
        <Text style={styles.title} children={title} />
    </TouchableHighlight>
);