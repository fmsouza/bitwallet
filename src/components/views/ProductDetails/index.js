import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import autobind from 'autobind-decorator';
import { Container, Footer } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Views } from 'common/constants';

export class ProductDetails extends React.Component {

    static navigationOptions = { title: 'Detalhes da Oferta' };

    @autobind
    onPressRedeem() {
        const { item } = this.props.navigation.state.params;
        this.props.navigation.navigate(Views.CONFIRMRDM, item);
    }

    render() {
        const { item } = this.props.navigation.state.params;
        return (
            <Container style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <Image style={styles.image} source={{ uri: item.imgUri }} />
                    <View style={styles.contentContainer}>
                        <Text style={styles.productTitle}>{item.title.toUpperCase()}</Text>
                        <Text style={styles.amount}>Por {item.amount} Pontos</Text>
                        <View style={styles.characteristicsContainer}>
                            <Text style={styles.characteristicsTitle}>CARACTERÍSTICAS GERAIS</Text>
                            <View style={styles.divider} />
                            <Text style={styles.productDescription}>{item.description}</Text>
                        </View>
                    </View>
                </ScrollView>
                <Footer style={styles.redeemButton} label="Resgatar" onPress={this.onPressRedeem} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    image: {
        width: '100%',
        height: 170
    },
    contentContainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingHorizontal: measures.defaultPadding,
        paddingVertical: measures.defaultPadding * 2
    },
    productTitle: {
        backgroundColor: 'transparent',
        color: colors.white,
        fontSize: measures.fontSizeMedium + 2,
        margin: measures.defaultMargin
    },
    amount: {
        backgroundColor: 'transparent',
        color: colors.fuelYellow,
        fontSize: measures.fontSizeMedium,
        margin: measures.defaultMargin
    },
    characteristicsContainer: {
        marginTop: measures.defaultMargin * 2
    },
    characteristicsTitle: {
        backgroundColor: 'transparent',
        color: colors.white,
        fontSize: measures.fontSizeMedium - 2,
        marginLeft: measures.defaultMargin
    },
    divider: {
        height: 1,
        backgroundColor: colors.white,
        marginBottom: measures.defaultMargin
    },
    productDescription: {
        backgroundColor: 'transparent',
        color: colors.white,
        fontSize: measures.fontSizeMedium - 3,
        margin: measures.defaultMargin
    },
    redeemButton: {
        backgroundColor: colors.etonBlue
    }
});