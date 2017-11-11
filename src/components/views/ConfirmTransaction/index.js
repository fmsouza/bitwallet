import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'components/widgets';
import autobind from 'autobind-decorator';
import { colors, measures } from 'common/styles';
import { Transaction } from 'common/actions';

@connect(null,
    dispatch => ({
        isLoading: (loading) => dispatch(Transaction.isLoading(loading)),
        transfer: (address, amount) => dispatch(Transaction.transfer(address, amount))
    }))
export class ConfirmTransaction extends React.Component {

    static navigationOptions = { title: 'Confirmação de envio' };

    get address() {
        return this.props.navigation.state.params.address;
    }

    get amount() {
        return parseFloat(this.props.navigation.state.params.amount);
    }

    @autobind
    onSend() {
        const { isLoading, transfer } = this.props;
        isLoading(true);
        setTimeout(() => {
            const realAmount = expandTokenAmount(this.amount);
            transfer(this.address, realAmount);
            setTimeout(() => {
                this.props.navigation.navigate('Overview', { replaceRoute: true });
            }, 2000);
        }, 1);
    }

    render() {
        const { loading } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Destinatário</Text>
                <Text style={styles.value}>{this.address}</Text>
                <Text style={styles.title}>Pontos a enviar</Text>
                <Text style={styles.value}>{this.amount}</Text>
                <Button title="Confirmar e enviar" onPress={this.onSend} />
                {loading && <ActivityIndicator animating />}
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
        justifyContent: 'flex-start'
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