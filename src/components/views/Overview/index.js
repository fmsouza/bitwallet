import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Balance, Button, Container, Footer, Icon } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Views } from 'common/constants';

export class Overview extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Bitplus',
        headerRight: (
            <TouchableWithoutFeedback onPress={() => navigation.navigate(Views.SETTINGS)}>
                <View style={styles.headerIcon}>
                    <Icon name="settings" type="simple" color={colors.secondary} />
                </View>
            </TouchableWithoutFeedback>
        )
    });

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.container}>
                <View style={styles.balance}>
                    <Balance onPressExtract={() => navigate(Views.EXTRACT)} />
                </View>
                <View style={styles.blocksContainer}>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.RECEIVE)}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/receive_points.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.SEND)}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/send_points.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.MANAGE)}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/buy_sell.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.OFFERS)}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={styles.clubContainer}>
                    <Text style={styles.clubTitle}>Clube Multiplus</Text>
                    <Text style={styles.clubDescription}>Com o Clube Multiplus você junta pontos mais rápido, participa de promoções e conquista seus objetivos rapidamente.</Text>
                    <Button style={styles.clubButton} borderless title="Veja como funciona" onPress={() => {}} />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    balance: {
        height: 140,
        width: '100%'
    },
    blocksContainer: {
        flexDirection: 'column',
        height: 260,
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        height: 130
    },
    block: {
        margin: 8,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.white
    },
    blockImage: {
        width: '100%',
        height: '100%'
    },
    blockTitle: {
        color: colors.white
    },
    headerIcon: {
        width: 24,
        height: 24,
        marginRight: measures.defaultMargin
    },
    clubContainer: {
        backgroundColor: colors.antique,
        paddingHorizontal: measures.defaultPadding * 2,
        justifyContent: 'space-around',
        height: 140
    },
    clubTitle: {
        color: colors.white,
        fontSize: measures.fontSizeLarge
    },
    clubDescription: {
        color: colors.white,
        fontSize: measures.fontSizeMedium - 2
    },
    clubButton: {
        alignSelf: 'flex-end'
    }
});