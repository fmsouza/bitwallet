import React from 'react';
import { Clipboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import QRCode from 'react-native-qrcode-svg';
import { colors, measures } from 'common/styles';

@connect(({ wallet }) => ({ wallet: wallet.wallet }))
export class ReceivePoints extends React.Component {

    static navigationOptions = { title: 'Receber pontos' };

    state = { copiedToClipboard: false };

    @autobind
    copyToClipboard() {
        const { wallet } = this.props;
        Clipboard.setString(wallet.getAddress());
        this.setState({ copiedToClipboard: true });
    }

    componentWillUnmount() {
        this.setState({ copiedToClipboard: false });
    }

    render() {
        const { wallet } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text children="Mostre o código abaixo para receber os pontos" />
                    <TouchableWithoutFeedback onPress={this.copyToClipboard}>
                        <View style={styles.qrcodeContainer}>
                            <QRCode size={256} value={wallet.getAddress()} />
                            <Text children={wallet.getAddress()} />
                        </View>
                    </TouchableWithoutFeedback>
                    {this.state.copiedToClipboard && <Text style={styles.copied}>Copiado!</Text>}
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
    },
    copied: {
        color: 'green'
    }
});