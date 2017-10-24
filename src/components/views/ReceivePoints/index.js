import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import { colors, measures } from 'common/styles';

@connect(({ wallet }) => ({ wallet: wallet.wallet }))
export class ReceivePoints extends React.Component {

    static navigationOptions = {
        title: 'Receber pontos'
    };

    render() {
        const { wallet } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text children="Mostre o código abaixo para receber os pontos" />
                    <View style={styles.qrcodeContainer}>
                        <QRCode size={256} value={wallet.getAddress()} />
                        <Text children={wallet.getAddress()} />
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
        justifyContent: 'center',
        flex: 1
    },
    qrcodeContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 300,
        marginTop: 50
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