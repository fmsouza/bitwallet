import React from 'react';
import { Clipboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import { Footer } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Views } from 'common/constants';

@inject('wallet')
@observer
export class ReceivePoints extends React.Component {

    static navigationOptions = { title: 'Receber pontos' };

    state = { copiedToClipboard: false };

    @autobind
    copyToClipboard() {
        const { wallet } = this.props.wallet;
        Clipboard.setString(wallet.getAddress());
        this.setState({ copiedToClipboard: true });
    }

    componentWillUnmount() {
        this.setState({ copiedToClipboard: false });
    }

    render() {
        const { wallet } = this.props.wallet;
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

                <Footer
                    label="Ver meu extrato de pontos"
                    onPress={() => this.props.navigation.navigate(Views.EXTRACT)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        alignItems: 'stretch',
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
    copied: {
        color: 'green'
    }
});