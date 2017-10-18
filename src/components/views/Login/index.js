import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, measures } from 'common/styles';
import Button from './Button';
import LoginForm from './LoginForm';
import NewWalletForm from './NewWalletForm';

export class Login extends React.Component {

    static navigationOptions = { header: null };

    state = { loginForm: false, newWalletForm: false };

    reset = () => this.setState({ loginForm: false, newWalletForm: false });

    onSubmitLogin = (data) => {
        console.log(data);
    }
    
    onSubmitNewWallet = (data) => {
        console.log(data);
    }

    renderBody() {
        if (this.state.loginForm) return (
            <LoginForm
                onSubmit={this.onSubmitLogin}
                onCancel={this.reset} />
        );
        else if (this.state.newWalletForm) return (
            <NewWalletForm
                onSubmit={this.onSubmitNewWallet}
                onCancel={this.reset} />
        );
        else return (
            <View style={styles.buttonsContainer}>
                <Button title="Entrar" onPress={() => this.setState({ loginForm: true, newWalletForm: false })} />
                <Button title="Criar conta" onPress={() => this.setState({ loginForm: false, newWalletForm: true })} />
            </View>
        );
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
        justifyContent: 'space-around',
        flex: 1,
    },
    logo: {
        width: 155,
        height: 60
    },
    buttonsContainer: {
        width: '90%',
        maxWidth: 400,
        justifyContent: 'space-between',
        height: 104
    }
});