import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Container, LoyaltyClubBox } from 'components/widgets';
import { Views } from 'common/constants';
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
                        <TouchableWithoutFeedback onPress={() => navigate(Views.PRODUCTS, { category: 'banks' })}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers/banks.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.PRODUCTS, { category: 'telecom' })}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers/telecom.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.PRODUCTS, { category: 'ecommerce' })}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers/ecommerce.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.PRODUCTS, { category: 'tickets' })}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers/tickets.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.PRODUCTS, { category: 'favorites' })}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers/favorites.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.PRODUCTS, { category: 'tourism' })}>
                            <View style={styles.block}>
                                <Image style={styles.blockImage} source={require('assets/img/offers/tourism.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <LoyaltyClubBox />
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
    }
});