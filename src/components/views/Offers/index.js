import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, measures } from 'common/styles';
import ListItem from './ListItem';
import items from './mockedList';

export class Offers extends React.Component {

    static navigationOptions = {
        title: 'Ofertas'
    };

    state = { items };

    renderItem = ({ item }) => <ListItem {...item} />

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.items}
                    keyExtractor={item => item.id}
                    renderItem={this.renderItem} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground
    }
});