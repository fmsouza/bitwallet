import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from 'common/styles';

export const Footer = ({ label, onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
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