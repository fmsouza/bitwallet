import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import autobind from 'autobind-decorator';
import { measures } from 'common/styles';
import { Button, ExpandablePanel, SelectInput } from 'components/widgets';
import { General } from 'common/constants';
import ExchangeInput from './ExchangeInput';

export default class BuyPanel extends React.Component {

    state = { fiat: 0, method: '', token: 0 };

    @autobind
    onPressBuy() {
        const { fiat, method, token } = this.state;
        console.log(method, fiat, token);
    }

    render() {
        return (
            <ExpandablePanel title="Comprar pontos">
                <View style={styles.container}>
                    <Text>Forma de pagamento</Text>
                    <SelectInput
                        options={General.PAYMENT_METHODS}
                        onValueChange={method => this.setState({ method })} />
                    <Text>Quantidade</Text>
                    <ExchangeInput
                        fiatUnit="R$"
                        tokenUnit="Pontos"
                        onChange={({ fiat, token }) => this.setState({ fiat, token })} />
                    <Button title="Comprar" onPress={this.onPressBuy} />
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