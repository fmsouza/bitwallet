import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'components/widgets';
import { colors, measures } from 'common/styles';

export const LoyaltyClubBox = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Clube de Fidelidade</Text>
        <Text style={styles.description}>Com o Clube de Fidelidade você junta pontos mais rápido, participa de promoções e conquista seus objetivos rapidamente.</Text>
        <Button style={styles.button} borderless title="Veja como funciona" onPress={() => {}} />
    </View>
);



const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.antique,
        paddingHorizontal: measures.defaultPadding * 2,
        justifyContent: 'space-around',
        height: 140
    },
    title: {
        color: colors.white,
        fontSize: measures.fontSizeLarge - 4
    },
    description: {
        color: colors.white,
        fontSize: measures.fontSizeMedium - 4
    },
    button: {
        alignSelf: 'flex-end'
    }
});