import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { colors, measures } from 'common/styles';
import { Wallet } from 'common/actions';
import Button from './Button';
import LoginForm from './LoginForm';

@connect(
    ({ wallet }) => ({
        wallet: wallet.wallet,
        loading: wallet.loading
    }),
    dispatch => ({
        loadWallet: (username, password) => dispatch(Wallet.loadWallet(username, password)),
        isLoading: (loading) => dispatch(Wallet.isLoading(loading))
    })
)
export class Login extends React.Component {

    static navigationOptions = { header: null };

    reset = () => this.setState({ loginForm: false });

    onSubmitLogin = ({ username, password }) => {
        this.props.isLoading(true);
        setTimeout(() => 
            this.props.loadWallet(username, password)
                .then(() => this.props.navigation.navigate('Overview'))
        , 0);
    }

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('assets/img/logo.png')} />
                    <ActivityIndicator animating={this.props.loading} />
                    <LoginForm
                        onSubmit={this.onSubmitLogin}
                        onCancel={this.reset} />
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
        justifyContent: 'space-around',
        flex: 1,
    },
    logo: {
        width: 155,
        height: 60
    }
});