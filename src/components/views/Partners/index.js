import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { colors, measures } from 'common/styles';
import ListItem from './ListItem';
import items from './mockedPartners';

export class Partners extends React.Component {

    static navigationOptions = {
        title: 'Parceiros'
    };

    state = { items };

    renderPartner = ({ item }) => <ListItem {...item} />

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.items}
                    keyExtractor={item => item.id}
                    renderItem={this.renderPartner} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground
    }
});