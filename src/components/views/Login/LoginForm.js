import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from 'common/styles';
import Button from './Button';

export default class LoginForm extends React.Component {

    state = { username: '', password: '' };

    onSubmit = () => {
        const { username, password } = this.state;
        if (!username || !password) return;
        this.props.onSubmit({ username, password });
    }

    render() {
        const { onCancel } = this.props;
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Usuário"
                    placeholderTextColor={colors.secondary}
                    autoFocus
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={username => this.setState({ username })} />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor={colors.secondary}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={password => this.setState({ password })} />
                <Button title="Entrar" onPress={this.onSubmit} />
                <Button title="Cancelar" onPress={onCancel} borderless />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        maxWidth: 400,
        height: 240,
        justifyContent: 'space-between'
    },
    input: {
        color: colors.secondary,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 48,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    }
});