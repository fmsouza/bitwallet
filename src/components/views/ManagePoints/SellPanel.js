import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { measures } from 'common/styles';
import { ExpandablePanel } from 'components/widgets';

export default class SellPanel extends React.Component {

    render() {
        return (
            <ExpandablePanel title="Vender pontos">
                <View style={styles.container}>
                    <Text>Quero vender pontos</Text>
                </View>
            </ExpandablePanel>
        );
    }
}

const styles = StyleSheet.create({
    container: {}
});