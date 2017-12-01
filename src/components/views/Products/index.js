import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import autobind from 'autobind-decorator';
import Carousel from 'react-native-snap-carousel';
import { Balance, Container, LoyaltyClubBox } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Views } from 'common/constants';
import mockedOffers from './mockedOffers';

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
                <View key={index} style={{ flex: 1 }}>
                    <View style={styles.subLayer}>
                        <Image style={styles.cardImage} source={{ uri: item.imgUri }} />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                    </View>
                    <View style={styles.cardBottom}>
                        <Text style={styles.cardAmountLabel}>Por</Text>
                        <Text style={styles.cardAmountValue}>{item.amount} Pts</Text>
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
                        data={mockedOffers}
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
                <LoyaltyClubBox />
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
        height: 130
    },
    subLayer: {
        flex: 4,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        padding: measures.defaultPadding,
        backgroundColor: colors.rum
    },
    cardTitle: {
        color: colors.white,
        fontSize: measures.fontSizeMedium - 2,
        marginVertical: measures.defaultMargin
    },
    cardBottom: {
        flex: 1,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: measures.defaultPadding
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