import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { colors } from 'common/styles';
import { BLOCKCHAIN_DECIMALS } from 'common/constants';
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
        return tokenDecimals(this.props.balance, BLOCKCHAIN_DECIMALS);
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

    renderExtractButton() {
        const { onPressExtract } = this.props;
        if (!onPressExtract) return <View />;
        return (
            <TouchableWithoutFeedback onPress={onPressExtract}>
                <View>
                    <Text style={styles.history}>Ver extrato de pontos</Text>
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
                    <ActivityIndicator animating={loading} />
                </View>
                <Text style={styles.balance}>{this.balance}</Text>
                <View style={styles.footer}>
                    <TouchableWithoutFeedback onPress={this.onPressRefresh}>
                        <Image style={styles.refresh} source={require('assets/img/refresh.png')} />
                    </TouchableWithoutFeedback>
                    {this.renderExtractButton()}
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
        fontSize: 20
    },
    balance: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0C71B1'
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
        fontSize: 14,
        color: 'grey'
    }
});