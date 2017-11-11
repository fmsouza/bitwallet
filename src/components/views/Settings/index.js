import React from 'react';
import { Image, StyleSheet, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { colors, measures } from 'common/styles';
import { Security } from 'common/actions';
import { NAVIGABLE_VIEWS as Views } from 'common/constants';
import ListItem from './ListItem';

@connect(null, (dispatch) => ({
    reset: () => dispatch(Security.reset())
}))
export class Settings extends React.Component {

    static navigationOptions = { title: 'Configurações' };

    @autobind
    onPressClose() {
        const { navigation, reset } = this.props;
        reset();
        setTimeout(() =>
            navigation.navigate(Views.LOGIN, { replaceRoute: true })
        , 1);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ListItem onPress={this.onPressClose}>
                    <View style={styles.itemContainer}>
                        <Image style={styles.icon} source={require('assets/img/power.png')} />
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