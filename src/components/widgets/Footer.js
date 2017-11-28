import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from 'common/styles';

export const Footer = ({ label, onPress, style }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={StyleSheet.flatten([styles.container, (style || {})])}>
            <Text style={styles.label}>{label.toUpperCase()}</Text>
        </View>
    </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    container: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary
    },
    label: {
        color: colors.secondary,
        fontWeight: 'bold'
    }
});