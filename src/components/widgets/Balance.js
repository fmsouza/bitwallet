import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { Icon } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Wallet } from 'common/actions';
import { Wallet as WalletUtils } from 'common/utils';
import { General } from 'common/constants';

const UPDATE_INTERVAL = 15000;

@inject('wallet')
@observer
export class Balance extends React.Component {

    get balance() {
        if (!this.props.wallet.balance) return 0;
        return WalletUtils.tokenDecimals(this.props.wallet.balance);
    }
    
    componentDidMount() {
        this.onPressRefresh();
    }

    @autobind
    async onPressRefresh(autoUpdate = true) {
        try {
            await Wallet.isLoading(true);
            await Wallet.updateBalance();
        } catch (e) {
            General.DEBUG && console.warn(e.message);
        } finally {
            await Wallet.isLoading(false);
            autoUpdate && setTimeout(() => this.onPressRefresh(), UPDATE_INTERVAL);
        }
    }

    renderExtractButton(onPressExtract) {
        if (!onPressExtract) return <View />;
        return (
            <TouchableWithoutFeedback onPress={onPressExtract}>
                <View>
                    <Text style={styles.history}>Ver Extrato</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderRefreshButton(loading) {
        if (loading) return <ActivityIndicator style={styles.refresh} animating />;
        else return (
            <TouchableWithoutFeedback onPress={() => this.onPressRefresh(false)}>
                <View style={styles.refresh}>
                    <Icon name="refresh" color={colors.white} />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const { onPressExtract, wallet: { loading } } = this.props;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={onPressExtract}>
                    <View style={styles.headerContainer}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Saldo Disponível</Text>
                        </View>
                        <View style={styles.balanceContainer}>
                            <Text style={styles.balanceLabel}>{WalletUtils.truncateBalance(this.balance)}</Text>
                            <Text style={styles.unitLabel}>Pts</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.footer}>
                    {this.renderExtractButton(onPressExtract)}
                </View>
            </View>
                // {this.renderRefreshButton(loading)}
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 128,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: colors.almond
    },
    headerContainer: {
        marginTop: measures.defaultMargin,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: colors.zorba
    },
    title: {
        fontSize: measures.fontSizeMedium,
        paddingVertical: measures.defaultPadding,
        color: colors.white,
        backgroundColor: 'transparent'
    },
    balanceContainer: {
        flex: 1,
        paddingHorizontal: measures.defaultPadding * 2,
        backgroundColor: colors.martini,
        flexDirection: 'row',
        alignItems: 'center'
    },
    balanceLabel: {
        fontSize: measures.fontSizeLarge,
        color: colors.white
    },
    unitLabel: {
        marginLeft: measures.defaultMargin,
        fontSize: measures.fontSizeMedium,
        color: colors.white
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-end'
    },
    refresh: {
        marginLeft: measures.defaultMargin * 2,
        width: 24,
        height: 24,
        backgroundColor: 'transparent'
    },
    history: {
        marginRight: measures.defaultMargin * 2,
        fontSize: measures.fontSizeSmall + 4,
        color: colors.white,
        backgroundColor: 'transparent'
    }
});