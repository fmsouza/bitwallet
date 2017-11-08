import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Vibration, View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'components/widgets';
import autobind from 'autobind-decorator';
import Permissions from 'react-native-permissions';
import Camera from 'react-native-camera';
import { colors, measures } from 'common/styles';
import { Transaction } from 'common/actions';
import ListItem from './ListItem';
import contacts from './mockedContacts';

@connect(null,
    dispatch => ({
        isLoading: (loading) => dispatch(Transaction.isLoading(loading)),
        transfer: (address, amount) => dispatch(Transaction.transfer(address, amount))
    }))
export class SendPoints extends React.Component {

    static navigationOptions = {
        title: 'Enviar pontos'
    };
    
    state = { address: '', amount: '', showCamera: false, contacts };

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
        const { address, amount } = this.state;
        const { /*isLoading,*/ navigation } = this.props;
        navigation.navigate('ConfirmTransaction', { address, amount });
        // setTimeout(() => {
        //     transfer(address, amount);
        //     navigation.goBack();
        // }, 1);
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
                        underlineColorAndroid="transparent"
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
        marginVertical: measures.defaultMargin
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