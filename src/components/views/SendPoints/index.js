import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import autobind from 'autobind-decorator';
import { Footer, NumberGrid } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Views } from 'common/constants';

export class SendPoints extends React.Component {

    static navigationOptions = { title: 'Enviar pontos' };
    
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
                if (amount === number) return;
                else if (amount === '0') amount = number;
                else amount += number;
                break;
        }
        this.setState({ amount });
    }

    @autobind
    onPressContinue() {
        const { amount } = this.state;
        if (!amount || Number(amount) === 0) return;
        this.props.navigation.navigate(Views.SELECTDEST, { amount });
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
        backgroundColor: colors.primary,
        flex: 5,
        alignItems: 'stretch'
    },
    topContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.zorba
    },
    txtAmount: {
        fontSize: measures.fontSizeLarge,
        color: colors.white
    },
    subtitle: {
        fontSize: measures.fontSizeMedium,
        color: colors.gray
    },
    bottomContainer: {
        flex: 4,
        alignItems: 'stretch',
        justifyContent: 'center'
    }
});