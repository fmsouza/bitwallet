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
export class ConfirmRedeem extends React.Component {

    static navigationOptions = { title: 'Confirmação de Resgate' };

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
    
    get title() {
        return this.props.navigation.state.params.title;
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
            General.DEBUG && console.warn(e);
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
            <View style={styles.redeemSuccessBox}>
                <Text style={styles.redeemSuccessTitle}>RESGATE REALIZADO COM SUCESSO</Text>
                <Text style={styles.redeemSuccessSubtitle}>Você receberá uma confirmação em breve.</Text>
            </View>
        );
    }
    
    renderErrorBox() {
        return !this.state.error ? null : (
            <View style={styles.redeemErrorBox}>
                <Text style={styles.redeemErrorTitle}>OCORREU UM ERRO</Text>
                <Text style={styles.redeemErrorSubtitle}>Não foi possível realizar o resgate. Tente novamente mais tarde.</Text>
            </View>
        );
    }

    renderFooter() {
        return (this.state.success || this.state.error) ?
            <Footer style={styles.redeemButton} label="Voltar ao início" onPress={this.onPressBack} /> :
            <Footer style={styles.redeemButton} label="Confirmar resgate" onPress={this.onSend} />;
    }

    render() {
        const { loading } = this.props.transaction;
        return (
            <Container style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.topBox}>
                        <View style={styles.subLayer}>
                            <Text style={styles.title}>PRODUTO</Text>
                            <Text style={styles.value}>{this.title}</Text>
                            <Text style={styles.title}>PONTOS A ENVIAR</Text>
                            <Text style={styles.value}>{this.amount}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomBox}>
                        <Text style={styles.balanceTitle}>Saldo disponível:</Text>
                        <Text style={styles.balanceValue}>{WalletUtils.truncateBalance(this.balance)} Pontos</Text>
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
    redeemButton: {
        backgroundColor: colors.etonBlue
    },
    redeemSuccessBox: {
        marginTop: measures.defaultMargin * 4,
        backgroundColor: colors.mobster,
        padding: measures.defaultPadding,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    redeemSuccessTitle: {
        fontSize: measures.fontSizeLarge,
        textAlign: 'center',
        color: colors.fuelYellow
    },
    redeemSuccessSubtitle: {
        fontSize: measures.fontSizeMedium,
        textAlign: 'center',
        color: colors.white
    },
    redeemErrorBox: {
        marginTop: measures.defaultMargin * 4,
        backgroundColor: colors.mobster,
        padding: measures.defaultPadding,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    redeemErrorTitle: {
        fontSize: measures.fontSizeLarge,
        textAlign: 'center',
        color: colors.errorRed
    },
    redeemErrorSubtitle: {
        fontSize: measures.fontSizeMedium,
        textAlign: 'center',
        color: colors.white
    }
});