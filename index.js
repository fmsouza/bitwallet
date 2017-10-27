import { AppRegistry } from 'react-native';
import App from './src';

if (!Uint8Array.prototype.slice) {
    Uint8Array.prototype.slice = function() {
        var args = Array.prototype.slice.call(arguments);
        return new Uint8Array(Array.prototype.slice.apply(this, args));
    }
}

AppRegistry.registerComponent('BitWallet', () => App);