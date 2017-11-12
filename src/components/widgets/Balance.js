import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { Icon } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Wallet } from 'common/actions';
import { tokenDecimals } from 'common/utils';

@connect(
    ({ wallet }) => ({
        balance: wallet.balance,
        loading: wallet.loading
    }),
    dispatch => ({
        isLoading: (loading) => dispatch(Wallet.isLoading(loading)),
        updateBalance: () => dispatch(Wallet.updateBalance())
    })
)
export class Balance extends React.Component {

    get balance() {
        return tokenDecimals(this.props.balance);
    }
    
    componentWillMount() {
        this.onPressRefresh();
    }

    @autobind
    onPressRefresh() {
        this.props.isLoading(true);
        setTimeout(() => {
            this.props.updateBalance();
        }, 1);
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
        const { balance, loading, onPressExtract } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Seu saldo de pontos atual é</Text>
                </View>
                <Text style={styles.balance}>{this.balance}</Text>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8
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
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
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