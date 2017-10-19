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
        borderWidth: 2,
        borderColor: colors.secondary,
        borderRadius: 4
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