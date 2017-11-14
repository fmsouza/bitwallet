import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Button } from 'components/widgets';
import autobind from 'autobind-decorator';
import { colors, measures } from 'common/styles';
import { Transaction } from 'common/actions';
import { expandTokenAmount, tokenDecimals } from 'common/utils';
import { Views } from 'common/constants';

@inject('transaction', 'wallet')
@observer
export class ConfirmTransaction extends React.Component {

    static navigationOptions = { title: 'Confirmação de envio' };
    
    get balance() {
        return tokenDecimals(this.props.wallet.balance);
    }

    get finalBalance() {
        return Number(tokenDecimals(this.props.wallet.balance)) - this.amount;
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
            const realAmount = expandTokenAmount(this.amount);
            await Transaction.transfer(this.address, realAmount);
            this.props.navigation.navigate(Views.OVERVIEW, { replaceRoute: true });
        } catch(e) {
            console.log(e.message);
        } finally {
            await Transaction.isLoading(false);
        }
    }

    render() {
        const { loading } = this.props.transaction;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Destinatário</Text>
                    <Text style={styles.value}>{this.address}</Text>
                    <Text style={styles.title}>Saldo disponível</Text>
                    <Text style={styles.value}>{this.balance}</Text>
                    <Text style={styles.title}>Pontos a enviar</Text>
                    <Text style={styles.value}>{this.amount}</Text>
                    <Text style={styles.title}>Saldo restante</Text>
                    <Text style={styles.value}>{this.finalBalance}</Text>
                    {loading && <ActivityIndicator animating />}
                </View>
                <Button borderless title="Confirmar e enviar" onPress={this.onSend} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        padding: measures.defaultPadding,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    content: {
        flex: 1
    },
    title: {
        alignSelf: 'center',
        marginVertical: measures.defaultMargin,
        fontWeight: 'bold'
    },
    value: {
        alignSelf: 'center',
        marginVertical: measures.defaultMargin
    }
});