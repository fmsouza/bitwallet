import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Balance, Container } from 'components/widgets';
import { colors, measures } from 'common/styles';
import BuyPanel from './BuyPanel';
import SellPanel from './SellPanel';

export class ManagePoints extends React.Component {

    static navigationOptions = { title: 'Gerenciar pontos' };

    render() {
        return (
            <Container style={styles.container}>
                <Balance />
                <ScrollView style={styles.scrollContainer}>
                    <BuyPanel />
                    <SellPanel />
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    scrollContainer: {
        margin: measures.defaultMargin,
        flex: 1
    }
});