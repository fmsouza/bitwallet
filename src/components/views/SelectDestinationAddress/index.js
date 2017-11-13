import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Vibration, View } from 'react-native';
import Permissions from 'react-native-permissions';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { Button, Icon } from 'components/widgets';
import { colors, measures } from 'common/styles';
import ListItem from './ListItem';
import contacts from './mockedContacts';

export class SelectDestinationAddress extends React.Component {

    static navigationOptions = {
        title: 'Enviar pontos'
    };
    
    state = { address: '', showCamera: false, contacts };

    @autobind
    async onPressCamera() {
        var status;
        try {
            status = await Permissions.check('camera');
            if (status === 'authorized') this.setState({ showCamera: true });
            else {
                status = await Permissions.request('camera');
                if (status === 'authorized') this.setState({ showCamera: true });
                else throw new Error('Not allowed to use the camera.');
            }
        } catch (e) {
            console.error(e);
        }
    }
    
    @autobind
    onBarCodeRead({ type, data }) {
        if (type === 'QR_CODE') {
            Vibration.vibrate();
            this.setState({ address: data, showCamera: false });
        }
    }

    @autobind
    onSend() {
        const { address } = this.state;
        if (!address) return;
        const { state: { params: { amount } }, navigate } = this.props.navigation; //.state.params;
        navigate('ConfirmTransaction', { address, amount });
    }

    renderCamera() {
        return (
            <View style={styles.cameraLayer}>
                <Camera
                    style={styles.cameraLayer}
                    barCodeTypes={['qr']}
                    onBarCodeRead={this.onBarCodeRead} />
                <View style={styles.marker} />
            </View>
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
                            underlineColorAndroid="transparent"
                            onChangeText={(address) => this.setState({ address })}
                            placeholder="Ex.: 0xZ173VZ103139dvd1eew0n3716vz07131731" />
                        <TouchableWithoutFeedback onPress={this.onPressCamera}>
                            <View style={styles.cameraIcon}>
                                <Icon name="qrcode-scan" type="mdc" />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Button borderless title="Enviar" onPress={this.onSend} />
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
        alignItems: 'stretch',
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
        alignSelf: 'center',
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
        alignSelf: 'center',
        marginVertical: measures.defaultMargin,
        fontSize: measures.fontSizeMedium
    },
    cameraLayer: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marker: {
        zIndex: 2,
        width: 200,
        height: 200,
        borderWidth: 4,
        borderColor: 'green'
    }
});