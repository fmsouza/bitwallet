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

    @autobind
    onSend() {
        const { isLoading, transfer, navigation: { state } } = this.props;
        const { params: { address, amount } } = state;
        isLoading(true);
        setTimeout(() => {
            transfer(address, amount);
            setTimeout(() => {
                this.props.navigation.navigate('Overview', { replaceRoute: true });
            }, 2000);
        }, 1);
    }

    render() {
        const { loading, navigation: { state } } = this.props;
        const { params: { address, amount } } = state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Destinatário</Text>
                <Text style={styles.value}>{address}</Text>
                <Text style={styles.title}>Pontos a enviar</Text>
                <Text style={styles.value}>{amount}</Text>
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