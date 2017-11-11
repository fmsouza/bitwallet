import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Footer, NumberGrid } from 'components/widgets';
import autobind from 'autobind-decorator';
import { colors, measures } from 'common/styles';

export class SendPoints extends React.Component {

    static navigationOptions = {
        title: 'Enviar pontos'
    };
    
    state = { amount: '' };

    @autobind
    onPressNumber(number) {
        let { amount } = this.state;
        switch (number) {
            case 'erase':
                amount = amount.slice(0, amount.length-1);
                break;

            case '.':
                if (amount.indexOf('.') > -1) return;
                else if (!amount.length) amount += '0.';
                else amount += '.';
                break;

            default:
                amount += number;
                break;
        }
        this.setState({ amount });
    }

    @autobind
    onPressContinue() {
        const { amount } = this.state;
        if (!amount) return;
        this.props.navigation.navigate('SelectDestinationAddress', { amount });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.txtAmount}>{this.state.amount || 0}</Text>
                    <Text style={styles.subtitle}>pontos</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <NumberGrid onPressNumber={this.onPressNumber} />
                </View>
                <Footer label="Continuar" onPress={this.onPressContinue} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        flex: 5,
        alignItems: 'stretch'
    },
    topContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtAmount: {
        fontSize: measures.fontSizeLarge,
        fontWeight: 'bold',
        color: colors.alternative
    },
    subtitle: {
        fontSize: measures.fontSizeMedium,
        color: colors.blind
    },
    bottomContainer: {
        flex: 4,
        alignItems: 'stretch',
        justifyContent: 'center'
    }
});