import React from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Vibration, View } from 'react-native';
import Permissions from 'react-native-permissions';
import Camera from 'react-native-camera';
import autobind from 'autobind-decorator';
import { Button, Container, Icon } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { General, Views } from 'common/constants';
import ListItem from './ListItem';
import contacts from './mockedContacts';

export class SelectDestinationAddress extends React.Component {

    static navigationOptions = { title: 'Enviar pontos' };
    
    state = { address: '', showCamera: false, contacts };

    @autobind
    async onPressCamera() {
        Keyboard.dismiss();
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
            General.DEBUG && console.error(e);
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
        Keyboard.dismiss();
        const { address } = this.state;
        if (!address) return;
        const { state: { params: { amount } }, navigate } = this.props.navigation; //.state.params;
        navigate(Views.CONFIRMTXN, { address, amount });
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
            <Container style={styles.container}>
                <View style={styles.topBox}>
                    <Text style={styles.label}>DESTINATÁRIO</Text>
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
                                <Icon name="qrcode-scan" type="mdc" color={colors.white} />
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
            </Container>
        );
    }

    render() {
        return !this.state.showCamera ? this.renderView() : this.renderCamera();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topBox: {
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: colors.almond
    },
    bottomBox: {
        padding: measures.defaultPadding,
        flex: 1
    },
    inline: {
        paddingTop: measures.defaultPadding,
        backgroundColor: colors.zorba,
        flexDirection: 'row'
    },
    input: {
        width: '90%',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        color: colors.white
    },
    cameraIcon: {
        width: 36,
        height: 36
    },
    label: {
        alignSelf: 'center',
        marginTop: measures.defaultMargin,
        fontSize: measures.fontSizeSmall,
        color: colors.white,
        backgroundColor: colors.zorba,
        width: '100%',
        textAlign: 'center'
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