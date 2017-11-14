import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Balance, Footer, Icon } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Views } from 'common/constants';

export class Overview extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Bitplus',
        headerRight: (
            <TouchableWithoutFeedback onPress={() => navigation.navigate(Views.SETTINGS)}>
                <View style={styles.headerIcon}>
                    <Icon name="settings" color={colors.secondary} />
                </View>
            </TouchableWithoutFeedback>
        )
    });

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.balance}>
                    <Balance onPressExtract={() => navigate(Views.EXTRACT)} />
                </View>
                <View style={styles.blocksContainer}>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.RECEIVE)}>
                            <View style={styles.block}>
                                <Icon name="qrcode" type="fa" size="large" />
                                <Text>RECEBER</Text>
                                <Text>PONTOS</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.SEND)}>
                            <View style={styles.block}>
                                <Icon name="cube-send" type="mdc" size="large" />
                                <Text>ENVIAR</Text>
                                <Text>PONTOS</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.MANAGE)}>
                            <View style={styles.block}>
                                <Icon name="attach-money" type="md" size="large" />
                                <Text>COMPRAR/</Text>
                                <Text>VENDER</Text>
                                <Text>PONTOS</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.OFFERS)}>
                            <View style={styles.block}>
                                <Icon name="local-offer" type="md" size="large" />
                                <Text>OFERTAS</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <Footer
                    label="PARCEIROS"
                    onPress={() => navigate(Views.PARTNERS)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
    balance: {
        height: 140,
        width: '100%'
    },
    blocksContainer: {
        flexDirection: 'column',
        height: 300,
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        height: 150
    },
    gridIcon: {
        width: 36,
        height: 36
    },
    block: {
        margin: 8,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary
    },
    headerIcon: {
        width: 24,
        height: 24,
        marginRight: measures.defaultMargin
    }
});