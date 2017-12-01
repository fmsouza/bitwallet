import React from 'react';
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { Container } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Wallet } from 'common/actions';
import { General, Views } from 'common/constants';
import LoginForm from './LoginForm';

@inject('wallet')
@observer
export class Login extends React.Component {

    static navigationOptions = { header: null };

    async componentWillMount() {
        try {
            await Wallet.isLoading(true);
            await Wallet.loadWalletFromMemory();
            if (this.props.wallet.wallet) this.props.navigation.navigate(Views.OVERVIEW, { replaceRoute: true });
        } catch (e) {
            General.DEBUG && console.warn("No wallet registered yet.");
        } finally {
            await Wallet.isLoading(false);
        }
    }

    async loadWalletFromLogin(username, password) {
        try {
            await Wallet.isLoading(true);
            await Wallet.loadWalletFromLogin(username, password);
            if (this.props.wallet.wallet) this.props.navigation.navigate(Views.OVERVIEW, { replaceRoute: true });
        } catch (e) {
            General.DEBUG && console.error("Error:", e.message);
        } finally {
            await Wallet.isLoading(false);
        }
    }

    @autobind
    onSubmitLogin({ username, password }) {
        Keyboard.dismiss();
        this.loadWalletFromLogin(username, password);
    }

    renderBody() {
        const { navigation, wallet: { loading, wallet } } = this.props;

        if (loading) return <ActivityIndicator animating />;
        else if (!wallet) return (
            <View style={styles.bodyContainer}>
                <LoginForm onSubmit={this.onSubmitLogin} />
                <TouchableWithoutFeedback onPress={() => navigation.navigate(Views.LOADPK)}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonTitle}>Entrar com chave privada</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
        else return null;
    }

    render() {
        return (
            <Container style={styles.container}>
                {this.renderBody()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    bodyContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        marginTop: measures.defaultMargin * 10
    },
    buttonTitle: {
        backgroundColor: 'transparent',
        color: colors.white,
        fontSize: measures.fontSizeMedium
    }
});