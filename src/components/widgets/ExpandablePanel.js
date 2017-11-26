import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colors, measures } from 'common/styles';

export class ExpandablePanel extends React.Component {

    state = { expanded: false };

    renderBody(expanded) {
        return (!expanded) ? null : (
            <View
                children={this.props.children}
                style={styles.containerBody} />
        );
    }

    render() {
        const { title } = this.props;
        const { expanded } = this.state;
        return (
            <TouchableWithoutFeedback onPress={() => this.setState({ expanded: !expanded })}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text>{title}</Text>
                        <Text>{expanded ? '-' : '+'}</Text>
                    </View>
                    {this.renderBody(expanded)}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#BBB',
        marginVertical: measures.defaultMargin
    },
    header: {
        backgroundColor: colors.lightGray,
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: measures.defaultPadding
    },
    containerBody: {
        padding: measures.defaultPadding,
        backgroundColor: colors.white
    }
});