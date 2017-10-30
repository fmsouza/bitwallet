import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { measures } from 'common/styles';
import ExpandablePanel from './ExpandablePanel';

export default class BuyPanel extends React.Component {

    render() {
        return (
            <ExpandablePanel title="Comprar pontos">
                <View style={styles.container}>
                    <Text>Quero comprar pontos</Text>
                </View>
            </ExpandablePanel>
        );
    }
}

const styles = StyleSheet.create({
    container: {}
});