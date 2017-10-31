import React from 'react';
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { Button } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Wallet } from 'common/actions';
import LoginForm from './LoginForm';

@connect(
    ({ wallet }) => ({
        wallet: wallet.wallet,
        loading: wallet.loading
    }),
    dispatch => ({
        loadWalletFromLogin: (username, password) => dispatch(Wallet.loadWalletFromLogin(username, password)),
        loadWalletFromPrivateKey: (pk) => dispatch(Wallet.loadWalletFromPrivateKey(pk)),
        isLoading: (loading) => dispatch(Wallet.isLoading(loading))
    })
)
export class Login extends React.Component {

    static navigationOptions = { header: null };

    componentWillMount() {
        this.props.isLoading(true);
        this.loadWallet();
    }

    async loadWallet() {
        try {
            const privateKey = await Wallet.loadWalletFromMemory();
            if (privateKey) {
                this.props.loadWalletFromPrivateKey(privateKey);
                setTimeout(() =>
                    this.props.navigation.navigate('Overview', { replaceRoute: true })
                , 1);
            }
        } catch (e) {
            console.log("Error:", e.message);
        } finally {
            this.props.isLoading(false);
        }
    }

    @autobind
    onSubmitLogin({ username, password }) {
        Keyboard.dismiss();
        this.props.isLoading(true);
        setTimeout(() => {
            this.props.loadWalletFromLogin(username, password);
            setTimeout(() =>
                this.props.navigation.navigate('Overview', { replaceRoute: true })
            , 1);
        }, 0);
    }

    renderBody() {
        const { loading, navigation, wallet } = this.props;
        if (loading) return <ActivityIndicator animating={this.props.loading} />;
        else if (!wallet) return (
            <View style={styles.bodyContainer}>
                <LoginForm onSubmit={this.onSubmitLogin} />
                <Button
                    borderless
                    title="Entrar com chave privada"
                    onPress={() => this.props.navigation.navigate('LoadPK')} />
            </View>
        );
        else return null;
    }

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('assets/img/logo.png')} />
                    {this.renderBody()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: measures.defaultPadding
    },
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1
    },
    bodyContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1
    },
    logo: {
        width: 155,
        height: 60,
        marginVertical: 60
    }
});