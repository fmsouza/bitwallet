import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import autobind from 'autobind-decorator';
import { Container } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Views } from 'common/constants';

export class ProductDetails extends React.Component {

    static navigationOptions = { title: 'Detalhes' };

    render() {
        return (
            <Container style={styles.container}>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});