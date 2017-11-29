import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Container, Footer } from 'components/widgets';
import autobind from 'autobind-decorator';
import { colors, measures } from 'common/styles';
import { Transaction } from 'common/actions';
import { Wallet as WalletUtils } from 'common/utils';
import { General, Views } from 'common/constants';

@inject('transaction', 'wallet')
@observer
export class ConfirmTransaction extends React.Component {

    static navigationOptions = { title: 'Confirmação de envio' };

    state = { success: false, error: false };
    
    get balance() {
        return WalletUtils.tokenDecimals(this.props.wallet.balance);
    }

    get address() {
        return this.props.navigation.state.params.address;
    }

    get amount() {
        return parseFloat(this.props.navigation.state.params.amount);
    }

    @autobind
    async onSend() {
        try {
            await Transaction.isLoading(true);
            const realAmount = WalletUtils.expandTokenAmount(this.amount);
            const txn = await Transaction.transfer(this.address, String(realAmount));
            this.setState({ success: true });
        } catch(e) {
            this.setState({ error: true });
            General.DEBUG && console.error(e);
        } finally {
            await Transaction.isLoading(false);
        }
    }
    
    @autobind
    onPressBack() {
        this.props.navigation.navigate(Views.OVERVIEW, { replaceRoute: true });
    }
    
    renderSuccessBox() {
        return !this.state.success ? null : (
            <View style={styles.successBox}>
                <Text style={styles.successTitle}>ENVIO REALIZADO COM SUCESSO</Text>
                <Text style={styles.successSubtitle}>Você receberá uma confirmação em breve.</Text>
            </View>
        );
    }
    
    renderErrorBox() {
        return !this.state.error ? null : (
            <View style={styles.errorBox}>
                <Text style={styles.errorTitle}>OCORREU UM ERRO</Text>
                <Text style={styles.errorSubtitle}>Não foi possível realizar o envio. Tente novamente mais tarde.</Text>
            </View>
        );
    }
    
    renderFooter() {
        return (this.state.success || this.state.error) ?
            <Footer label="Voltar ao início" onPress={this.onPressBack} /> :
            <Footer label="Confirmar e enviar" onPress={this.onSend} />;
    }

    render() {
        const { loading } = this.props.transaction;
        return (
            <Container style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.topBox}>
                        <View style={styles.subLayer}>
                            <Text style={styles.title}>DESTINATÁRIO</Text>
                            <Text style={styles.value}>{this.address}</Text>
                            <Text style={styles.title}>PONTOS A ENVIAR</Text>
                            <Text style={styles.value}>{this.amount}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomBox}>
                        <Text style={styles.balanceTitle}>Saldo disponível:</Text>
                        <Text style={styles.balanceValue}>{WalletUtils.truncateBalance(this.balance)} pts</Text>
                    </View>
                    {loading && <ActivityIndicator animating />}
                    {this.renderSuccessBox()}
                    {this.renderErrorBox()}
                </View>
                {this.renderFooter()}
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
        flex: 1
    },
    topBox: {
        paddingVertical: measures.defaultPadding,
        backgroundColor: colors.almond
    },
    subLayer: {
        backgroundColor: colors.zorba,
        paddingVertical: measures.defaultPadding
    },
    title: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: colors.white,
        fontSize: measures.fontSizeMedium + 1
    },
    value: {
        alignSelf: 'center',
        color: colors.white,
        marginVertical: measures.defaultMargin * 2,
        fontSize: measures.fontSizeMedium,
        textAlign: 'center',
        maxWidth: '90%'
    },
    bottomBox: {
        marginTop: measures.defaultMargin * 4,
        backgroundColor: colors.mobster,
        padding: measures.defaultPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    balanceTitle: {
        color: colors.white,
        fontSize: measures.fontSizeMedium
    },
    balanceValue: {
        marginLeft: measures.defaultMargin,
        color: colors.white,
        fontSize: measures.fontSizeMedium
    },
    successBox: {
        marginTop: measures.defaultMargin * 4,
        backgroundColor: colors.mobster,
        padding: measures.defaultPadding,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    successTitle: {
        fontSize: measures.fontSizeLarge,
        textAlign: 'center',
        color: colors.fuelYellow
    },
    successSubtitle: {
        fontSize: measures.fontSizeMedium,
        textAlign: 'center',
        color: colors.white
    },
    errorBox: {
        marginTop: measures.defaultMargin * 4,
        backgroundColor: colors.mobster,
        padding: measures.defaultPadding,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorTitle: {
        fontSize: measures.fontSizeLarge,
        textAlign: 'center',
        color: colors.errorRed
    },
    errorSubtitle: {
        fontSize: measures.fontSizeMedium,
        textAlign: 'center',
        color: colors.white
    }
});