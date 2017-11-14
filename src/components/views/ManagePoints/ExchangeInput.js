import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import autobind from 'autobind-decorator';
import { General } from 'common/constants';

export default class ExchangeInput extends React.Component {

    state = { fiat: '', token: '' };

    @autobind
    onChangeFiat(fiat) {
        const token = String(fiat * General.FIAT_TOKEN_RATE);
        this.setState({ fiat, token }, () => {
            this.props.onChange({ fiat, token });
        });
    }
    
    @autobind
    onChangeToken(token) {
        const fiat = String(token / General.FIAT_TOKEN_RATE);
        this.setState({ fiat, token }, () => {
            this.props.onChange({ fiat, token });
        });
    }

    render() {
        const { fiat, token } = this.state;
        const { fiatUnit, tokenUnit } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.divider} children={fiatUnit} />
                <TextInput
                    value={fiat}
                    style={styles.input}
                    onChangeText={this.onChangeFiat}
                    keyboardType="numeric"
                    placeholder={`Valor em ${fiatUnit}`} />
                <Text style={styles.divider} children="<>" />
                <TextInput
                    value={token}
                    style={styles.input}
                    onChangeText={this.onChangeToken}
                    keyboardType="numeric"
                    placeholder={tokenUnit} />
                <Text style={styles.divider} children={tokenUnit} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    divider: {
        fontWeight: 'bold'
    },
    input: {
        flex: 1,
        textAlign: 'center'
    }
});