import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Container } from 'components/widgets';
import { colors, measures } from 'common/styles';

export class Products extends React.Component {

    static navigationOptions = { title: 'Produtos' };

    render() {
        return (
            <Container style={styles.container}>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-around'
    }
});