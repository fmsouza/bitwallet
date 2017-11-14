import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import autobind from 'autobind-decorator';
import { measures } from 'common/styles';
import { Button, ExpandablePanel, SelectInput } from 'components/widgets';
import { General } from 'common/constants';
import ExchangeInput from './ExchangeInput';

export default class SellPanel extends React.Component {
    
    state = { fiat: 0, method: '', token: 0 };

    @autobind
    onPressSell() {
        const { fiat, method, token } = this.state;
        console.log(method, fiat, token);
    }

    render() {
        return (
            <ExpandablePanel title="Vender pontos">
                <View style={styles.container}>
                    <Text>Forma de crédito</Text>
                    <SelectInput
                        options={General.CREDIT_METHODS}
                        onValueChange={method => this.setState({ method })} />
                    <Text>Quantidade</Text>
                    <ExchangeInput
                        fiatUnit="R$"
                        tokenUnit="Pontos"
                        onChange={({ fiat, token }) => this.setState({ fiat, token })} />
                    <Button title="Comprar" onPress={this.onPressSell} />
                </View>
            </ExpandablePanel>
        );
    }
}

const styles = StyleSheet.create({
    container: {}
});