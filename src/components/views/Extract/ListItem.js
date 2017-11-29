import React from 'react';
import { Linking, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import moment from 'moment';
import { Icon } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Transaction as TransactionUtils, Wallet as WalletUtils } from 'common/utils';

export default class ListItem extends React.Component {

    get timestamp() {
        return moment(parseInt(this.props.item.timeStamp)*1000).format('D/M/Y hh:mm');
    }

    get points() {
        return WalletUtils.tokenDecimals(this.props.item.data);
    }

    get from() {
        const address = this.props.item.topics[1].split('x')[1].replace(/^0+(?!\.|$)/, '');
        return `0x${address}`;
    }
    
    get to() {
        const address = this.props.item.topics[2].split('x')[1].replace(/^0+(?!\.|$)/, '');
        return `0x${address}`;
    }

    isSending() {
        return parseInt(this.from) === parseInt(this.props.walletAddress);
    }

    onPress() {
        const { transactionHash } = this.props.item;
        Linking.openURL(TransactionUtils.transactionDetailsURL(transactionHash));
    }

    renderIncoming = () => (
        <View style={styles.container}>
            <View style={styles.left}>
                <View style={styles.avatarIncoming}>
                    <Icon name="download" type="mdc" color={colors.white} />
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
                    <Icon name="upload" type="mdc" color={colors.white} />
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
        return (
            <TouchableWithoutFeedback
                onPress={() => this.onPress()}
                children={this.isSending() ? this.renderOutcoming() : this.renderIncoming()} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
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
        fontSize: measures.fontSizeMedium,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: measures.fontSizeSmall
    }
});