import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { measures } from 'common/styles';

export default ({ description, img, title }) => (
    <View style={styles.container}>
        <View style={styles.leftColumn}>
            <Image style={styles.img} source={img} />
        </View>
        <View style={styles.rightColumn}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        width: '100%',
        borderColor: 'grey',
        height: 72,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: measures.defaultPadding
    },
    leftColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 72
    },
    img: {
        width: 64,
        height: 64
    },
    rightColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 20
    },
    description: {
        fontSize: 14,
        color: 'grey'
    }
});