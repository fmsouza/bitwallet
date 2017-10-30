import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { measures } from 'common/styles';
import { ExpandablePanel, SelectInput } from 'components/widgets';
import { PAYMENT_METHODS } from 'common/constants';
import ExchangeInput from './ExchangeInput';

export default class BuyPanel extends React.Component {

    state = { method: '', fiat: 0, token: 0 };

    render() {
        return (
            <ExpandablePanel title="Comprar pontos">
                <View style={styles.container}>
                    <Text>Forma de pagamento</Text>
                    <SelectInput
                        options={PAYMENT_METHODS}
                        onValueChange={method => this.setState({ method })} />
                    <Text>Quantidade</Text>
                    <ExchangeInput
                        fiatUnit="R$"
                        tokenUnit="Pontos"
                        onChange={({ fiat, token }) => this.setState({ fiat, token })} />
                </View>
            </ExpandablePanel>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'stretch'
    }
});