import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Container, Footer } from 'components/widgets';
import autobind from 'autobind-decorator';
import { colors, measures } from 'common/styles';
import { Transaction } from 'common/actions';
import { Wallet as WalletUtils } from 'common/utils';
import { Views } from 'common/constants';

@inject('transaction', 'wallet')
@observer
export class ConfirmTransaction extends React.Component {

    static navigationOptions = { title: 'Confirmação de envio' };
    
    get balance() {
        return WalletUtils.tokenDecimals(this.props.wallet.balance);
    }

    get finalBalance() {
        return Number(WalletUtils.tokenDecimals(this.props.wallet.balance)) - this.amount;
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
            this.props.navigation.navigate(Views.OVERVIEW, { replaceRoute: true });
        } catch(e) {
            console.error(e);
        } finally {
            await Transaction.isLoading(false);
        }
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
                        <Text style={styles.balanceValue}>{this.balance} pts</Text>
                    </View>
                    {loading && <ActivityIndicator animating />}
                </View>
                <Footer label="Confirmar e enviar" onPress={this.onSend} />
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
        color: colors.white
    },
    value: {
        alignSelf: 'center',
        color: colors.white,
        marginVertical: measures.defaultMargin
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
    }
});