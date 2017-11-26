import React from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import autobind from 'autobind-decorator';
import { Button } from 'components/widgets';
import { colors } from 'common/styles';

export default class LoginForm extends React.Component {

    state = { username: '', password: '' };

    @autobind
    onSubmit () {
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
                    autoCorrect={false}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={username => this.setState({ username })} />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor={colors.secondary}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={password => this.setState({ password })} />
                <Button
                    title="Entrar"
                    onPress={this.onSubmit} />
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
        borderBottomColor: colors.gray,
        borderBottomWidth: 1
    }
});