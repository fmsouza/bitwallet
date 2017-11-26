import React from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import Permissions from 'react-native-permissions';
import Camera from 'react-native-camera';
import { Wallet } from 'common/actions';
import { General } from 'common/constants';
import { colors, measures } from 'common/styles';
import { Views } from 'common/constants';

@inject('wallet')
@observer
export class LoadPK extends React.Component {

    static navigationOptions = { header: null };

    state = { showCamera: false };

    async componentWillMount() {
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

    async loadWalletFromPrivateKey(pk) {
        try {
            await Wallet.isLoading(true);
            await Wallet.loadWalletFromPrivateKey(pk);
            if (this.props.wallet.wallet) this.props.navigation.navigate(Views.OVERVIEW, { replaceRoute: true });
        } catch(e) {
            General.DEBUG && console.warn(e.message);
        } finally {
            await Wallet.isLoading(false);
        }
    }

    @autobind
    onBarCodeRead({ type, data }) {
        if (type !== 'QR_CODE') return;
        Vibration.vibrate();
        this.setState({ showCamera: false }, () => this.loadWalletFromPrivateKey(data));
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.showCamera && (
                    <View style={styles.cameraLayer}>
                        <Camera
                            style={styles.cameraLayer}
                            barCodeTypes={['qr']}
                            onBarCodeRead={this.onBarCodeRead} />
                        <View style={styles.marker} />
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1
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