import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { colors, measures } from 'common/styles';

export class ReceivePoints extends React.Component {

    static navigationOptions = {
        title: 'Receber pontos'
    };

    state = { address: '0xMyWalletAddressHashCode' };

    render() {
        const { address } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text children="Mostre o código abaixo para receber os pontos" />
                    <View style={styles.qrcodeContainer}>
                        <QRCode size={256} value={address} />
                        <Text children={address} />
                    </View>
                </View>

                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Extract')}>
                    <View style={styles.footer}>
                        <Text style={styles.footerLabel}>Ver meu extrato de pontos</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    subContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1
    },
    qrcodeContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 300
    },
    footer: {
        height: 48,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary
    },
    footerLabel: {
        color: 'white',
        fontWeight: 'bold'
    }
});