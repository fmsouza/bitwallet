import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { colors, measures } from 'common/styles';
import Button from './Button';
import ListItem from './ListItem';
import contacts from './mockedContacts';

export class SendPoints extends React.Component {

    static navigationOptions = {
        title: 'Enviar pontos'
    };
    
    state = { address: '', amount: '', showCamera: false, contacts };

    onPressCamera = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            this.setState({ showCamera: (status === 'granted') });
        } catch (e) {
            console.error(e);
        }
    }
    
    onBarCodeRead = ({ type, data }) => {
        if (type === 'QR_CODE') {
            this.setState({ address: data, showCamera: false });
        }
    }

    onSend = () => {
        const { address, amount } = this.state;
        console.log(address, amount);
    }

    renderCamera() {
        return (
            <BarCodeScanner
                style={styles.fullScreen}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeRead={this.onBarCodeRead} />
        );
    }

    renderContact = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => this.setState({ address: item.address })}>
            <View><ListItem {...item} /></View>
        </TouchableWithoutFeedback>
    );

    renderView() {
        return (
            <View style={styles.container}>
                <View style={styles.topBox}>
                    <Text style={styles.label}>Destinatário</Text>
                    <View style={styles.inline}>
                        <TextInput
                            style={styles.input}
                            autoFocus={this.props.autoFocus}
                            autoCorrect={false}
                            value={this.state.address}
                            onChangeText={(address) => this.setState({ address })}
                            placeholder="Ex.: 0xZ173VZ103139dvd1eew0n3716vz07131731" />
                        <TouchableWithoutFeedback onPress={this.onPressCamera}>
                            <Image
                                style={styles.cameraIcon}
                                source={require('assets/img/camera.png')} />
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={styles.label}>Quantidade de pontos</Text>
                    <TextInput
                        style={styles.input}
                        autoFocus={this.props.autoFocus}
                        autoCorrect={false}
                        value={this.state.amount}
                        keyboardType="numeric"
                        onChangeText={(amount) => this.setState({ amount })}
                        placeholder="Ex.: 123457000000" />
                    <Button title="Enviar" onPress={this.onSend} />
                </View>
                <View style={styles.bottomBox}>
                    <FlatList
                        data={this.state.contacts}
                        keyExtractor={item => item.id}
                        renderItem={this.renderContact} />
                </View>
            </View>
        );
    }

    render() {
        return !this.state.showCamera ? this.renderView() : this.renderCamera();
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        padding: measures.defaultPadding,
        flex: 1
    },
    topBox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    bottomBox: {
        flex: 1
    },
    inline: {
        flexDirection: 'row'
    },
    input: {
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        color: 'black'
    },
    cameraIcon: {
        width: 36,
        height: 36
    },
    label: {
        marginVertical: measures.defaultMargin
    },
    fullScreen: {
        flex: 1
    }
});