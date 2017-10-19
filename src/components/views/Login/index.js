import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { colors, measures } from 'common/styles';
import Button from './Button';
import LoginForm from './LoginForm';

export class Login extends React.Component {

    static navigationOptions = { header: null };

    state = { loading: false };

    reset = () => this.setState({ loginForm: false, loading: false });

    onSubmitLogin = (data) => this.setState({ loading: true }, () => {
        this.props.navigation.navigate('Overview');
        console.log(data);
    });

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('assets/img/logo.png')} />
                    <ActivityIndicator animating={this.state.loading} />
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