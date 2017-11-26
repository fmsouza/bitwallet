import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import autobind from 'autobind-decorator';
import { Icon } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Wallet } from 'common/actions';
import { General, Views } from 'common/constants';
import ListItem from './ListItem';

export class Settings extends React.Component {

    static navigationOptions = { title: 'Configurações' };

    @autobind
    async onPressClose() {
        try {
            await Wallet.close();
            this.props.navigation.navigate(Views.LOGIN, { replaceRoute: true });
        } catch (e) {
            General.DEBUG && console.error(e.message);
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ListItem onPress={this.onPressClose}>
                    <View style={styles.itemContainer}>
                        <View style={styles.icon}>
                            <Icon name="log-out" />
                        </View>
                        <Text style={styles.itemTitle}>Fechar carteira</Text>
                    </View>
                </ListItem>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    icon: {
        width: 24,
        height: 24,
        margin: measures.defaultMargin
    },
    itemTitle: {
        fontSize: measures.fontSizeMedium
    }
});