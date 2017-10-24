import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { colors, measures } from 'common/styles';
import { Wallet } from 'common/actions';
import Balance from './Balance';

const Views = {
    EXTRACT: 'Extract',
    RECEIVE: 'ReceivePoints',
    SEND: 'SendPoints',
    MANAGE: 'ManagePoints',
    OFFERS: 'Offers',
    PARTNERS: 'Partners'
};

@connect(
    ({ wallet }) => ({
        balance: wallet.balance,
        contract: wallet.contract,
        wallet: wallet.wallet,
        loading: wallet.loading
    }),
    dispatch => ({
        isLoading: (loading) => dispatch(Wallet.isLoading(loading)),
        updateBalance: (wallet, contract) => dispatch(Wallet.updateBalance(wallet, contract))
    })
)
export class Overview extends React.Component {

    static navigationOptions = {
        title: 'Multiplus',
        gesturesEnabled: false
    };

    componentDidMount() {
        this.updateBalance();
    }

    updateBalance () {
        const { contract, wallet } = this.props;
        this.props.isLoading(true);
        this.props.updateBalance(wallet, contract);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.balance}>
                    <Balance
                        balance={this.props.balance}
                        loading={this.props.loading}
                        onPressRefresh={() => this.updateBalance()}
                        onPressExtract={() => navigate(Views.EXTRACT)} />
                </View>
                <View style={styles.blocksContainer}>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.RECEIVE)}>
                            <View style={styles.block}>
                                <Image style={styles.gridIcon} source={require('assets/img/qr_code.png')} />
                                <Text>RECEBER</Text>
                                <Text>PONTOS</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.SEND)}>
                            <View style={styles.block}>
                                <Image style={styles.gridIcon} source={require('assets/img/send_points.png')} />
                                <Text>ENVIAR</Text>
                                <Text>PONTOS</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.MANAGE)}>
                            <View style={styles.block}>
                                <Image style={styles.gridIcon} source={require('assets/img/transfer_points.png')} />
                                <Text>COMPRAR</Text>
                                <Text>VENDER</Text>
                                <Text>TRANSFERIR</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate(Views.OFFERS)}>
                            <View style={styles.block}>
                                <Image style={styles.gridIcon} source={require('assets/img/offer.png')} />
                                <Text>OFERTAS</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => navigate(Views.PARTNERS)}>
                    <View style={styles.footer}>
                        <Text style={styles.footerLabel}>PARCEIROS</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    balance: {
        height: 140,
        width: '100%'
    },
    blocksContainer: {
        flexDirection: 'column',
        height: 300,
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        height: 150
    },
    gridIcon: {
        width: 36,
        height: 36
    },
    block: {
        margin: 8,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary
    },
    footer: {
        height: 70,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary
    },
    footerLabel: {
        color: 'white',
        fontWeight: 'bold'
    }
});