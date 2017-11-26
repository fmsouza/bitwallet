import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import autobind from 'autobind-decorator';
import Carousel from 'react-native-snap-carousel';
import { Balance, Container, MultiplusBox } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Views } from 'common/constants';
import flightOffers from './mockedFlightOffers';

function wp (percentage, size) {
    const value = (percentage * size) / 100;
    return Math.round(value);
}

export class Products extends React.Component {

    static navigationOptions = { title: 'Produtos' };

    @autobind
    renderItem({ item, index }) {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate(Views.PRODUCT, { item })}>
                <View key={index}>
                    <View style={styles.subLayer}>
                        <Image style={styles.cardImage} source={{ uri: item.img }} />
                        <Text style={styles.cardFromLabel}>De {item.from} para</Text>
                        <Text style={styles.cardToLabel}>{item.to.toUpperCase()}</Text>
                        <Image style={styles.cardLogo} source={require('assets/img/offers/latam.png')} />
                    </View>
                    <View style={styles.cardBottom}>
                        <Text style={styles.cardAmountLabel}>A partir de</Text>
                        <Text style={styles.cardAmountValue}>{item.amount}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const sliderWidth = Dimensions.get('window').width;
        const itemWidth = wp(75, sliderWidth) + (wp(2, sliderWidth) * 2);
        return (
            <Container style={styles.container}>
                <Balance onPressExtract={() => this.props.navigation.navigate(Views.EXTRACT)} />
                <View style={styles.content}>
                    <Text style={styles.label}>OFERTAS ESPECIAIS</Text>
                    <Carousel
                        enableMomentum
                        data={flightOffers}
                        renderItem={this.renderItem}
                        contentContainerCustomStyle={styles.productsContainer}
                        slideStyle={styles.card}
                        itemWidth={itemWidth}
                        sliderWidth={sliderWidth}
                        inactiveSlideScale={0.9}
                        inactiveSlideOpacity={0.7}
                        activeSlideAlignment='start'
                        removeClippedSubviews={false} />
                </View>
                <MultiplusBox />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    content: {
        flex: 1,
        marginVertical: measures.defaultMargin * 2,
        justifyContent: 'flex-start'
    },
    label: {
        backgroundColor: 'transparent',
        color: colors.white,
        textAlign: 'center'
    },
    productsContainer: {
        margin: measures.defaultMargin
    },
    card: {
        borderRadius: 7,
        width: wp(80, Dimensions.get('window').width),
        backgroundColor: colors.maverick,
        borderWidth: 4,
        borderColor: colors.white,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: colors.darkGray,
        shadowOpacity: 0.8,
        elevation: 1
    },
    cardImage: {
        width: '100%',
        height: 100
    },
    subLayer: {
        padding: measures.defaultPadding,
        backgroundColor: colors.rum
    },
    cardFromLabel: {
        color: colors.white,
        fontSize: measures.fontSizeMedium - 2,
        marginVertical: measures.defaultMargin
    },
    cardToLabel: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: measures.fontSizeMedium,
        textAlign: 'center'
    },
    cardLogo: {
        margin: measures.defaultMargin,
        alignSelf: 'flex-end',
        width: 80,
        height: 16
    },
    cardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: measures.defaultPadding,
        height: 60
    },
    cardAmountLabel: {
        color: colors.white,
        fontSize: measures.fontSizeMedium - 2
    },
    cardAmountValue: {
        fontSize: measures.fontSizeLarge,
        fontWeight: 'bold',
        color: colors.sanJuan
    }
});