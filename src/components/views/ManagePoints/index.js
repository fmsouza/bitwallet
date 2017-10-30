import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { colors, measures } from 'common/styles';
import ExpandablePanel from './ExpandablePanel';

export class ManagePoints extends React.Component {

    static navigationOptions = {
        title: 'Gerenciar pontos'
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <ExpandablePanel title="Comprar pontos">
                    <Text>Quero comprar pontos</Text>
                </ExpandablePanel>
                <ExpandablePanel title="Vender pontos">
                    <Text>Quero vender pontos</Text>
                </ExpandablePanel>
                <ExpandablePanel title="Sacar pontos">
                    <Text>Quero sacar pontos</Text>
                </ExpandablePanel>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        padding: measures.defaultPadding,
        flex: 1
    }
});