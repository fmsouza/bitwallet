import React from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
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

    componentWillMount() {
        this.enableCamera();
    }

    enableCamera = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            console.log("Camera permission:", status);
            this.setState({ showCamera: (status === 'granted') });
        } catch (e) {
            console.log("An error ocurred...");
            console.error(e);
        }
    }

    onBarCodeRead = ({ type, data }) => {
        if (type === BarCodeScanner.Constants.BarCodeType.qr) {
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
                        <BarCodeScanner
                            style={styles.cameraLayer}
                            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
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