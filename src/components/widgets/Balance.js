import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { Icon } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Wallet } from 'common/actions';
import { Wallet as WalletUtils } from 'common/utils';

@inject('wallet')
@observer
export class Balance extends React.Component {

    get balance() {
        if (!this.props.wallet.balance) return '';
        return WalletUtils.tokenDecimals(this.props.wallet.balance);
    }
    
    componentWillMount() {
        this.onPressRefresh();
    }

    @autobind
    async onPressRefresh() {
        try {
            await Wallet.isLoading(true);
            await Wallet.updateBalance();
        } catch (e) {
            console.log(e.message);
        } finally {
            await Wallet.isLoading(false);
        }
    }

    renderExtractButton(onPressExtract) {
        if (!onPressExtract) return <View />;
        return (
            <TouchableWithoutFeedback onPress={onPressExtract}>
                <View>
                    <Text style={styles.history}>Ver extrato de pontos</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderRefreshButton(loading) {
        if (loading) return <ActivityIndicator style={styles.refresh} animating />;
        else return (
            <TouchableWithoutFeedback onPress={this.onPressRefresh}>
                <View style={styles.refresh}>
                    <Icon name="refresh" />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const { onPressExtract, wallet: { balance, loading } } = this.props;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={onPressExtract}>
                    <View style={styles.headerContainer}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Seu saldo de pontos atual é</Text>
                        </View>
                        <Text style={styles.balance}>{this.balance}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.footer}>
                    {this.renderRefreshButton(loading)}
                    {this.renderExtractButton(onPressExtract)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        flex: 1,
        maxHeight: 128,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: measures.defaultPadding
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1
    },
    title: {
        fontSize: measures.fontSizeMedium
    },
    balance: {
        fontSize: measures.fontSizeLarge,
        fontWeight: 'bold',
        color: colors.lightBlue
    },
    header: {
        flexDirection: 'row'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    refresh: {
        width: 24,
        height: 24
    },
    history: {
        fontSize: measures.fontSizeSmall + 4,
        color: colors.darkGrey
    }
});