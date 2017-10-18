import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, measures } from 'common/styles';

export class Overview extends React.Component {

    static navigationOptions = {
        title: 'Multiplus',
        gesturesEnabled: false
    };

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    <Text>Overview</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.secondary,
        padding: measures.defaultPadding
    },
    container: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1
    }
});