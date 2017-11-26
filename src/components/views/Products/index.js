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
            <View key={index}>
                <Text>{item.from}</Text>
                <Text>{item.to}</Text>
                <Text>{item.amount}</Text>
            </View>
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
        borderRadius: 5,
        width: wp(80, Dimensions.get('window').width),
        backgroundColor: colors.white,
        padding: measures.defaultPadding,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: colors.darkGray,
        shadowOpacity: 0.8,
        elevation: 1
    }
});