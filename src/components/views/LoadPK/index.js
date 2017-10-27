import React from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import Permissions from 'react-native-permissions';
import Camera from 'react-native-camera';
import { Wallet } from 'common/actions';
import { colors, measures } from 'common/styles';


@connect(
    ({ wallet }) => ({
        loading: wallet.loading
    }),
    dispatch => ({
        loadWallet: (pk) => dispatch(Wallet.loadWalletFromPrivateKey(pk)),
        isLoading: (loading) => dispatch(Wallet.isLoading(loading))
    })
)
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
            console.error(e);
        }
    }

    @autobind
    onBarCodeRead({ type, data }) {
        if (type === 'QR_CODE') {
            Vibration.vibrate();
            this.props.isLoading(true);
            this.setState({ showCamera: false }, () => {
                if(data.indexOf('0x')) data = `0x${data}`; // Add '0x' to the beginning case it is not present
                this.props.loadWallet(data);
                this.props.navigation.navigate('Overview');
            });
        }
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
        backgroundColor: 'black',
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