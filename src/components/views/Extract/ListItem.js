import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { measures } from 'common/styles';

export default class ListItem extends React.Component {

    get timestamp() {
        return moment(parseInt(this.props.transaction.timeStamp)*1000).format('D/M/Y hh:mm');
    }

    get points() {
        return parseInt(this.props.transaction.data);
    }

    get from() {
        const address = this.props.transaction.topics[1].split('x')[1].replace(/^0+(?!\.|$)/, '');
        return `0x${address}`;
    }
    
    get to() {
        const address = this.props.transaction.topics[2].split('x')[1].replace(/^0+(?!\.|$)/, '');
        return `0x${address}`;
    }

    isSending() {
        return parseInt(this.from) === parseInt(this.props.walletAddress);
    }

    renderIncoming = () => (
        <View style={styles.container}>
            <View style={styles.left}>
                <View style={styles.avatarIncoming}>
                    <Image style={styles.icon} source={require('assets/img/download.png')} />
                </View>
            </View>
            <View style={styles.right}>
                <Text style={styles.title}>{this.points} pontos</Text>
                <Text style={styles.subtitle}>De: {this.from}</Text>
                <Text style={styles.subtitle}>{this.timestamp}</Text>
            </View>
        </View>
    );
    
    renderOutcoming = () => (
        <View style={styles.container}>
            <View style={styles.left}>
                <View style={styles.avatarOutcoming}>
                    <Image style={styles.icon} source={require('assets/img/upload.png')} />
                </View>
            </View>
            <View style={styles.right}>
                <Text style={styles.title}>{this.points} pontos</Text>
                <Text style={styles.subtitle}>Para: {this.to}</Text>
                <Text style={styles.subtitle}>{this.timestamp}</Text>
            </View>
        </View>
    );

    render() {
        return this.isSending() ? this.renderOutcoming() : this.renderIncoming();
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: 'grey',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'

    },
    left: {
        width: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarIncoming: {
        width: 48,
        height: 48,
        backgroundColor: 'green',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarOutcoming: {
        width: 48,
        height: 48,
        backgroundColor: 'red',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 24,
        height: 24
    },
    right: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
        padding: measures.defaultPadding
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 12
    }
});