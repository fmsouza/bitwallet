import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Container } from 'components/widgets';
import { colors, measures } from 'common/styles';

export class Offers extends React.Component {

    static navigationOptions = { title: 'Ofertas' };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Text style={styles.title}>Ofertas em Destaque</Text>
                <View style={styles.grid}>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.RECEIVE)}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers/banks.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.SEND)}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers/telecom.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.MANAGE)}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers/ecommerce.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.OFFERS)}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers/tickets.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.MANAGE)}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers/favorites.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.OFFERS)}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers/tourism.png')} />
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
        justifyContent: 'space-around'
    },
    title: {
        fontSize: measures.fontSizeMedium,
        backgroundColor: 'transparent',
        color: colors.gray,
        margin: measures.defaultMargin * 2
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
    clubContainer: {
        backgroundColor: colors.antique,
        paddingHorizontal: measures.defaultPadding * 2,
        justifyContent: 'space-around',
        height: 140
    },
    clubTitle: {
        color: colors.white,
        fontSize: measures.fontSizeLarge - 2
    },
    clubDescription: {
        color: colors.white,
        fontSize: measures.fontSizeMedium - 2
    },
    clubButton: {
        alignSelf: 'flex-end'
    }
});